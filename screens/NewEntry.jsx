// react native
import {
     TextInput,
     Text,
     StyleSheet,
     ScrollView,
     View,
     ToastAndroid,
} from "react-native";

// react and misc
import { useEffect, useState, useCallback, useContext } from "react";

// react native progress
import ProgressBar from "react-native-progress/Bar";

// react navigation
import { useTheme } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";

// context
import JournalContext from "../context/JournalContext";

// hooks
import usePrevious from "../hooks/use-previous";

const NewEntry = () => {
     // init component state/hooks
     const [input, setInput] = useState("");
     const [undo, setUndo] = useState(false);
     const prevInput = usePrevious(input);
     const [progress, setProgress] = useState(1);

     // init context
     const addEntry = useContext(JournalContext);

     // app theme deconstruction
     const { colors } = useTheme();

     // erase text input state
     // fixme: put in use effect with return function to wipe previous subscription (otherwise timeout will continue until 5 secs is met regardless of if the undo is pressed multiple times in a row, which is not intended functionality)
     const handleErase = () => {
          setInput(() => "");
          setUndo(() => true);

          // setTimeout(() => {
          //      setInterval(() => {
          //           setProgress((prev) => prev - 0.2);
          //      }, 1000);
          //      setProgress(() => 1);
          // }, 6000);
          // setUndo(() => false);
     };

     // add new entry to journal context
     const handleSave = () => {
          const timestamp = new Date();
          // add new timestamp, unique id and input data to new entry object
          const entry = { input, id: timestamp.getTime(), timestamp };
          // add object to context
          console.log(addEntry);
          // reset text input
          setInput(() => "");
     };

     const handleUndo = () => {
          setInput(() => prevInput);
          setUndo(() => false);
          // fixme: cnacel timer?
     };

     // for JSX slimming
     const showButtons = (
          <View
               style={{
                    flexDirection: "row",
                    marginTop: 40,
                    marginBottom: 80,
               }}
          >
               <View style={{ paddingRight: 50 }}>
                    <TextButton
                         backgroundColor={colors.notification}
                         onPress={handleErase}
                    >
                         <Text
                              style={{
                                   ...styles.smallText,
                                   color: colors.white,
                              }}
                         >
                              Erase
                         </Text>
                    </TextButton>
               </View>
               <TextButton
                    backgroundColor={colors.notification}
                    onPress={handleSave}
               >
                    <Text
                         style={{
                              ...styles.smallText,
                              color: colors.white,
                         }}
                    >
                         Save
                    </Text>
               </TextButton>
          </View>
     );

     return (
          <ScrollView contentContainerStyle={styles.container}>
               <Text style={{ ...styles.title, color: colors.white }}>
                    New Entry
               </Text>
               <TextInput
                    style={{
                         ...styles.text,
                         color: colors.white,
                         borderColor: colors.white,
                         borderRadius: 10,
                         borderStyle: "solid",
                         borderWidth: 2,
                         padding: 10,
                    }}
                    placeholder="What did you dream of?"
                    placeholderTextColor={colors.text}
                    value={input}
                    onChangeText={(text) => setInput(() => text)}
                    multiline
               />
               {input.trim().length !== 0 && showButtons}
               {/* fixme: margin fixes; show time meter ticking down for 5 secs; replace last inputRef current back into the field!! */}
               {undo && (
                    <View style={{ flex: 1 }}>
                         <TextButton
                              backgroundColor={colors.notification}
                              onPress={handleUndo}
                         >
                              <Text
                                   style={{
                                        ...styles.smallText,
                                        color: colors.white,
                                   }}
                              >
                                   Undo
                              </Text>
                         </TextButton>
                         <ProgressBar
                              progress={progress}
                              animationType="timing"
                              width={null}
                              color={colors.white}
                         />
                    </View>
               )}
          </ScrollView>
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

export default NewEntry;
