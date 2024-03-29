// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// hooks
import useNotification from "../hooks/use-notification";

// define context
const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
     // init state
     const [reminders, setReminders] = useState([]);
     const [activeReminders, setActiveReminders] = useState(0);
     const [allRemindersActive, setAllRemindersActive] = useState();

     // import functions for notification actions from custom hook
     const { deleteNotification, triggerNotification } = useNotification();

     // function to add new reminder to context and device storage
     const addReminder = async (reminderObj) => {
          try {
               setReminders((prev) => [...prev, reminderObj]);
               const jsonEntry = JSON.stringify(reminderObj);
               await AsyncStorage.setItem(String(reminderObj.id), jsonEntry);
          } catch (err) {
               console.log(`error at addReminder in ReminderContext: ${err}`);
          }
     };

     // function to delete a reminder from context and device storage, as well as removing target notification
     const deleteReminder = async (reminderId) => {
          try {
               setReminders(() =>
                    [...reminders].filter(
                         (reminder) => reminder.id !== reminderId
                    )
               );
               await AsyncStorage.removeItem(String(reminderId));
               let reminderObj = reminders.find(
                    (reminder) => reminder.id === reminderId
               );
               // delete notification
               deleteNotification(reminderObj.notificationIdentifier);
          } catch (err) {
               console.log(
                    `error at deleteReminder in ReminderContext: ${err}`
               );
          }
     };

     // function to edit whether a specific reminder performs a notification or not -- needs to update the active state in device storage as well
     const editReminderIsActive = async (reminderId) => {
          try {
               let updatedReminder;
               const findReminderIndex = reminders.findIndex(
                    (item) => item.id === reminderId
               );
               const copyReminders = [...reminders];
               const foundReminder = copyReminders[findReminderIndex];
               // set the "active" state of the target reminder to the opposite of what it currently is
               foundReminder.active = !foundReminder.active;
               // if the reminder "active" prop is now true, schedule a new notification...
               if (foundReminder.active) {
                    updatedReminder = {
                         ...foundReminder,
                         notificationIdentifier:
                              // this unique prop set for the respective object allows for the notification to occur on user devices
                              triggerNotification(foundReminder.time),
                    };
                    // replace old reminder object in reminder context with updatedReminder -- must be done on deep copy array first
                    copyReminders[findReminderIndex] = updatedReminder;
               }
               // ...otherwise, delete the notification
               if (!foundReminder.active) {
                    deleteNotification(foundReminder.notificationIdentifier);
               }
               // update reminder context
               setReminders(() => copyReminders);
               // change item active state in device storage
               const jsonReminder = JSON.stringify(foundReminder);
               await AsyncStorage.mergeItem(String(reminderId), jsonReminder);
          } catch (err) {
               console.log(
                    `error at editReminderIsActive in ReminderContext: ${err}`
               );
          }
     };

     // sets all reminders to either on/off and reflects that state in device storage
     const changeAllRemindersActive = async () => {
          try {
               let currentReminder;
               let placeholderRemindersArr = [];
               let copyReminders = [...reminders];
               copyReminders.forEach((reminder) => {
                    // if user wants to set all reminders from false to true:
                    if (!allRemindersActive) {
                         // all reminders that have a false "active" prop need to trigger a new notification and update a new reminder object
                         if (!reminder.active) {
                              currentReminder = {
                                   ...reminder,
                                   active: true,
                                   notificationIdentifier: triggerNotification(
                                        reminder.time
                                   ),
                              };
                              // else any reminder that already has a true "active" state can remain the same
                         } else {
                              currentReminder = { ...reminder };
                         }
                    } else {
                         // if users want to turn off all reminders, simply set "active" prop state to false and delete the notification:
                         currentReminder = { ...reminder, active: false };
                         deleteNotification(reminder?.notificationIdentifier);
                    }
                    // add reminder object to array
                    placeholderRemindersArr.push(currentReminder);
               });
               // set state for all active reminders
               setAllRemindersActive((prev) => !prev);
               // update reminder context
               setReminders(() => placeholderRemindersArr);
               // change all item active states in device storage
               await Promise.all(
                    placeholderRemindersArr.map(async (reminder) => {
                         await AsyncStorage.mergeItem(
                              String(reminder.id),
                              JSON.stringify(reminder)
                         );
                    })
               );
               // set changes to device storage if all notifications are active or not
               await AsyncStorage.removeItem("all-reminders-active");
               await AsyncStorage.setItem(
                    "all-reminders-active",
                    JSON.stringify(!allRemindersActive)
               );
          } catch (err) {
               console.log(
                    `error at changeAllRemindersActive in ReminderContext: ${err}`
               );
          }
     };

     // keep track of every reminder thats currently set
     useEffect(() => {
          let count = 0;
          reminders.forEach((reminder) => {
               if (reminder.active) {
                    count++;
               }
          });
          setActiveReminders(() => count);
     }, [reminders]);

     // upon initial render, get all entries from device storage and fill reminder context with those objects as well as setting whether all reminders are on or off and setting that state too.
     useEffect(() => {
          const getAllRemindersActive = async () => {
               try {
                    const jsonValue = await AsyncStorage.getItem(
                         "all-reminders-active"
                    );
                    // if there is no storage key found that holds state of if all reminders are active or not, then set a new one (true by default)...
                    if (jsonValue === null) {
                         await AsyncStorage.setItem(
                              "all-reminders-active",
                              JSON.stringify(true)
                         );
                         setAllRemindersActive(() => true);
                    } else {
                         // ... otherwise if there is a key, set the local state to true or false depending on the value of the stored key
                         const value = await AsyncStorage.getItem(
                              "all-reminders-active"
                         );
                         setAllRemindersActive(() => JSON.parse(value));
                    }
               } catch (err) {
                    console.log(
                         `error at useEffect in ReminderContext with getAllRemindersActive: ${err}`
                    );
               }
          };

          const getReminders = async () => {
               let tempKeyArr = [];
               let tempReminderArr = [];
               try {
                    // since app needs to fetch storage data first and then update context based upon that retrieved data, AsyncStorage.multiGet() doesn't work as reminder objects are not yet set in context state. So in order to find only the reminders (and not the journal entries), use AsyncStorage.getAllKeys() for all data saved in storage, but include only reminder objects by finding objects that have a "time" prop (as only reminder objects will have that prop -- journal entry objects do not) and add them to an array that will consist of just the reminder keys/ids.
                    const allJsonData = await AsyncStorage.getAllKeys();
                    await Promise.all(
                         allJsonData.map(async (reminder) => {
                              const data = await AsyncStorage.getItem(reminder);
                              let jsonData = JSON.parse(data);
                              jsonData.time &&
                                   tempKeyArr.push(String(jsonData.id));
                         })
                    );
               } catch (err) {
                    console.log(
                         `error at useEffect in ReminderContext with getAllKeys(): ${err}`
                    );
               }

               try {
                    // now that all reminder keys are found, update context array with those relevant objects.
                    await Promise.all(
                         tempKeyArr.map(async (reminder) => {
                              const data = await AsyncStorage.getItem(reminder);
                              let parsedData = JSON.parse(data);
                              let parsedDataTime = new Date(parsedData.time);
                              let parsedDataActive = parsedData.active;
                              const reformatData = {
                                   time: parsedDataTime,
                                   id: parsedData.id,
                                   active: parsedDataActive,
                                   // it is paramount to trigger a new notification for each reminder object that is about to be put into the reminder context. If this is not done here, then the notificationIdentifier prop would simply be "null" and thus the notification cannot be properly deleted/updated on the backend properly causing massive issues to app functionality.
                                   notificationIdentifier: parsedDataActive
                                        ? triggerNotification(parsedDataTime)
                                        : triggerNotification(),
                              };
                              tempReminderArr.push(reformatData);
                         })
                    );
                    setReminders(() => tempReminderArr);
               } catch (err) {
                    console.log(
                         `error at useEffect in ReminderContext with individual getItem(): ${err}`
                    );
               }
          };

          getAllRemindersActive();
          getReminders();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     return (
          <ReminderContext.Provider
               value={{
                    reminders,
                    setReminders,
                    activeReminders,
                    allRemindersActive,
                    changeAllRemindersActive,
                    addReminder,
                    deleteReminder,
                    editReminderIsActive,
               }}
          >
               {children}
          </ReminderContext.Provider>
     );
};

ReminderProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default ReminderContext;
