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
          console.log(data);
          console.log(error);
          console.log(executionInfo);
     }
);
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// app can run notifications in foreground
Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
     }),
});

export default function App() {
     // get all active notifications upon initial render
     useEffect(() => {
          // Notifications.cancelAllScheduledNotificationsAsync();
          Notifications.getAllScheduledNotificationsAsync();
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
