// react navigation
import { NavigationContainer } from "@react-navigation/native";

// expo
import { StatusBar } from "expo-status-bar";

// react and misc
import { useRef, useState } from "react";

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
import { useEffect } from "react";

export default function App() {
     const [notification, setNotification] = useState(false);
     const notificationListener = useRef();
     const responseListener = useRef();

     useEffect(() => {
          notificationListener.current =
               Notifications.addNotificationReceivedListener((notification) => {
                    setNotification(notification);
               });

          responseListener.current =
               Notifications.addNotificationResponseReceivedListener(
                    (response) => {
                         console.log(response);
                    }
               );

          return () => {
               Notifications.removeNotificationSubscription(
                    notificationListener.current
               );
               Notifications.removeNotificationSubscription(
                    responseListener.current
               );
          };
     }, []);
     // initialize ref for notifications
     //      const notificationListener = useRef();

     //      // initialize notification settings upon app startup
     //      useEffect(()=>{

     //           // app can run notifications in background
     // const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
     // TaskManager.defineTask(
     //      BACKGROUND_NOTIFICATION_TASK,
     //      ({ data, error, executionInfo }) => {
     //           console.log(data);
     //           console.log(error);
     //           console.log(executionInfo);
     //           addNotification(trigger);
     //      }
     // );
     // Notifications.registerTaskAsync("BACKGROUND_NOTIFICATION_TASK");

     // // app can run notification in foreground
     // Notifications.setNotificationHandler({
     //      handleNotification: async () => ({
     //           shouldShowAlert: true,
     //           shouldPlaySound: true,
     //      }),
     // });

     // // when a notification occurs, tapping it brings up the home page
     // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {});
     //      },[])

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
