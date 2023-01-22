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
          console.log(inputObj);
     };

     // fixme: fns to edit and delete an entry (as well as undo capabilities)

     return (
          <JournalContext.Provider value={{ entries, addEntry }}>
               {children}
          </JournalContext.Provider>
     );
};

JournalProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default JournalContext;
