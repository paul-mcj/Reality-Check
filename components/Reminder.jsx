// react and misc
import PropTypes from "prop-types";

// components
import TextButton from "./TextButton";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { Text, Switch, View } from "react-native";

// utils
import { formatTime } from "../utils/helperFunctions";

// context
import ModalContext from "../context/ModalContext";
import ReminderContext from "../context/ReminderContext";

// react and misc
import { useContext } from "react";

const Reminder = ({ id, time, active }) => {
     // app theme deconstruction
     const { colors, container, text, title, border, smallTextNotification } =
          useTheme();

     // context
     const { setModal, setReducerType } = useContext(ModalContext);
     const {
          reminders,
          deleteReminder,
          editReminderTime,
          editReminderIsActive,
     } = useContext(ReminderContext);

     // fixme: modal open, and ability to edit time or remove reminder from reminder context (alert user before deletion!)

     // open modal and display options related to specific reminder object
     const openReminder = () => {
          setReducerType(() => id);
          setModal(() => true);
     };

     return (
          <View
               style={{
                    flex: 2,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
               }}
          >
               <TextButton
                    backgroundColor={active ? colors.white : colors.text}
                    borderColor={active ? colors.white : colors.text}
                    onPress={openReminder}
                    minWidth={"80%"}
               >
                    <Text style={smallTextNotification}>
                         {active
                              ? `Reminder set for ${formatTime(time)}`
                              : `Reminder for ${formatTime(time)} off`}
                    </Text>
               </TextButton>
               {/* // fixme: EACH reminder has a switch option for off/on logic, will toast in Home.jsx*/}
               <Switch
                    value={active}
                    onValueChange={() => editReminderIsActive(id)}
                    trackColor={{
                         false: colors.dim,
                         true: colors.secondary,
                    }}
                    thumbColor={active ? colors.notification : colors.text}
               />
          </View>
     );
};

Reminder.propTypes = {
     id: PropTypes.number.isRequired,
     time: PropTypes.object.isRequired,
     active: PropTypes.bool.isRequired,
};

export default Reminder;
