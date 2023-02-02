// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// define context
const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
     // init state
     const [reminders, setReminders] = useState([]);
     const [activeReminders, setActiveReminders] = useState(0);
     const [allRemindersActive, setAllRemindersActive] = useState(true);

     // function to add new reminder to context
     const addReminder = (reminderObj) => {
          setReminders((prev) => [...prev, reminderObj]);
     };

     // function to delete a reminder from context
     const deleteReminder = (id) => {
          setReminders(() => [...reminders].filter((item) => item.id !== id));
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
     }, [reminders]);

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
