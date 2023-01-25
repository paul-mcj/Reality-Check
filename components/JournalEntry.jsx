// react and misc
import { useContext } from "react";
import PropTypes from "prop-types";

// context
import JournalContext from "../context/JournalContext";
import ModalContext from "../context/ModalContext";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { Pressable, Text } from "react-native";

const JournalEntry = ({ id, input }) => {
     // app theme deconstruction
     const { border, smallTextWhite } = useTheme();

     // init context
     const { setModal, setReducerType } = useContext(ModalContext);

     // open modal and display options related to specific journal entry
     const openEntry = () => {
          setReducerType(() => id);
          setModal(() => true);
     };

     return (
          <Pressable
               style={{
                    ...border,
                    marginBottom: 10,
               }}
               onPress={openEntry}
          >
               <Text style={smallTextWhite}>{input}</Text>
          </Pressable>
     );
};

JournalEntry.propTypes = {
     id: PropTypes.number.isRequired,
     input: PropTypes.string.isRequired,
};

export default JournalEntry;
