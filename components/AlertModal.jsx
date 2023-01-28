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
                    // fixme: by default have it dismiss modal
                    // onPress: () => handleOnCancel,
               },
               {
                    text: "Confirm",
                    // fixme: sometimes this needs to be set the dismiss modal, other times it needs to do something (ex. delete entry from context) -- if the latter is invoked then reset it to default dismiss functionality!
                    onPress: handleOnConfirm,
               },
          ],
          {
               cancelable: false,
          }
     );
};

export default AlertModal;
