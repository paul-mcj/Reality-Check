// note: general app fixes
// fixme: how to optimize react native apps? fells very slow...
// fixme: google fonts??
// fixme: add app-wide functionality for backHandler

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

export default function App() {
     // fixme: reminders, notifications, and journal entries loaded in App.js (look into local storage). use callback, too ?
     // useEffect(() => {
     //      let nextTrigger = Math.ceil((time.getTime() - now.getTime()) / 1000);
     // console.log(`now: ${now}`);
     // console.log(`trigger is now: ${nextTrigger}`);
     // note: additional logic ensures that there will be at least one min before setting off future notification
     //      if (nextTrigger >= 60) {
     //           triggerNotification(nextTrigger);
     //      }
     // }, [time]);

     return (
          <ModalProvider>
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
          </ModalProvider>
     );
}
