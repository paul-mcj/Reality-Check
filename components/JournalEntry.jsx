// react and misc
import { useContext } from "react";
import PropTypes from "prop-types";

// context
import JournalContext from "../context/JournalContext";
import ModalContext from "../context/ModalContext";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { Pressable, Text, View } from "react-native";

const JournalEntry = ({ id, input, timestamp }) => {
     // app theme deconstruction
     const { border, smallTextWhite, colors } = useTheme();

     // init context
     const { dispatch: modalDispatch } = useContext(ModalContext);
     const { entries } = useContext(JournalContext);

     // open modal and display options related to specific journal entry
     const openEntry = () => {
          modalDispatch({ type: "JOURNAL", payload: { id, data: entries } });
     };

     return (
          <>
               <Text
                    style={{
                         ...smallTextWhite,
                         textAlign: "left",
                         paddingBottom: 0,
                         paddingLeft: 0,
                    }}
               >
                    {timestamp.toDateString()}
               </Text>
               <Pressable
                    onPress={openEntry}
                    style={{
                         ...border,
                         marginBottom: 10,
                         minWidth: "100%",
                         backgroundColor: colors.notification,
                    }}
               >
                    <View>
                         <Text
                              style={{
                                   ...smallTextWhite,
                                   textAlign: "left",
                                   backgroundColor: colors.notification,
                              }}
                         >
                              {input}
                         </Text>
                    </View>
               </Pressable>
          </>
     );
};

JournalEntry.propTypes = {
     id: PropTypes.number.isRequired,
     input: PropTypes.string.isRequired,
     timestamp: PropTypes.object.isRequired,
};

export default JournalEntry;
