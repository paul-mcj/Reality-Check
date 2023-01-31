// react and misc.
import { useEffect, useContext, useState, useRef } from "react";

// expo notifications
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// react navigation
import { useTheme, useScrollToTop } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";
import Reminder from "../components/Reminder";

// context
import ReminderContext from "../context/ReminderContext";
import ModalContext from "../context/ModalContext";
import ToastContext from "../context/ToastContext";
import AlertContext from "../context/AlertContext";

// icons
import DotsIcon from "react-native-vector-icons/MaterialCommunityIcons";

// utils
import { formatTime } from "../utils/helperFunctions";

// react native
import { Text, View, ScrollView } from "react-native";

// fixme: put all timepicker and Notification stuff in custom hook??
// run notifications in background
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
TaskManager.defineTask(
     BACKGROUND_NOTIFICATION_TASK,
     ({ data, error, executionInfo }) => {
          console.log(data);
          console.log(error);
          console.log(executionInfo);
          triggerNotification(trigger);
     }
);
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// notification to remind user
const triggerNotification = async (trigger) => {
     await Notifications.scheduleNotificationAsync({
          content: {
               title: "Reality Check",
               body: "Perform scheduled reality check!",
          },
          trigger: {
               hour: trigger.getHours(),
               minute: trigger.getMinutes(),
               repeats: true,
          },
     });
     //fixme: should this be called here also?:
     // Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
};

// run notification in foreground
Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
     }),
});

const Home = () => {
     // local state
     const [not, setNot] = useState();

     // app theme deconstruction
     const {
          colors,
          smallTextWhite,
          smallTextNotification,
          container,
          title,
          text,
     } = useTheme();

     // init context
     const { dispatch: modalDispatch } = useContext(ModalContext);
     const { reminders, addReminder } = useContext(ReminderContext);
     const {
          isToast,
          invokeToast,
          setMessage: setToastMessage,
     } = useContext(ToastContext);
     const { dispatch: alertDispatch } = useContext(AlertContext);

     // hooks
     const ref = useRef(null);
     useScrollToTop(ref);

     // open modal and display additional static app information
     const openMoreInfo = () => {
          modalDispatch({ type: "MORE" });
     };

     // opens time picker modal in Android module
     const showTimePicker = () =>
          DateTimePickerAndroid.open({
               value: new Date(),
               // when the selected time is confirmed by user, make a new reminder obj
               onChange: createNewReminder,
               mode: "time",
               is24Hour: false,
          });

     // function changes local time state, creates a new reminder with the time, and adds it to reminder context
     const createNewReminder = (e, selectedTime) => {
          // users should not be able to have multiple reminders set at the same time (they must be at least a min apart), so if selectedTime is already in the reminder context then Alert users they cannot make multiple reminders at the same time
          let timeAlreadyInContext = false;
          reminders.forEach((item) => {
               if (formatTime(selectedTime) === formatTime(item.time)) {
                    timeAlreadyInContext = true;
                    // dismiss immediately and return to not update Toast if "cancel" is tapped in the timer picker modal
                    if (e.type === "dismissed") {
                         return;
                    }
                    // otherwise set Alert state (make sure data is set to null, otherwise it will be referencing the last updated context which might cause unwanted bugs the next time Alert context is updated)
                    alertDispatch({
                         type: "DUPLICATE_REMINDER",
                         payload: {
                              title: "Error",
                              message: `There is already a reminder set for ${formatTime(
                                   selectedTime
                              )}!`,
                         },
                    });
               }
          });
          // if this reminder time is unique in the context:
          if (e.type === "set" && !timeAlreadyInContext) {
               // add time, unique id and an active state (true by default) to new reminder object
               const newReminder = {
                    time: selectedTime,
                    id: selectedTime.getTime(),
                    active: true,
               };
               // add new object to reminder context
               addReminder(newReminder);
               // Toast that new reminder has been created
               setToastMessage(() => "New reminder created!");
               invokeToast();
               // fixme: app will now make a notification at the scheduled time everyday
               // triggerNotification(selectedTime);
               // note: this will erase all notifications in the use effect state, as long as there is no triggering of notifications like above!
               // Notifications.cancelAllScheduledNotificationsAsync();
               setNot(() => Notifications.getAllScheduledNotificationsAsync());
          }
     };

     useEffect(() => {
          console.log(not);
     });

     return (
          <>
               <View
                    style={{
                         right: 20,
                         top: 20,
                         position: "absolute",
                         zIndex: 2,
                    }}
               >
                    <TextButton
                         style={{ padding: 20 }}
                         minWidth={0}
                         borderWidth={0}
                         backgroundColor={colors.notification}
                         onPress={openMoreInfo}
                    >
                         <DotsIcon
                              style={{ padding: 10 }}
                              name="dots-vertical"
                              size={24}
                              color={colors.white}
                         />
                    </TextButton>
               </View>
               <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
                    <View style={container}>
                         <Text style={title}>Home</Text>
                         <Text style={{ ...text, marginBottom: 40 }}>
                              This app is designed to help you perform daily
                              "reality checks" in order to bring about lucidity
                              during sleep.
                         </Text>
                         <TextButton
                              onPress={showTimePicker}
                              backgroundColor={colors.notification}
                              minWidth={150}
                         >
                              {/* fixme: have another button that can turn on/off ALL reminders in one swoop??*/}
                              <Text style={smallTextWhite}>Add Reminder</Text>
                         </TextButton>
                    </View>
                    <View style={container}>
                         {reminders.length === 0 && (
                              <Text
                                   style={{
                                        ...smallTextWhite,
                                        marginBottom: 40,
                                   }}
                              >
                                   No reminders currently set
                              </Text>
                         )}
                         {reminders.length !== 0 &&
                              reminders.map((item) => (
                                   <Reminder
                                        id={item.id}
                                        key={item.id}
                                        time={item.time}
                                        active={item.active}
                                        canOpenReminder={true}
                                   />
                              ))}
                    </View>
               </ScrollView>
          </>
     );
};

export default Home;
