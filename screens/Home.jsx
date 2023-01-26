// react and misc.
import { useEffect, useContext } from "react";

// expo notifications
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// react navigation
import { useTheme } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";
import Reminder from "../components/Reminder";
import Toast from "../components/Toast";

// context
import ReminderContext from "../context/ReminderContext";
import ModalContext from "../context/ModalContext";
import ToastContext from "../context/ToastContext";

// icons
import DotsIcon from "react-native-vector-icons/MaterialCommunityIcons";

// react native
import { Text, View, FlatList } from "react-native";

// fixme: put all timepicker and Notification stuff in custom hook??
// run notifications in background
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
TaskManager.defineTask(
     BACKGROUND_NOTIFICATION_TASK,
     ({ data, error, executionInfo }) => {
          triggerNotification(3);
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
          trigger: { seconds: trigger },
     });
};

// run notification in foreground
Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
     }),
});

const Home = () => {
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
     const { modal, setModal, setReducerType } = useContext(ModalContext);
     const { reminders, addReminder } = useContext(ReminderContext);
     const { isToast } = useContext(ToastContext);

     // open modal and display additional static app information
     const moreInfo = () => {
          setReducerType(() => "MORE");
          setModal(() => true);
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
          // fixme: go though reminder context: if selectedTime is already in the state then cancel below logic, and set an alert or toast that the reminder for that time is already set!!
          // if (e.type === "set" && NOT_ALREADY_IN_REMINDER_CONTEXT)
          if (e.type === "set") {
               // add time, unique id and an active state (true by default) to new reminder object
               const newReminder = {
                    time: selectedTime,
                    id: selectedTime.getTime(),
                    active: true,
               };
               // add new object to context
               addReminder(newReminder);
          }
     };

     // for JSX slimming
     const showReminders = (
          <FlatList
               style={{ marginBottom: 80 }}
               data={reminders}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => (
                    <Reminder
                         id={item.id}
                         time={item.time}
                         active={item.active}
                    />
               )}
          />
     );

     return (
          <>
               <View
                    style={{
                         right: 20,
                         top: 20,
                         position: "absolute",
                         zIndex: 2,
                         padding: 10,
                    }}
               >
                    <TextButton
                         minWidth={0}
                         borderWidth={0}
                         backgroundColor={colors.background}
                         onPress={moreInfo}
                    >
                         <DotsIcon
                              name="dots-vertical"
                              size={24}
                              color={colors.white}
                         />
                    </TextButton>
               </View>
               <View style={container}>
                    <Text style={title}>Home</Text>
                    <Text style={{ ...text, marginBottom: 80 }}>
                         This app is designed to help you perform daily "reality
                         checks" in order to bring about lucidity during sleep.
                    </Text>
                    <TextButton
                         onPress={showTimePicker}
                         backgroundColor={colors.notification}
                         minWidth={150}
                    >
                         {/* fixme: have another button that can turn on/off ALL reminders in one swoop??*/}
                         <Text style={smallTextWhite}>Add Reminder</Text>
                    </TextButton>
                    {/* <TextButton
                                        onPress={() => triggerNotification(3)}
                                        backgroundColor={colors.white}
                                   >
                                        <Text style={smallTextNotification}>
                                             test notification button
                                        </Text>
                                   </TextButton> */}
                    {reminders.length === 0 ? (
                         <Text
                              style={{
                                   ...smallTextWhite,
                                   marginBottom: 40,
                              }}
                         >
                              No reminders currently set
                         </Text>
                    ) : (
                         showReminders
                    )}
               </View>
          </>
     );
};

export default Home;
