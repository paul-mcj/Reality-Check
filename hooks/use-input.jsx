// react and misc
import { useState } from "react";

const useInput = () => {
     // init state
     const [input, setInput] = useState("");

     return { input, setInput };
};

export default useInput;
