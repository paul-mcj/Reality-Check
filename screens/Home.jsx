// react and misc.
import { useState, useEffect } from "react";

// expo notifications
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// react navigation
import { useTheme } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";
import HomeInfoList from "../components/HomeInfoList";

// icons
import DotsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react native
import {
     Text,
     View,
     ScrollView,
     Switch,
     StyleSheet,
     ToastAndroid,
} from "react-native";

// global variable to always get current time
const now = new Date();

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
     const { colors } = useTheme();

     // init component state
     const [reminders, setReminders] = useState(null);
     const [time, setTime] = useState(new Date());
     const [modalVisible, setModalVisible] = useState(false);
     const [modalOutput, setModalOutput] = useState();
     const [first, setFirst] = useState(false);

     // function changes state for time picker
     const onTimeChange = (e, selectedTime) => {
          setTime(() => selectedTime);
     };

     // fixme: this useEffect should be skipped on initial render of app??
     useEffect(() => {
          let nextTrigger = Math.ceil((time.getTime() - now.getTime()) / 1000);
          // console.log(`now: ${now}`);
          // console.log(`trigger is now: ${nextTrigger}`);
          // note: additional logic ensures that there will be at least one min before setting off future notification
          if (nextTrigger >= 60) {
               triggerNotification(nextTrigger);
          }
     }, [time]);

     // opens time picker modal in Android module
     const showTimePicker = () =>
          DateTimePickerAndroid.open({
               value: time,
               onChange: onTimeChange,
               mode: "time",
               is24Hour: false,
          });

     // function used to format time into a proper string according to 12-hour clock system
     const formatTime = (time) => {
          let hours = time.getHours();
          let minutes = time.getMinutes();
          let ampm = hours >= 12 ? "pm" : "am";
          hours %= 12;
          hours = hours ? hours : 12; // hours "0" should be "12"
          minutes = minutes < 10 ? `0${minutes}` : minutes;
          return `${hours}:${minutes} ${ampm}`;
     };

     // show toast message
     const showToast = (bool) => {
          bool
               ? ToastAndroid.show(
                      "All reminders are now on",
                      ToastAndroid.LONG
                 )
               : ToastAndroid.show(
                      "All reminders are set to off",
                      ToastAndroid.LONG
                 );
     };

     // for JSX slimming
     const showReminders = (
          // fixme: can app push notifications on a per/hour basis (using android alarm permissions), or does user need to generate individually??
          // fixme: see "exact alarm permissions" in dev.android api docs
          <TextButton
               backgroundColor={colors.notification}
               onPress={() => setModal("reminder")}
          >
               <Text style={{ ...styles.smallText, color: colors.white }}>
                    Reality Check set for {formatTime(time)}
               </Text>
          </TextButton>
     );

     // function changes what modal displays depending on argument
     const setModal = (type) => {
          if (type === "reminder") {
               setModalOutput(
                    <>
                         <Text style={{ ...styles.text, color: colors.white }}>
                              This reminder is set for {formatTime(time)}
                         </Text>
                         <TextButton
                              backgroundColor={colors.notification}
                              onPress={() => Alert.alert("Title")}
                         >
                              {/* fixme: add an alert that user is about to delete the reminder */}
                              <Text
                                   style={{
                                        ...styles.smallText,
                                        color: colors.white,
                                   }}
                              >
                                   Delete
                              </Text>
                         </TextButton>
                         <TextButton backgroundColor={colors.notification}>
                              {/* fixme: open android time dialog */}
                              <Text
                                   style={{
                                        ...styles.smallText,
                                        color: colors.white,
                                   }}
                              >
                                   Edit
                              </Text>
                         </TextButton>
                    </>
               );
               setModalVisible(() => true);
          }
          if (type === "more") {
               setModalOutput(<HomeInfoList />);
               setModalVisible(() => true);
          }
     };

     // for JSX slimming
     const showModal = (
          <View style={styles.container}>
               {/* fixme: BackHandler to go to Home page should be allowed */}
               <CloseIcon
                    name="close"
                    size={24}
                    color={colors.white}
                    onPress={() => setModalVisible(() => false)}
                    style={{ marginBottom: 40 }}
               />
               {modalOutput}
          </View>
     );

     return (
          <>
               {modalVisible && showModal}
               <ScrollView contentContainerStyle={styles.container}>
                    {!modalVisible && (
                         <>
                              <View
                                   style={{
                                        right: 20,
                                        top: 20,
                                        position: "absolute",
                                        zIndex: 1,
                                        padding: 10,
                                   }}
                              >
                                   <TextButton
                                        borderWidth={0}
                                        backgroundColor={colors.background}
                                        onPress={() => setModal("more")}
                                   >
                                        <DotsIcon
                                             name="dots-vertical"
                                             size={24}
                                             color={colors.white}
                                        />
                                   </TextButton>
                              </View>

                              <ScrollView>
                                   <Text
                                        style={{
                                             ...styles.title,
                                             color: colors.white,
                                        }}
                                   >
                                        Home
                                   </Text>
                                   <Text
                                        style={{
                                             ...styles.text,
                                             color: colors.white,
                                        }}
                                   >
                                        Inducing lucid dreams takes practice.
                                   </Text>
                                   <Text
                                        style={{
                                             ...styles.text,
                                             color: colors.white,
                                        }}
                                   >
                                        This app is designed to help you perform
                                        daily "reality checks" in order to bring
                                        about lucidity during sleep.
                                   </Text>
                                   <View
                                        style={{
                                             flex: 2,
                                             flexDirection: "row",
                                             alignItems: "center",
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  ...styles.smallText,
                                                  color: colors.white,
                                             }}
                                        >
                                             {reminders
                                                  ? "Shut Off"
                                                  : "Turn On"}{" "}
                                             Reminders
                                        </Text>
                                        <Switch
                                             value={reminders}
                                             onValueChange={() =>
                                                  setReminders(() => !reminders)
                                             }
                                             trackColor={{
                                                  false: colors.dim,
                                                  true: colors.secondary,
                                             }}
                                             thumbColor={
                                                  reminders
                                                       ? colors.notification
                                                       : colors.text
                                             }
                                        />
                                   </View>
                                   {/* fixme: below logic needs to be fine tuned useCallback in a useEffect to remember if reminders are set */}
                                   {/* // fixme: all reminders should be an array that is looped thorugh. instead of having one Switch to turn all reminders off/on, EACH reminder has a switch option for off/on logic*/}
                                   {/* {!reminders && showToast(false)} */}
                                   {reminders && showReminders}
                                   {/* {reminders && showToast(true)} */}
                                   <TextButton
                                        onPress={showTimePicker}
                                        backgroundColor={colors.white}
                                   >
                                        <Text style={styles.smallText}>
                                             Add Reminder
                                        </Text>
                                   </TextButton>
                                   <TextButton
                                        onPress={() => triggerNotification(3)}
                                        backgroundColor={colors.white}
                                   >
                                        <Text style={styles.smallText}>
                                             test notification button
                                        </Text>
                                   </TextButton>
                              </ScrollView>
                         </>
                    )}
               </ScrollView>
          </>
     );
};

const styles = StyleSheet.create({
     container: {
          alignItems: "center",
          justifyContent: "center",
          margin: 40,
     },
     title: {
          fontSize: 36,
          marginBottom: 40,
     },
     text: {
          fontSize: 24,
     },
     smallText: {
          fontSize: 16,
          padding: 10,
     },
});

export default Home;
