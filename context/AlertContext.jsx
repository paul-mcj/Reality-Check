// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// define context
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
     // init state
     const [obj, setObj] = useState(null);
     const [alert, setAlert] = useState(false);
     const [title, setTitle] = useState("");
     const [message, setMessage] = useState("");
     const [handleOnConfirm, setHandleOnConfirm] = useState();
     const [handleOnCancel, setHandleOnCancel] = useState();

     const invokeAlert = () => {
          setAlert(() => true);
          setTimeout(() => {
               setAlert(() => false);
          }, 1);
     };

     // fixme: the "obj and setObj" needs to be a useReducer like for Modal. why? because the confirm function needs to be able to either simply cancel out of the alert, delete a journal entry, or for EditReminderItem it can bring up the datetimepicker thingy and update its object in memory... so it needs multiple different ways to set some state!

     useEffect(() => {}, [obj]);

     return (
          <AlertContext.Provider
               value={{
                    invokeAlert,
                    alert,
                    setObj,
                    obj,
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
