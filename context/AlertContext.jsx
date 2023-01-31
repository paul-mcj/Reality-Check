// react and misc
import { useState, useReducer, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// define context
const AlertContext = createContext();

// fixme: the "obj and setObj" needs to be a useReducer like for Modal. why? because the confirm function needs to be able to either simply cancel out of the alert, delete a journal entry, or for EditReminderItem it can bring up the datetimepicker thingy and update its object in memory... so it needs multiple different ways to set some state!

// init reducer context
const init = {
     reducerType: "",
     // fixme: "obj" and setObj are now "data"
     data: null,
     alert: false,
     title: "",
     message: "",
};

// local reducer function
const alertReducer = (state, action) => {
     switch (action.type) {
          case "CLOSE_ALERT": {
               return { ...state, alert: false };
          }
          case "DUPLICATE_REMINDER": {
               return {
                    alert: true,
                    reducerType: "DUPLICATE_REMINDER",
                    data: null,
                    title: action.payload.title,
                    message: action.payload.message,
               };
          }
          case "EDIT_REMINDER": {
               return {
                    alert: true,
                    reducerType: "EDIT_REMINDER",
                    title: action.payload.title,
                    message: action.payload.message,
                    // fixme: edit reminder data state here
               };
          }
          case "DELETE_ENTRY": {
               return {
                    alert: true,
                    reducerType: "DELETE_ENTRY",
                    title: action.payload.title,
                    message: action.payload.message,
                    //fixme: logic here
               };
          }
          default:
               return init;
     }
};

export const AlertProvider = ({ children }) => {
     // local reducer logic
     const [alertState, dispatch] = useReducer(alertReducer, init);

     // init state
     const [obj, setObj] = useState(null);
     const [alert, setAlert] = useState(false);
     const [title, setTitle] = useState("");
     const [message, setMessage] = useState("");

     // fixme: see if below is necessary or not once useReducer is online...
     const invokeAlert = () => {
          setAlert(() => true);
          setTimeout(() => {
               setAlert(() => false);
          }, 1);
     };

     return (
          <AlertContext.Provider
               value={{
                    ...alertState,
                    dispatch,
                    // fixme: all the below will eventually not exist...
                    invokeAlert,
                    alert,
                    setObj,
                    obj,
                    setAlert,
                    title,
                    setTitle,
                    message,
                    setMessage,
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
