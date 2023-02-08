// react and misc
import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// hooks
import usePrevious from "../hooks/use-previous";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// define context
const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
     // init state
     const [entries, setEntries] = useState([]);
     const [input, setInput] = useState("");
     const [undo, setUndo] = useState(false);

     // hooks
     const prevInput = usePrevious(input);

     // function to add a new entry object to journal context
     const addEntry = async (entryObj) => {
          try {
               setEntries((prev) => [...prev, entryObj]);
               const jsonEntry = JSON.stringify(entryObj);
               await AsyncStorage.setItem(String(entryObj.id), jsonEntry);
               console.log(AsyncStorage);
          } catch (err) {
               console.log(`error at addEntry in JournalContext: ${err}`);
          }
     };

     // function to delete an entry from journal context
     const deleteEntry = (entryId) => {
          setEntries(() =>
               [...entries].filter((entry) => entry.id !== entryId)
          );
          // users cannot undo previous journal entry if they delete another entry (as the entries context will erase all previous data) -- instead of creating a HOC for one piece of state management in a very fringe scenario, simply setting this undo state is fine enough
          setUndo(() => false);
     };

     // get all entries upon initial rendering
     useEffect(() => {
          // fixme: array of just storage key values for multiKey get below ??
          const getEntries = async () => {
               try {
                    let tempArr = [];
                    const jsonEntries = await AsyncStorage.getAllKeys();
                    await Promise.all(
                         jsonEntries.map(async (entry) => {
                              const data = await AsyncStorage.getItem(entry);
                              let jsonData = JSON.parse(data);
                              // const timestamp = Date.parse(jsonData.timestamp);
                              const reformatData = {
                                   ...jsonData,
                                   timestamp: jsonData.id,
                              };
                              tempArr.push(reformatData);
                         })
                    );
                    console.log(tempArr);
                    setEntries(() => tempArr);
                    // for (const entry of jsonEntries) {
                    //      const data = await AsyncStorage.getItem(entry);
                    //      console.log(JSON.parse(data));
                    //      await setEntries((prev) => [...prev, data]);
                    // }
                    console.log(entries);
               } catch (err) {
                    console.log(err);
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
