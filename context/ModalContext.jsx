// react and misc
import { useReducer, createContext } from "react";
import PropTypes from "prop-types";

// define context
const ModalContext = createContext();

// initial reducer context
const init = {
     reducerType: "MORE",
     id: null,
     data: null,
     modal: false,
};

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
                    id: action.payload.id,
                    data: action.payload.data,
               };
          }
          case "REMINDER": {
               return {
                    modal: true,
                    reducerType: "REMINDER",
                    data: action.payload.data,
                    id: action.payload.id,
               };
          }
          case "MORE": {
               return {
                    ...state,
                    modal: true,
                    reducerType: "MORE",
               };
          }
          default:
               return init;
     }
};

export const ModalProvider = ({ children }) => {
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
