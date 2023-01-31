// context
import AlertContext from "../context/AlertContext";
import ModalContext from "../context/ModalContext";
import ReminderContext from "../context/ReminderContext";

// components
import TextButton from "./TextButton";
import Reminder from "./Reminder";

// react and misc
import { useContext } from "react";
import PropTypes from "prop-types";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, Text, ScrollView } from "react-native";

const EditReminderItem = ({ reminder }) => {
     // init context
     const { dispatch: modalDispatch } = useContext(ModalContext);
     const { dispatch: alertDispatch } = useContext(AlertContext);
     const {
          reminders,
          addReminder,
          deleteReminder,
          editReminderTime,
          editReminderIsActive,
     } = useContext(ReminderContext);

     // app theme deconstruction
     const { colors, smallTextWhite, border } = useTheme();

     // function will delete entry from reminder context
     const handleDelete = () => {
          console.log("delete");
     };
     // reminder context

     // function will allow users to edit the reminder time and update reminder context
     const handleEdit = () => {
          console.log("edit");
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
                         onPress={handleEdit}
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
          <ScrollView showsVerticalScrollIndicator={false}>
               <Reminder
                    id={reminder?.id}
                    time={reminder?.time}
                    active={reminder?.active}
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
