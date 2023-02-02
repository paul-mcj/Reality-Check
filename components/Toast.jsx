// react native
import { ToastAndroid } from "react-native";

// react and misc
import { useContext } from "react";

// context
import ToastContext from "../context/ToastContext";

const Toast = () => {
     // init context
     const { message } = useContext(ToastContext);

     return ToastAndroid.show(message, ToastAndroid.LONG);
};

export default Toast;
