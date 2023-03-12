// react and misc
import { useState, createContext } from "react";
import PropTypes from "prop-types";

// define context
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
     // init state
     const [isToast, setIsToast] = useState(false);
     const [message, setMessage] = useState("");

     // allows the toast to be shown and then dismissed
     const invokeToast = async () => {
          await setIsToast(() => true);
          await setIsToast(() => false);
     };

     return (
          <ToastContext.Provider
               value={{ isToast, setIsToast, invokeToast, setMessage, message }}
          >
               {children}
          </ToastContext.Provider>
     );
};

ToastProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default ToastContext;
