// react and misc.
import { useState } from "react";

// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// react navigation
import { useTheme } from "@react-navigation/native";

// icons
import DotsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react native
import {
     Text,
     View,
     ScrollView,
     Button,
     Switch,
     StyleSheet,
     ToastAndroid,
     Modal,
     Pressable,
} from "react-native";

const Home = () => {
     // app theme deconstruction
     const { colors } = useTheme();

     // init component state
     const [reminders, setReminders] = useState(null);
     const [time, setTime] = useState(new Date());
     const [modalVisible, setModalVisible] = useState(false);
     const [xyz, setXyz] = useState();

     // function to change time state
     const onTimeChange = (e, selectedTime) => {
          setTime(() => selectedTime);
     };

     // opens time picker in Android module
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

     // shows toast message
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
          // fixme: push notifications on a per/hour basis, or user needs to generate several??
          // fixme: see "exact alarm permissions" in dev.android api docs
          <Pressable
               style={{
                    border: "solid",
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 100,
               }}
               onLongPress={() => setModal("reminder")}
          >
               <Text style={{ ...styles.reminderText, color: colors.white }}>
                    Reality Check set for {formatTime(time)}
               </Text>
          </Pressable>
     );

     // function changes what modal displays depending on argument
     const setModal = (type) => {
          if (type === "reminder") {
               setXyz(
                    <>
                         <Text style={{ color: "red", fontSize: 30 }}>
                              This reminder is set for {formatTime(time)}
                         </Text>
                         <Text>remove</Text>
                         {/* fixme: add an alert that user is about to delete the reminder */}
                         <Text>edit time</Text>
                    </>
               );
               setModalVisible(() => true);
          }
          if (type === "more") {
               setXyz(
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
          <Modal
               animationType="fade"
               visible={modalVisible}
               statusBarTranslucent={true}
               presentationStyle="overFullScreen"
               onRequestClose={() => setModalVisible(() => !modalVisible)}
          >
               <View
                    style={{
                         ...styles.container,
                         margin: 0,
                         backgroundColor: colors.background,
                         flex: 1,
                    }}
               >
                    <CloseIcon
                         name="close"
                         size={24}
                         color={colors.white}
                         onPress={() => setModalVisible(() => false)}
                    />
                    {xyz}
               </View>
          </Modal>
     );

     return (
          <View>
               {modalVisible && showModal}
               <Pressable
                    onPress={() => setModal("more")}
                    style={{
                         top: 0,
                         right: 0,
                         padding: 20,
                         position: "absolute",
                         zIndex: 1,
                    }}
               >
                    <DotsIcon
                         name="dots-vertical"
                         size={24}
                         color={colors.white}
                    />
               </Pressable>
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
                                   ...styles.reminderText,
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
                    {/* fixme: below logic needs to be fine tuned */}
                    {/*  useCallback in useEffect to remember if reminders are set */}
                    {!reminders && showToast(false)}
                    {reminders && showReminders}
                    {reminders && showToast(true)}
                    <Button
                         title="Add Reminder"
                         onPress={showTimePicker}
                         color={colors.notification}
                         // fixme: if you want rounded buttons, turn all Button components into Pressable components with: style={{ borderRadius: 100 }}
                    />
               </ScrollView>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          alignItems: "center",
          justifyContent: "center",
          margin: 40,
          backgroundColor: "red",
     },
     title: {
          fontSize: 36,
          marginBottom: 40,
     },
     text: {
          fontSize: 24,
     },
     reminderText: {
          fontSize: 16,
          padding: 10,
     },
});

export default Home;
