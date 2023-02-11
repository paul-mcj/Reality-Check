// note: this needs to be used in new NotificationContext file (which will persist to device storage), then NotificationContext can be used in both Home and EditReminderItem components!!

// react and misc
import { useState } from "react";

// expo notifications
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// run notifications in background
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
TaskManager.defineTask(
     BACKGROUND_NOTIFICATION_TASK,
     ({ data, error, executionInfo }) => {
          console.log(data);
          console.log(error);
          console.log(executionInfo);
          addNotification(trigger);
     }
);
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

const useNotification = () => {
     // init local state
     const [notificationActive, setNotificationActive] = useState(null);

     // run notification in foreground
     Notifications.setNotificationHandler({
          handleNotification: async () => ({
               shouldShowAlert: true,
               shouldPlaySound: true,
          }),
     });

     return { notificationActive, setNotificationActive };
};

export default useNotification;
