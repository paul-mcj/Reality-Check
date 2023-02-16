// note: general app fixes
// fixme: how to optimize react native apps? fells very slow...(use callback anywhere?)
// fixme: google fonts??
// fixme: add app-wide functionality for backHandler
// fixme: fix all styles for consistency (ex. textbutton component colors should be all the same, with the exception of the Reminder component can be white not purple), all main screens should have the same margins...
// fixme: check linter and all unused things in entire app for deletion
// fixme: readme should be properly documented when finished to github
// fixme: make sure all async function are properly wrapped with try/catch
// fixme: Set custom icon and color for notifications on Android
// fixme: Listen to interactions with notifications (bring to app when touched!)

// react navigation
import { NavigationContainer } from "@react-navigation/native";

// expo
import { StatusBar } from "expo-status-bar";

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
          addNotification(trigger);
     }
);
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// app can run notification in foreground
Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
     }),
});

// note: this will erase all notifications as long as there is no triggering of notifications in current state!
// Notifications.cancelAllScheduledNotificationsAsync();
// setNot(() =>
//      Notifications.getAllScheduledNotificationsAsync()
// );

export default function App() {
     return (
          <ModalProvider>
               <AlertProvider>
                    <ToastProvider>
                         <ReminderProvider>
                              <JournalProvider>
                                   <NavigationContainer theme={theme}>
                                        <StatusBar hidden={true} />
                                        <MainScreens />
                                   </NavigationContainer>
                              </JournalProvider>
                         </ReminderProvider>
                    </ToastProvider>
               </AlertProvider>
          </ModalProvider>
     );
}
