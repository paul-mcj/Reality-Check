// context
import AlertContext from "../context/AlertContext";
import ReminderContext from "../context/ReminderContext";
import ToastContext from "../context/ToastContext";
import ModalContext from "../context/ModalContext";

// components
import TextButton from "./TextButton";

// react and misc
import { useContext, useState } from "react";
import PropTypes from "prop-types";

// utils
import { formatTime, showTimePicker } from "../utils/helperFunctions";

// hooks
import useNotification from "../hooks/use-notification";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, Text, ScrollView } from "react-native";

// eslint-disable-next-line react/display-name
const EditReminderItem = ({ reminder }) => {
     // initialize local state
     const [displayTime, setDisplayTime] = useState(reminder.time);

     // init context
     const { dispatch: alertDispatch } = useContext(AlertContext);
     const { reminders, deleteReminder, addReminder } =
          useContext(ReminderContext);
     const { invokeToast, setMessage: setToastMessage } =
          useContext(ToastContext);
     const { dispatch: modalDispatch } = useContext(ModalContext);

     // hooks
     const { triggerNotification } = useNotification();

     // app theme deconstruction
     const { colors, smallTextWhite, text } = useTheme();

     // function will delete entry from reminder context
     const handleDelete = () => {
          // Alert user is about to delete the entry
          alertDispatch({
               type: "DELETE_REMINDER",
               payload: {
                    title: "Warning",
                    message: "Are you sure you want to delete this reminder?",
                    data: reminder,
               },
          });
     };

     // function will allow users to edit the reminder time and thus update reminder context
     const updateReminder = (e, selectedTime) => {
          // users should not be able to have multiple reminders set at the same time (they must be at least a min apart), so if selectedTime is already in the reminder context then Alert users they cannot make multiple reminders at the same time
          let timeAlreadyInContext = false;
          reminders.forEach((item) => {
               if (formatTime(selectedTime) === formatTime(item.time)) {
                    timeAlreadyInContext = true;
                    // dismiss immediately if user cancels timepicker modal
                    if (e.type === "dismissed") {
                         return;
                    }
                    // otherwise set Alert state
                    alertDispatch({
                         type: "DUPLICATE_REMINDER",
                         payload: {
                              title: "Error",
                              message: `There is already a reminder set for ${formatTime(
                                   selectedTime
                              )}. Please select a different time.`,
                         },
                    });
               }
          });
          // if this reminder time is unique in the context:
          if (e.type === "set" && !timeAlreadyInContext) {
               // remove old reminder object from reminder context
               deleteReminder(reminder.id);
               // update the reminder object with the new selected time, and schedule a new notification for it as well
               const updatedReminder = {
                    time: selectedTime,
                    id: reminder.id,
                    active: reminder.active,
                    // this always needs to trigger a notification by default, as its "re-creating a new object" and to leave it null will cause an error with the object later when changing its active state
                    notificationIdentifier: triggerNotification(selectedTime),
               };
               // if the updatedReminder object has a false "active" prop state, then delete the notification (otherwise the object will trigger a notification even if its set to off)
               if (!updatedReminder.active) {
                    console.log("active was false");
                    deleteReminder(reminder.id);
               }
               // add updated reminder object to reminder context
               addReminder(updatedReminder);
               // Toast that new reminder has been created
               setToastMessage(() => "Reminder updated");
               invokeToast();
               modalDispatch({ type: "CLOSE_MODAL" });
               setDisplayTime(() => updatedReminder.time);
          }
     };

     // for JSX slimming
     const showButtons = (
          <View
               style={{
                    flexDirection: "row",
                    marginTop: 40,
                    marginBottom: 80,
               }}
          >
               <View style={{ paddingRight: 50 }}>
                    <TextButton
                         backgroundColor={colors.notification}
                         minWidth={100}
                         onPress={() =>
                              showTimePicker(updateReminder, reminder.time)
                         }
                    >
                         <Text style={smallTextWhite}>Update</Text>
                    </TextButton>
               </View>
               <TextButton
                    backgroundColor={colors.notification}
                    minWidth={100}
                    onPress={handleDelete}
               >
                    <Text style={smallTextWhite}>Delete</Text>
               </TextButton>
          </View>
     );

     return (
          <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{
                    alignItems: "center",
                    marginTop: 200,
               }}
          >
               <Text style={text}>
                    This reminder is currently
                    {reminder.active ? " on and" : " off, but"} set for{" "}
                    {formatTime(displayTime)}.
               </Text>
               <Text style={text}>
                    You can update the notification time below, or choose to
                    delete it.
               </Text>
               {showButtons}
          </ScrollView>
     );
};

EditReminderItem.propTypes = {
     reminder: PropTypes.object.isRequired,
};

export default EditReminderItem;
