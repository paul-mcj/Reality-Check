// react and misc
import { useState, createContext } from "react";
import PropTypes from "prop-types";

// define context
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
     // init state
     const [alert, setAlert] = useState(false);
     const [title, setTitle] = useState("");
     const [message, setMessage] = useState("");
     const [handleOnConfirm, setHandleOnConfirm] = useState();
     const [handleOnCancel, setHandleOnCancel] = useState();

     return (
          <AlertContext.Provider
               value={{
                    alert,
                    setAlert,
                    title,
                    setTitle,
                    message,
                    setMessage,
                    handleOnCancel,
                    handleOnConfirm,
                    setHandleOnCancel,
                    setHandleOnConfirm,
               }}
          >
               {children}
          </AlertContext.Provider>
     );
};

AlertProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default AlertContext;
