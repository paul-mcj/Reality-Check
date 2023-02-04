// react native
import { Alert } from "react-native";

// react and misc
import { useContext, useEffect } from "react";

// context
import AlertContext from "../context/AlertContext";
import JournalContext from "../context/JournalContext";
import ReminderContext from "../context/ReminderContext";
import ModalContext from "../context/ModalContext";
import ToastContext from "../context/ToastContext";

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
     const { deleteReminder } = useContext(ReminderContext);
     const { invokeToast, setMessage: setToastMessage } =
          useContext(ToastContext);

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
                    text: "OK",
                    // depending on the alert reducerType, the confirm button in the Alert component will perform different actions via interacting with its respective context. The modal context also needs to be changed for any components that allow alerts inside of modals as well.
                    onPress: () => {
                         switch (reducerType) {
                              case "DELETE_REMINDER": {
                                   deleteReminder(data?.id);
                                   alertDispatch({ type: "CLOSE_ALERT" });
                                   modalDispatch({ type: "CLOSE_MODAL" });
                                   setToastMessage(() => "Reminder deleted");
                                   invokeToast();
                                   break;
                              }
                              case "DELETE_ENTRY": {
                                   deleteEntry(data?.id);
                                   alertDispatch({ type: "CLOSE_ALERT" });
                                   modalDispatch({ type: "CLOSE_MODAL" });
                                   setToastMessage(
                                        () => "Journal entry deleted"
                                   );
                                   invokeToast();
                                   break;
                              }
                              case "DUPLICATE_REMINDER":
                              default: {
                                   alertDispatch({ type: "CLOSE_ALERT" });
                                   break;
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
