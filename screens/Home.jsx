// react and misc.
import { useState } from "react";

// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// react navigation
import { useTheme } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";

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

const Home = () => {
     // app theme deconstruction
     const { colors } = useTheme();

     // init component state
     const [reminders, setReminders] = useState(null); // fixme: should be an array to be filled?
     const [time, setTime] = useState(new Date());
     const [modalVisible, setModalVisible] = useState(false);
     const [modalOutput, setModalOutput] = useState();

     // function changes state for time picker
     const onTimeChange = (e, selectedTime) => {
          setTime(() => selectedTime);
     };

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
               setModalOutput(
                    <>
                         <Text style={{ ...styles.text, color: colors.white }}>
                              During waking life: Am I dreaming? What do i look
                              like? Look at your hands! Re-call your dreams (or
                              read the journal!) Focus on you feet and stay
                              grounded!
                         </Text>
                         <Text style={{ ...styles.text, color: colors.white }}>
                              Just before bed: Affirmation: "I am good at
                              experiencing lucid dreams", "I will have one
                              tonight"; Visualize a recent lucid dream in a
                              relaxed state and imagine the point where you
                              became lucid
                         </Text>
                         <Text style={{ ...styles.text, color: colors.white }}>
                              After lucidity : don't get too excited and wake
                              up, ground yourself by focusing on your feet and
                              stabilize the dream
                         </Text>
                    </>
               );
               setModalVisible(() => true);
          }
     };

     // for JSX slimming
     const showModal = (
          <View
               style={{
                    ...styles.container,
                    margin: 0,
                    backgroundColor: colors.background,
                    flex: 1,
                    zIndex: 1,
                    position: "absolute",
               }}
          >
               <CloseIcon
                    name="close"
                    size={24}
                    color={colors.white}
                    onPress={() => setModalVisible(() => false)}
               />
               {modalOutput}
          </View>
     );

     return (
          <View>
               {modalVisible && showModal}
               {!modalVisible && (
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
               )}
               <ScrollView contentContainerStyle={styles.container}>
                    <Text style={{ ...styles.title, color: colors.white }}>
                         Home
                    </Text>
                    <Text style={{ ...styles.text, color: colors.white }}>
                         Inducing lucid dreams takes practice.
                    </Text>
                    <Text style={{ ...styles.text, color: colors.white }}>
                         This app is designed to help you perform daily "reality
                         checks" in order to bring about lucidity during sleep.
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
                              {reminders ? "Shut Off" : "Turn On"} Reminders
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
                                   reminders ? colors.notification : colors.text
                              }
                         />
                    </View>
                    {/* fixme: below logic needs to be fine tuned useCallback in a useEffect to remember if reminders are set */}
                    {/* {!reminders && showToast(false)} */}
                    {reminders && showReminders}
                    {/* {reminders && showToast(true)} */}
                    <TextButton
                         onPress={showTimePicker}
                         backgroundColor={colors.white}
                    >
                         <Text style={styles.smallText}>Add Reminder</Text>
                    </TextButton>
               </ScrollView>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          alignItems: "center",
          justifyContent: "center",
          margin: 40,
          // backgroundColor: "red",
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
