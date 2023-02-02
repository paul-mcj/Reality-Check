// react and misc
import { useReducer, createContext } from "react";
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
                    // make sure data is set to null, otherwise it will be referencing the last updated context which might cause unwanted bugs the next time Alert context is updated
                    data: null,
                    title: action.payload.title,
                    message: action.payload.message,
               };
          }
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
