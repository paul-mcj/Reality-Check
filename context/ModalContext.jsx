// react and misc
import { useReducer, createContext } from "react";
import PropTypes from "prop-types";

// define context
const ModalContext = createContext();

// local reducer function
const modalReducer = (state, action) => {
     switch (action.type) {
          case "CLOSE_MODAL": {
               return { ...state, modal: false };
          }
          case "JOURNAL": {
               return {
                    modal: true,
                    reducerType: "JOURNAL",
                    data: action.payload,
               };
          }
          case "REMINDER": {
               return {
                    modal: true,
                    reducerType: "REMINDER",
                    data: action.payload,
               };
          }
          case "MORE":
          default:
               return initState;
     }
};

export const ModalProvider = ({ children }) => {
     // initial reducer context
     const init = {
          reducerType: "MORE",
          data: null,
          modal: true,
     };

     // local reducer logic
     const [modalState, dispatch] = useReducer(modalReducer, init);

     return (
          <ModalContext.Provider value={{ ...modalState, dispatch }}>
               {children}
          </ModalContext.Provider>
     );
};

ModalProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default ModalContext;
