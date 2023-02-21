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
     const {
          deleteNotification,
          getNotifications,
          triggerNotification,
          updateNotification,
     } = useNotification();

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

     // function to delete a reminder from context and device storage
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
               const findReminderIndex = reminders.findIndex(
                    (item) => item.id === reminderId
               );
               const copyReminders = [...reminders];
               // set the "active" state of the target reminder to the opposite of what it currently is
               copyReminders[findReminderIndex].active =
                    !copyReminders[findReminderIndex].active;
               // grab the notificationIdentifier (needs to be passed to updateNotification function from custom hook in order for the notification to be properly updated -- if this ins't passed, then re-triggering the notification when updating creates a new notification object, which is unwanted)
               // now reset context
               setReminders(() => copyReminders);
               // change item active state in device storage
               const jsonReminder = JSON.stringify(
                    copyReminders[findReminderIndex]
               );
               await AsyncStorage.mergeItem(String(reminderId), jsonReminder);

               // fixme: all this logic used to come from custom hook, but it needs to be here now as it depends on reminders context array in order to update properly
               let notificationsArr = getNotifications();
               let desiredNotification = notificationsArr.find(
                    async (notification) => {
                         notification.identifier === notificationId;
                    }
               );

               console.log(desiredNotification);
               if (desiredNotification.trigger.type === "daily") {
                    return (desiredNotification.trigger.type = false);
               } else {
                    return (desiredNotification.trigger.type = "daily");
               }

               // update the notification
               await updateNotification(copyReminders[findReminderIndex]);
          } catch (err) {
               console.log(
                    `error at editReminderIsActive in ReminderContext: ${err}`
               );
          }
     };

     // sets all reminders to either on/off and make sure each reminder is appropriately set with either setting in device storage
     const changeAllRemindersActive = async () => {
          try {
               let copyReminders = [...reminders];
               copyReminders.forEach((reminder) => {
                    if (!allRemindersActive) {
                         reminder.active = true;
                    } else {
                         reminder.active = false;
                    }
               });
               setReminders(() => copyReminders);
               // change all item active states in device storage
               await Promise.all(
                    reminders.map(async (reminder) => {
                         await AsyncStorage.mergeItem(
                              String(reminder.id),
                              JSON.stringify(reminder)
                         );
                    })
               );
               // set state and storage for all active reminders
               setAllRemindersActive((prev) => !prev);
               await AsyncStorage.removeItem("all-reminders-active");
               await AsyncStorage.setItem(
                    "all-reminders-active",
                    JSON.stringify(!allRemindersActive)
               );
               // fixme: if allRemindersActive is true, then all reminders that have a false "active" prop need to trigger a new notification; any notifications that already have a true "active" state can remain with there original notifications. Conversely, if allRemindersActive is false, then all reminders with an "active" prop set to false can remain and any reminders with a true "active" prop can just delete those notifications.
               // fixme: might need a Promise.all to loop thorough multiple objects to change them asynchronously!
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
                    // now that all reminder keys are found, update context array with those relevant objects
                    await Promise.all(
                         tempKeyArr.map(async (reminder) => {
                              const data = await AsyncStorage.getItem(reminder);
                              let jsonData = JSON.parse(data);
                              const reformatData = {
                                   ...jsonData,
                                   time: new Date(jsonData.time),
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

          // fixme: usecallback ?
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
          getReminders();
          getAllRemindersActive();
     }, []);

     return (
          <ReminderContext.Provider
               value={{
                    reminders,
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
