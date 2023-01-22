// react and misc
import { createContext } from "react";

const addEntry = (input) => console.log(input);

const JournalContext = createContext({ addEntry });

export const JournalProvider = JournalContext.Provider;

export default JournalContext;
