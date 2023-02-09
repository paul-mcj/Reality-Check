// context
import AlertContext from "../context/AlertContext";
import JournalContext from "../context/JournalContext";

// components
import TextButton from "./TextButton";

// react and misc
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, Text, ScrollView, TextInput } from "react-native";

const EditJournalItem = ({ entry }) => {
     // component state
     const [entryIndex, setEntryIndex] = useState(-1);

     // init context
     const { dispatch: alertDispatch } = useContext(AlertContext);
     const { input, setInput, entries, updateEntry } =
          useContext(JournalContext);

     // app theme deconstruction
     const { colors, container, smallTextWhite, border, text } = useTheme();

     // function will delete entry from journal context
     const handleDelete = () => {
          // Alert user is about to delete the entry
          alertDispatch({
               type: "DELETE_ENTRY",
               payload: {
                    title: "Warning",
                    message: "Are you sure you want to delete this journal entry?",
                    data: entry,
               },
          });
     };

     // function will update the journal entry in entries context as well as in storage
     const handleUpdate = () => {
          const updatedEntry = { ...entry, input };
          updateEntry(updatedEntry);
     };

     // everytime the entry prop changes, find its position in the entries array in order to perform editing functionality of the object (used within this component)
     useEffect(() => {
          setInput(() => entry?.input);
          const foundEntryIndex = entries.findIndex(
               (item) => item.id === entry.id
          );
          setEntryIndex(() => foundEntryIndex);
     }, [entry]);

     return (
          <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ marginTop: 60 }}
          >
               <Text
                    style={{
                         ...text,
                    }}
               >
                    {entry?.timestamp.toDateString()}
               </Text>
               <View
                    style={{
                         ...border,
                    }}
               >
                    <View>
                         <TextInput
                              style={{
                                   ...smallTextWhite,
                                   textAlign: "left",
                              }}
                              multiline
                              onChangeText={(text) => setInput(() => text)}
                         >
                              {input}
                         </TextInput>
                    </View>
               </View>
               <View
                    style={{
                         ...container,
                         flexDirection: "row",
                         marginTop: 40,
                         marginBottom: 80,
                    }}
               >
                    <View
                         style={
                              entries[entryIndex]?.input !== input
                                   ? { paddingRight: 50 }
                                   : { paddingRight: 0 }
                         }
                    >
                         <TextButton
                              backgroundColor={colors.notification}
                              minWidth={100}
                              onPress={handleDelete}
                         >
                              <Text style={smallTextWhite}>Delete</Text>
                         </TextButton>
                    </View>
                    {entries[entryIndex]?.input !== input && (
                         <TextButton
                              backgroundColor={colors.notification}
                              minWidth={100}
                              onPress={handleUpdate}
                         >
                              <Text style={smallTextWhite}>Update</Text>
                         </TextButton>
                    )}
               </View>
               {/* fixme: last revised date here!!!! */}
          </ScrollView>
     );
};

EditJournalItem.propTypes = {
     entry: PropTypes.object.isRequired,
};

export default EditJournalItem;
