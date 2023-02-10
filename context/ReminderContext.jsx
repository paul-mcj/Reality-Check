// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// define context
const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
     // init state
     const [reminders, setReminders] = useState([]);
     const [activeReminders, setActiveReminders] = useState(0);
     const [allRemindersActive, setAllRemindersActive] = useState(true);

     // function to add new reminder to context and async storage
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
          } catch (err) {
               console.log(
                    `error at deleteReminder in ReminderContext: ${err}`
               );
          }
     };

     // function to edit whether a specific reminder performs a notification or not
     const editReminderIsActive = (id) => {
          const findReminderIndex = reminders.findIndex(
               (item) => item.id === id
          );
          const copyReminders = [...reminders];
          // set the active state of the target reminder to the opposite of what it currently is
          copyReminders[findReminderIndex].active =
               !copyReminders[findReminderIndex].active;
          // and rest context
          setReminders(() => copyReminders);
     };

     // sets all reminders to either on/off
     const changeAllRemindersActive = () => {
          setAllRemindersActive((prev) => !prev);
          let copyReminders = [...reminders];
          copyReminders.forEach((reminder) => {
               if (!allRemindersActive) {
                    reminder.active = true;
               } else {
                    reminder.active = false;
               }
          });
          setReminders(() => copyReminders);
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
          console.log(reminders);
     }, [reminders]);

     // get all entries from device storage upon initial render and fill context with those objects
     useEffect(() => {
          // fixme: multiget just the journal entry reminder keys and loop thorugh them! Reminder context will multiget just the reminder ids in an array!
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
