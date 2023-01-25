// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// define context
const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
     // init state
     const [entries, setEntries] = useState([]);
     const [entryIds, setEntryIds] = useState([]);

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

     // any time entries is changed, an array of all entry id props (used in Modal component for dynamic output) is updated
     useEffect(() => {
          const ids = [];
          entries.forEach((item) => ids.push(item.id));
          setEntryIds(() => ids);
     }, [entries]);

     return (
          <JournalContext.Provider
               value={{ entries, entryIds, addEntry, deleteEntry }}
          >
               {children}
          </JournalContext.Provider>
     );
};

JournalProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default JournalContext;
