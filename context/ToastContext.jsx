// react and misc
import { useState, createContext } from "react";
import PropTypes from "prop-types";

// define context
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
     // init state
     const [isToast, setIsToast] = useState(false);
     const [message, setMessage] = useState("");

     return (
          <ToastContext.Provider
               value={{ isToast, setIsToast, setMessage, message }}
          >
               {children}
          </ToastContext.Provider>
     );
};

ToastProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default ToastContext;
