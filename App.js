// react navigation
import { NavigationContainer } from "@react-navigation/native";

// expo
import { StatusBar } from "expo-status-bar";

// react and misc
import { useEffect } from "react";

// expo notifications
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// style
import theme from "./style";

// screens
import MainScreens from "./screens/MainScreens";

// context
import { ToastProvider } from "./context/ToastContext";
import { JournalProvider } from "./context/JournalContext";
import { ModalProvider } from "./context/ModalContext";
import { ReminderProvider } from "./context/ReminderContext";
import { AlertProvider } from "./context/AlertContext";

// app can run notifications in background
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
TaskManager.defineTask(
     BACKGROUND_NOTIFICATION_TASK,
     ({ data, error, executionInfo }) => {
          console.log(data, error, executionInfo);
     }
);
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// app can run notifications in foreground
Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
     }),
});

export default function App() {
     // when the app first loads, make sure to cancel all scheduled notifications
     useEffect(() => {
          // const createNotificationChannel = async () => {
          //      await Notifications.setNotificationChannelAsync("default", {
          //           name: "test name for app",
          //           importance: Notifications.AndroidImportance.MAX,
          //           lockscreenVisibility:
          //                Notifications.AndroidNotificationVisibility.PUBLIC,
          //      });
          // };

          // const requestPermission = async () => {
          //      const { status } = await Notifications.requestPermissionsAsync();
          //      if (status !== "granted") {
          //           alert(
          //                "Permission to receive notifications had been denied. This may impact application performance."
          //           );
          //           return;
          //      } else {
          //           console.log("granted permission else here");
          //           //fixme: check async state if there already permissions accepted-- if not add to async state, if so simply return
          //      }
          // };

          // requestPermission();
          // createNotificationChannel();
          Notifications.cancelAllScheduledNotificationsAsync();
          // console.log(Notifications.getNotificationChannelsAsync());
     }, []);

     return (
          <ModalProvider>
               <AlertProvider>
                    <ToastProvider>
                         <ReminderProvider>
                              <JournalProvider>
                                   <NavigationContainer theme={theme}>
                                        <StatusBar
                                             backgroundColor="#221b47"
                                             style="light"
                                        />
                                        <MainScreens />
                                   </NavigationContainer>
                              </JournalProvider>
                         </ReminderProvider>
                    </ToastProvider>
               </AlertProvider>
          </ModalProvider>
     );
}
