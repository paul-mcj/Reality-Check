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
          dispatch: alertDispatch,
          reducerType,
          data,
          title,
          message,
     } = useContext(AlertContext);
     const { dispatch: modalDispatch } = useContext(ModalContext);
     const { deleteEntry } = useContext(JournalContext);
     const {
          reminders,
          addReminder,
          deleteReminder,
          editReminderTime,
          editReminderIsActive,
     } = useContext(ReminderContext);

     // always make sure to set Alert context to false after the component mounts to prepare state for next context change
     useEffect(() => {
          alertDispatch({ type: "CLOSE_ALERT" });
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
                    // depending on the alert reducerType, the confirm button in the Alert component will perform different actions via interacting with its respective context. The modal context also needs to be changed for any components that allow alerts inside of modals as well.
                    onPress: () => {
                         switch (reducerType) {
                              case "EDIT_REMINDER": {
                                   //fixme: do something for edit reminder here
                                   alertDispatch({ type: "CLOSE_ALERT" });
                                   modalDispatch({ type: "CLOSE_MODAL" });
                              }
                              case "DUPLICATE_REMINDER": {
                                   alertDispatch({ type: "CLOSE_ALERT" });
                              }
                              case "DELETE_ENTRY": {
                                   deleteEntry(data?.id);
                                   alertDispatch({ type: "CLOSE_ALERT" });
                                   modalDispatch({ type: "CLOSE_MODAL" });
                              }
                              default: {
                                   alertDispatch({ type: "CLOSE_ALERT" });
                              }
                         }
                    },
               },
          ],
          {
               cancelable: false,
          }
     );
};

export default AlertModal;
