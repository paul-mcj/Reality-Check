// note: general app fixes
// fixme: how to optimize react native apps? fells very slow...(use callback anywhere?)
// fixme: google fonts??
// fixme: add app-wide functionality for backHandler
// fixme: fix all styles for consistency (ex. textbutton component colors should be all the same, with the exception of the Reminder component can be white not purple), all main screens should have the same margins...
// fixme: check linter and all unused things in entire app for deletion
// fixme: readme should be properly documented when finished to github

// react navigation
import { NavigationContainer } from "@react-navigation/native";

// expo
import { StatusBar } from "expo-status-bar";

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
import { NotificationProvider } from "./context/NotificationContext";

export default function App() {
     return (
          <NotificationProvider>
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
          </NotificationProvider>
     );
}
