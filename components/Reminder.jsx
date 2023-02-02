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
import ToastContext from "../context/ToastContext";

// react and misc
import { useContext } from "react";

const Reminder = ({ id, time, active, canOpenReminder }) => {
     // app theme deconstruction
     const { colors, smallTextNotification } = useTheme();

     // init context
     const { dispatch: modalDispatch } = useContext(ModalContext);
     const { reminders, editReminderIsActive } = useContext(ReminderContext);
     const { invokeToast, setMessage: setToastMessage } =
          useContext(ToastContext);

     // open modal and display options related to specific reminder object
     const openReminder = () => {
          modalDispatch({ type: "REMINDER", payload: { id, data: reminders } });
     };

     // call function when reminder active state changes via Switch component
     const handleOnValueChange = () => {
          editReminderIsActive(id);
          // Toast that reminder is set off/on depending on active state
          if (active) {
               setToastMessage(() => `Reminder for ${formatTime(time)} off`);
               invokeToast();
          } else {
               setToastMessage(() => `Reminder set for ${formatTime(time)}`);
               invokeToast();
          }
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
                    onPress={canOpenReminder ? openReminder : () => {}}
                    minWidth={"80%"}
               >
                    <Text style={smallTextNotification}>
                         {active
                              ? `Reminder set for ${formatTime(time)}`
                              : `Reminder for ${formatTime(time)} off`}
                    </Text>
               </TextButton>
               <Switch
                    value={active}
                    onValueChange={handleOnValueChange}
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
     canOpenReminder: PropTypes.bool.isRequired,
};

export default Reminder;
