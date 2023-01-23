// react and misc
import PropTypes from "prop-types";

// context
import JournalContext from "../context/JournalContext";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { Pressable, Text } from "react-native";

const JournalEntry = ({ input, openModal }) => {
     // app theme deconstruction
     const { border, smallTextWhite } = useTheme();

     return (
          <Pressable
               style={{
                    ...border,
                    marginBottom: 10,
               }}
               onPress={openModal}
          >
               <Text style={smallTextWhite}>{input}</Text>
          </Pressable>
     );
};

JournalEntry.propTypes = {
     input: PropTypes.string.isRequired,
     openModal: PropTypes.func.isRequired,
};

export default JournalEntry;
