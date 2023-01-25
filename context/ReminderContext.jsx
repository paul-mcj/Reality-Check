// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// define context
const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
     // init state
     const [reminders, setReminders] = useState([]);
     const [reminderIds, setReminderIds] = useState([]);

     // function to add new reminder to context
     const addReminder = (reminderObj) => {
          setReminders((prev) => [...prev, reminderObj]);
     };

     // function to delete a reminder from context
     const deleteReminder = (id) => {
          setReminders(() => [...reminders].filter((item) => item.id !== id));
     };

     // function to edit the time when a reminder performs a notification
     const editReminderTime = (id) => {
          console.log(id);
          // fixme: loop reminders arr, find reminder obj with given id, and edit its time to newTime
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
          // fixme: set Toast context to show new changes here??
     };

     // any time reminders is changed, an array of all reminder id props (used in Modal component for dynamic output) is updated
     useEffect(() => {
          const ids = [];
          reminders.forEach((item) => ids.push(item.id));
          setReminderIds(() => ids);
     }, [reminders]);

     return (
          <ReminderContext.Provider
               value={{
                    reminders,
                    reminderIds,
                    addReminder,
                    deleteReminder,
                    editReminderTime,
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
