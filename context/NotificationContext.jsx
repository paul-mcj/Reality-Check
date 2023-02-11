// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo notifications
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// define context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
     // init state
     const [notifications, setNotifications] = useState([]);

     // function to add notification to context and device storage
     const addNotification = async (trigger) => {
          //   try {
          //        setReminders((prev) => [...prev, reminderObj]);
          //        const jsonEntry = JSON.stringify(reminderObj);
          //        await AsyncStorage.setItem(String(reminderObj.id), jsonEntry);
          //   } catch (err) {
          //        console.log(`error at addReminder in ReminderContext: ${err}`);
          //   }
          await Notifications.scheduleNotificationAsync({
               content: {
                    title: "Reality Check",
                    body: "Perform scheduled reality check!",
               },
               trigger: {
                    hour: trigger.getHours(),
                    minute: trigger.getMinutes(),
                    repeats: true,
               },
          });
          //fixme: should this be called here also?:
          // Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
     };

     // function to delete desired notification from context and device storage
     const deleteNotification = async (notificationId) => {
          //   try {
          //        setReminders(() =>
          //             [...reminders].filter(
          //                  (reminder) => reminder.id !== reminderId
          //             )
          //        );
          //        await AsyncStorage.removeItem(String(reminderId));
          //   } catch (err) {
          //        console.log(
          //             `error at deleteReminder in ReminderContext: ${err}`
          //        );
          //   }
     };

     // function that will update a notification for context and device storage
     const updateNotification = async (notificationId) => {};

     // fixme: useffect should get all active notifications upon initial render
     // useEffect(() => {
     //      let nextTrigger = Math.ceil((time.getTime() - now.getTime()) / 1000);
     // console.log(`now: ${now}`);
     // console.log(`trigger is now: ${nextTrigger}`);
     // note: additional logic ensures that there will be at least one min before setting off future notification
     //      if (nextTrigger >= 60) {
     //           addNotification(nextTrigger);
     //      }
     // }, [time]);

     return (
          <NotificationContext.Provider
               value={{
                    notifications,
                    setNotifications,
                    addNotification,
                    deleteNotification,
                    updateNotification,
               }}
          >
               {children}
          </NotificationContext.Provider>
     );
};

NotificationProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default NotificationContext;
