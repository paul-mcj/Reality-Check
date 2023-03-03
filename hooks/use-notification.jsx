// react and misc
import { useEffect } from "react";

// expo notifications
import * as Notifications from "expo-notifications";

const useNotification = () => {
     // function to trigger a notification
     const triggerNotification = async (trigger) => {
          return await Notifications.scheduleNotificationAsync({
               content: {
                    title: "Lucid Dream Reminder",
                    body: "Perform daily scheduled reality check!",
               },
               trigger: {
                    hour: trigger.getHours(),
                    minute: trigger.getMinutes(),
                    repeats: true,
               },
          });
     };

     // function to delete desired notification
     const deleteNotification = async (notificationIdentifier) => {
          // unique private prop on notification objects for deletion is necessary using expo API:
          let notificationId = notificationIdentifier._z;
          try {
               notificationId !== null &&
                    (await Notifications.cancelScheduledNotificationAsync(
                         notificationId
                    ));
          } catch (err) {
               console.log(
                    `error at deleteNotification in use-notification: ${err}`
               );
          }
     };

     // get all active notifications upon initial render
     useEffect(() => {
          // ||| Notifications.cancelAllScheduledNotificationsAsync();
          Notifications.getAllScheduledNotificationsAsync();
          console.log(Notifications.getAllScheduledNotificationsAsync());
     }, []);

     return {
          triggerNotification,
          deleteNotification,
     };
};

export default useNotification;
