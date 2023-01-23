// react and misc
import PropTypes from "prop-types";

// context
import JournalContext from "../context/JournalContext";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { StyleSheet, Pressable, Text } from "react-native";

const JournalEntry = ({ input, openModal }) => {
     // app theme deconstruction
     const { colors } = useTheme();

     return (
          <Pressable
               style={{
                    borderColor: colors.white,
                    borderRadius: 10,
                    borderStyle: "solid",
                    borderWidth: 2,
                    padding: 10,
                    marginBottom: 10,
               }}
               onPress={openModal}
          >
               <Text style={{ ...styles.smallText, color: colors.white }}>
                    {input}
               </Text>
          </Pressable>
     );
};

const styles = StyleSheet.create({
     container: {
          alignItems: "center",
          justifyContent: "center",
          margin: 40,
     },
     title: {
          fontSize: 36,
          marginBottom: 40,
     },
     text: {
          fontSize: 24,
     },
     smallText: {
          fontSize: 16,
          padding: 10,
     },
});

JournalEntry.propTypes = {
     input: PropTypes.string.isRequired,
     openModal: PropTypes.func.isRequired,
};

export default JournalEntry;
