// react native
import { ToastAndroid } from "react-native";

// react and misc
import { useContext, useEffect } from "react";

// context
import ToastContext from "../context/ToastContext";

const Toast = () => {
     // init context
     const { setIsToast, message } = useContext(ToastContext);

     // fixme: whenever this components is shown, useEffect with timeOut/subscription so that multiple toasts can overplace one another in app, also set the toast to false after subscription so that it will always be ready for next toast that occurs

     // useEffect(() => {
     //   first
     // setIsToast(() => false)
     //   return () => {
     //     second
     //   }
     // }, [third])

     return ToastAndroid.show(message, ToastAndroid.LONG);
};

export default Toast;
