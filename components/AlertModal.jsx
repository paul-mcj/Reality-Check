// react native
import { Alert } from "react-native";

// react and misc
import { useContext } from "react";

// context
import AlertContext from "../context/AlertContext";

const AlertModal = () => {
     // init context
     const { title, message, handleOnConfirm, handleOnCancel, setAlert } =
          useContext(AlertContext);

     return Alert.alert(
          title,
          message,
          [
               {
                    text: "Cancel",
                    // onPress: () => handleOnCancel,
               },
               {
                    text: "confirm",
                    // onPress: () => handleOnConfirm,
               },
          ],
          {
               cancelable: false,
          }
     );
};

export default AlertModal;
