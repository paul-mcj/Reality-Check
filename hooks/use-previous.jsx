// react and misc
import { useRef, useEffect } from "react";

const usePrevious = (input) => {
     const inputRef = useRef();

     useEffect(() => {
          inputRef.current = input;
     }, [input]);

     return inputRef.current;
};

export default usePrevious;
