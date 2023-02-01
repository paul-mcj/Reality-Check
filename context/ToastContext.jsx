// react and misc
import { useState, createContext } from "react";
import PropTypes from "prop-types";

// define context
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
     // init state
     const [isToast, setIsToast] = useState(false);
     const [message, setMessage] = useState("");

     // encapsulate setIsToast state (setting it from true to false after a setTimeout function internally helps navigate unnecessary re-renders in components that use the Toast component )
     const invokeToast = () => {
          setIsToast(() => true);
          setTimeout(() => {
               setIsToast(() => false);
          }, 1);
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
