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
import { useState, useRef } from "react";

// react navigation
import { useTheme } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";

const NewEntry = () => {
     // init component state
     const [input, setInput] = useState("");
     const [undo, setUndo] = useState(false);
     const inputRef = useRef();

     // app theme deconstruction
     const { colors } = useTheme();

     // erase text input state
     const handleErase = () => {
          setInput(() => "");
          setUndo(() => true);
          setTimeout(() => {
               setUndo(() => false);
          }, 5000);
     };

     // add text input to journal
     // fixme: need to useContext
     // fixme: add timestamp
     const handleSave = () => {};

     const handleUndo = () => {};

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
                    ref={inputRef}
                    placeholder="What did you dream of?"
                    placeholderTextColor={colors.text}
                    value={input}
                    onChangeText={(text) => setInput(() => text)}
                    multiline
               />
               {input.trim().length !== 0 && showButtons}
               {/* fixme: margin fixes; show time meter ticking down for 5 secs; replace last inputRef current back into the field!! */}
               {undo && (
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
