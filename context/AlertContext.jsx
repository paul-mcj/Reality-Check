// react and misc
import { useReducer, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// define context
const AlertContext = createContext();

// init reducer context
const init = {
     reducerType: "",
     data: null,
     alert: false,
     title: "",
     message: "",
};

// local reducer function
const alertReducer = (state, action) => {
     switch (action.type) {
          // fixme: instead of spreading state, just resolve to init as it resets everything anyway?
          case "CLOSE_ALERT": {
               return { ...state, alert: false };
          }
          case "OPEN_ALERT": {
               return { ...state, alert: true };
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
          // case "EDIT_REMINDER": {
          //      return {
          //           alert: true,
          //           reducerType: "EDIT_REMINDER",
          //           title: action.payload.title,
          //           message: action.payload.message,
          //           data: action.payload.data,
          //      };
          // }
          case "DELETE_REMINDER": {
               return {
                    alert: true,
                    reducerType: "DELETE_REMINDER",
                    title: action.payload.title,
                    message: action.payload.message,
                    data: action.payload.data,
               };
          }
          case "DELETE_ENTRY": {
               return {
                    alert: true,
                    reducerType: "DELETE_ENTRY",
                    title: action.payload.title,
                    message: action.payload.message,
                    data: action.payload.data,
               };
          }
          default:
               return init;
     }
};

export const AlertProvider = ({ children }) => {
     // local reducer logic
     const [alertState, dispatch] = useReducer(alertReducer, init);

     return (
          <AlertContext.Provider
               value={{
                    ...alertState,
                    dispatch,
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
