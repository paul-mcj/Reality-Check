// context
import AlertContext from "../context/AlertContext";
import ModalContext from "../context/ModalContext";
import ReminderContext from "../context/ReminderContext";
import ToastContext from "../context/ToastContext";

// components
import TextButton from "./TextButton";
import Reminder from "./Reminder";

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
     // init local state
     const [updated, setUpdated] = useState({
          time: reminder.time,
          id: reminder.id,
          active: reminder.active,
     });

     // init context
     const { dispatch: modalDispatch } = useContext(ModalContext);
     const { dispatch: alertDispatch } = useContext(AlertContext);
     const { reminders, deleteReminder, addReminder } =
          useContext(ReminderContext);
     const {
          isToast,
          invokeToast,
          setMessage: setToastMessage,
     } = useContext(ToastContext);

     // app theme deconstruction
     const { colors, smallTextWhite, container, border } = useTheme();

     // function will delete entry from reminder context
     const handleDelete = () => {
          // Alert user is about to delete the entry
          // console.log("delete");
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
     const editReminder = (e, selectedTime) => {
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
                              )}!`,
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
               setUpdated(() => ({ ...updatedReminder, time: selectedTime }));
               // setDisplayTime(() => updatedReminder.time);
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
                              showTimePicker(editReminder, reminder.time)
                         }
                    >
                         <Text style={smallTextWhite}>Edit</Text>
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
               {/* fixme: switch isn't working for on/off reminder */}
               <Reminder
                    id={updated.id}
                    time={updated.time}
                    active={updated.active}
                    canOpenReminder={false}
               />
               {showButtons}
          </ScrollView>
     );
};

EditReminderItem.propTypes = {
     reminder: PropTypes.object.isRequired,
};

export default EditReminderItem;
