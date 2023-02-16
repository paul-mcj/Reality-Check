// react and misc
import { useState, createContext, useEffect } from "react";

// expo notifications
import * as Notifications from "expo-notifications";

const useNotification = () => {
     // function to trigger a notification
     const triggerNotification = async (trigger) => {
          return await Notifications.scheduleNotificationAsync({
               content: {
                    title: "Lucid Dream Reminder",
                    body: "Perform scheduled reality check!",
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

     // function that will update notification and reminder device storage
     // fixme: if the active prop is false, remove the notification entirely, else add a new notification for it (since there will not be one if it is already false!)
     const updateNotification = async (notificationId) => {
          console.log(Notifications.getAllScheduledNotificationsAsync());
     };

     // fixme: useffect should get all active notifications upon initial render ??
     // useEffect(() => {
     //      let nextTrigger = Math.ceil((time.getTime() - now.getTime()) / 1000);
     // console.log(`now: ${now}`);
     // console.log(`trigger is now: ${nextTrigger}`);
     // note: additional logic ensures that there will be at least one min before setting off future notification
     //      if (nextTrigger >= 60) {
     //           addNotification(nextTrigger);
     //      }
     // }, [time]);

     return { triggerNotification, deleteNotification, updateNotification };
};

export default useNotification;
