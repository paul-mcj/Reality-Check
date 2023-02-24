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
          // note:
          // Notifications.cancelAllScheduledNotificationsAsync();
          Notifications.getAllScheduledNotificationsAsync();
     }, []);
     // useEffect(() => {
     //      let nextTrigger = Math.ceil((time.getTime() - now.getTime()) / 1000);
     // console.log(`now: ${now}`);
     // console.log(`trigger is now: ${nextTrigger}`);
     // note: additional logic ensures that there will be at least one min before setting off future notification
     //      if (nextTrigger >= 60) {
     //           addNotification(nextTrigger);
     //      }
     // }, [time]);

     return {
          triggerNotification,
          deleteNotification,
     };
};

export default useNotification;
