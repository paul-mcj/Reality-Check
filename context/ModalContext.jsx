// react and misc
import { useState, createContext } from "react";
import PropTypes from "prop-types";

// define context
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
     // init state
     const [modal, setModal] = useState(false);
     const [reducerType, setReducerType] = useState("");

     return (
          <ModalContext.Provider
               value={{ modal, setModal, reducerType, setReducerType }}
          >
               {children}
          </ModalContext.Provider>
     );
};

ModalProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default ModalContext;
