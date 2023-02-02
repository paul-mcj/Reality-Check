// context
import AlertContext from "../context/AlertContext";
import ReminderContext from "../context/ReminderContext";
import ToastContext from "../context/ToastContext";

// components
import TextButton from "./TextButton";

// react and misc
import { useContext, useState } from "react";
import PropTypes from "prop-types";

// utils
import { formatTime, showTimePicker } from "../utils/helperFunctions";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, Text, ScrollView } from "react-native";

const EditReminderItem = ({ reminder }) => {
     // initialize local state
     const [displayTime, setDisplayTime] = useState(reminder.time);

     // init context
     const { dispatch: alertDispatch } = useContext(AlertContext);
     const { reminders, deleteReminder, addReminder } =
          useContext(ReminderContext);
     const { invokeToast, setMessage: setToastMessage } =
          useContext(ToastContext);

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
               // update the reminder object with the new selected time
               const updatedReminder = {
                    time: selectedTime,
                    id: reminder.id,
                    active: reminder.active,
               };
               // remove old reminder object from reminder context
               deleteReminder(reminder.id);
               // add updated reminder object to reminder context
               addReminder(updatedReminder);
               // Toast that new reminder has been created
               setToastMessage(() => "Reminder updated");
               invokeToast();
               setDisplayTime(() => updatedReminder.time);
               // fixme: update notification?
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
