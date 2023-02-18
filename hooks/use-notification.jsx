// react and misc
import { useState, createContext, useEffect } from "react";

// expo notifications
import * as Notifications from "expo-notifications";

// note: await Notifications.cancelAllScheduledNotificationsAsync();

const useNotification = () => {
     // function to trigger a notification
     const triggerNotification = async (trigger) => {
          console.log(await Notifications.getAllScheduledNotificationsAsync());
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
          // console.log(await Notifications.getAllScheduledNotificationsAsync());
     };

     // function that will update notification depending on current "active" prop state
     const updateNotification = async (
          notificationObj,
          oldNotificationIdentifier
     ) => {
          let oldNotificationId =
               oldNotificationIdentifier?.notificationIdentifier._z;
          let newNotificationId = notificationObj?.notificationIdentifier;
          // immediately cancel the outdated notification associated with the notificationObj
          // note: the below does work!
          // oldNotificationId !== null &&
          //      (await Notifications.cancelScheduledNotificationAsync(
          //           oldNotificationId
          //      ));
          // note: see if the below can be used instead of the above which is working (as this would mimic logic in the setTimeout fn!)
          oldNotificationId !== null && deleteNotification(oldNotificationId);

          // setTimeout is circumventing issues with expo unhandled promise rejections
          setTimeout(() => {
               // if the "active" prop is false, delete the newly triggered notification (which comes from ReminderContext's "editReminderIsActive" function) -- otherwise just return, as the notification will be triggered as its already been assigned in the aforementioned context
               if (!notificationObj.active) {
                    deleteNotification(newNotificationId);
               } else {
                    return;
               }
          }, 1);
     };

     // fixme: useffect should get all active notifications upon initial render ??
     useEffect(() => {
          console.log(Notifications.getAllScheduledNotificationsAsync());
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

     return { triggerNotification, deleteNotification, updateNotification };
};

export default useNotification;
