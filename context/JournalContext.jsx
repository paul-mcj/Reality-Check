// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// hooks
import usePrevious from "../hooks/use-previous";
import useInput from "../hooks/use-input";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// define context
const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
     // init state
     const [entries, setEntries] = useState([]);
     const [undo, setUndo] = useState(false);

     // hooks
     const { input, setInput } = useInput();
     const prevInput = usePrevious(input);

     // function to add a new entry object to journal context as well as to persist to device storage
     const addEntry = async (entryObj) => {
          try {
               setEntries((prev) => [...prev, entryObj]);
               const jsonEntry = JSON.stringify(entryObj);
               await AsyncStorage.setItem(String(entryObj.id), jsonEntry);
          } catch (err) {
               console.log(`error at addEntry in JournalContext: ${err}`);
          }
     };

     // function to delete an entry from journal context and to delete it from device storage as well
     const deleteEntry = async (entryId) => {
          try {
               setEntries(() =>
                    [...entries].filter((entry) => entry.id !== entryId)
               );
               await AsyncStorage.removeItem(String(entryId));
          } catch (err) {
               console.log(`error at deleteEntry in JournalContext: ${err}`);
          }
          // users cannot undo previous journal entry if they delete another entry (as the entries context will erase all previous data) -- instead of creating a HOC for one piece of state management in a very fringe scenario, simply setting this undo state is fine enough
          // fixme: this should still be fixed!
          setUndo(() => false);
     };

     // function will update the journal entry in the entries context array, as well as in storage
     const updateEntry = async (updatedEntryObj) => {
          try {
               const index = entries.findIndex(
                    (item) => item.id === updatedEntryObj.id
               );
               const tempArr = [...entries];
               tempArr[index] = updatedEntryObj;
               setEntries(() => tempArr);
               const jsonEntry = JSON.stringify(updatedEntryObj);
               await AsyncStorage.removeItem(String(updatedEntryObj.id));
               await AsyncStorage.setItem(
                    String(updatedEntryObj.id),
                    jsonEntry
               );
          } catch (err) {
               console.log(`error at updateEntry in JournalContext: ${err}`);
          }
     };

     // get all entries from device storage upon initial render and fill context with those objects
     useEffect(() => {
          const getEntries = async () => {
               try {
                    let tempArr = [];
                    const jsonEntries = await AsyncStorage.getAllKeys();
                    await Promise.all(
                         jsonEntries.map(async (entry) => {
                              const data = await AsyncStorage.getItem(entry);
                              let jsonData = JSON.parse(data);
                              const reformatData = {
                                   ...jsonData,
                                   timestamp: new Date(jsonData.timestamp),
                              };
                              tempArr.push(reformatData);
                         })
                    );
                    setEntries(() => tempArr);
               } catch (err) {
                    console.log(`error at useEffect in JournalContext: ${err}`);
               }
          };
          getEntries();
     }, []);

     return (
          <JournalContext.Provider
               value={{
                    input,
                    setInput,
                    undo,
                    setUndo,
                    prevInput,
                    entries,
                    addEntry,
                    deleteEntry,
                    updateEntry,
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
