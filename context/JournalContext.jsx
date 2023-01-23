// react and misc
import { useState, createContext } from "react";
import PropTypes from "prop-types";

// define context
const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
     // init state
     const [entries, setEntries] = useState([]);

     // function to add new entries to context
     const addEntry = (inputObj) => {
          setEntries((prev) => [...prev, inputObj]);
     };

     // function to delete an entry
     const deleteEntry = (inputObj) => {
          setEntries(() =>
               [...entries].filter((item) => item.id !== inputObj.id)
          );
     };

     // fixme: fn to edit an entry
     const editEntry = (inputObj) => {
          // console.log(inputObj);
     };

     return (
          <JournalContext.Provider
               value={{ entries, addEntry, editEntry, deleteEntry }}
          >
               {children}
          </JournalContext.Provider>
     );
};

JournalProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default JournalContext;
