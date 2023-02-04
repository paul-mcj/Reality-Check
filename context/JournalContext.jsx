// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// hooks
import usePrevious from "../hooks/use-previous";

// define context
const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
     // init state
     const [entries, setEntries] = useState([]);
     const [input, setInput] = useState("");
     const prevInput = usePrevious(input);

     // function to add a new entry object to journal context
     const addEntry = (entryObj) => {
          setEntries((prev) => [...prev, entryObj]);
     };

     // function to delete an entry from journal context
     const deleteEntry = (entryId) => {
          setEntries(() =>
               [...entries].filter((entry) => entry.id !== entryId)
          );
     };

     return (
          <JournalContext.Provider
               value={{
                    input,
                    setInput,
                    prevInput,
                    entries,
                    addEntry,
                    deleteEntry,
               }}
          >
               {children}
          </JournalContext.Provider>
     );
};

JournalProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default JournalContext;
