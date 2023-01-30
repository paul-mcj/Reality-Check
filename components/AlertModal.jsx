// react native
import { Alert } from "react-native";

// react and misc
import { useContext, useEffect } from "react";

// context
import AlertContext from "../context/AlertContext";
import JournalContext from "../context/JournalContext";
import ReminderContext from "../context/ReminderContext";
import ModalContext from "../context/ModalContext";

const AlertModal = () => {
     // init context
     const {
          title,
          message,
          obj,
          setAlert,
          setHandleOnConfirm,
          handleOnConfirm,
          handleOnCancel,
     } = useContext(AlertContext);
     const { dispatch } = useContext(ModalContext);
     const { deleteEntry } = useContext(JournalContext);
     const {
          reminders,
          reminderIds,
          addReminder,
          deleteReminder,
          editReminderTime,
          editReminderIsActive,
     } = useContext(ReminderContext);

     useEffect(() => {
          setAlert(() => false);
     });

     return Alert.alert(
          title,
          message,
          [
               {
                    text: "Cancel",
               },
               {
                    text: "Confirm",
                    onPress:
                         obj === null
                              ? () => {}
                              : () => {
                                     deleteEntry(obj.id);
                                     dispatch({ type: "CLOSE_MODAL" });
                                },

                    // (
                    //      () => {
                    //      deleteEntry(obj.id);
                    //      dispatch({ type: "CLOSE_MODAL" });
                    // }) ?? obj,
               },
          ],
          {
               cancelable: false,
          }
     );
};

export default AlertModal;
