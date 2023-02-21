// react and misc
import { useState, createContext, useEffect } from "react";

// expo notifications
import * as Notifications from "expo-notifications";

// note: await Notifications.cancelAllScheduledNotificationsAsync();

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
          // expo unique private prop on notification objects:
          let notificationId = notificationIdentifier._z;
          await Notifications.cancelScheduledNotificationAsync(notificationId);
     };

     // fixme: put all this logic in ReminderContext (as reminder context needs to change in order for the notification to change as well...)
     // function that will update notification depending on current "active" prop state
     // const updateNotification = async (reminderObj) => {
     //      // expo unique private prop on notification objects:
     //      let notificationId = reminderObj.notificationIdentifier._z;

     //      // console.log("notId: " + notificationId);
     //      // console.log(reminderObj);
     //      // console.log(notificationsArr);

     // };

     // get all expo notifications
     const getNotifications = async () => {
          return await Notifications.getAllScheduledNotificationsAsync();
     };

     // get all active notifications upon initial render
     useEffect(() => {
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
          updateNotification,
          getNotifications,
     };
};

export default useNotification;
