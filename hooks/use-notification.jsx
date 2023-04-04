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
               trigger: trigger
                    ? {
                           hour: trigger.getHours(),
                           minute: trigger.getMinutes(),
                           repeats: true,
                      }
                    : 0,
          });
     };

     // function to delete desired notification
     const deleteNotification = async (notificationIdentifier) => {
          // unique private prop on notification objects for deletion is necessary using expo API:
          try {
               await Notifications.cancelScheduledNotificationAsync(
                    notificationIdentifier._z
               );
          } catch (err) {
               console.log(
                    `error at deleteNotification in use-notification: ${err}`
               );
          }
     };

     return {
          triggerNotification,
          deleteNotification,
     };
};

export default useNotification;
