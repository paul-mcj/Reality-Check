// react native
import { TextInput, Text, ScrollView, View } from "react-native";

// react and misc
import { useContext, useRef } from "react";

// react navigation
import { useTheme, useScrollToTop } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";

// context
import JournalContext from "../context/JournalContext";
import ToastContext from "../context/ToastContext";

const NewEntry = () => {
     // init context
     const { addEntry, input, setInput, prevInput, undo, setUndo } =
          useContext(JournalContext);
     const { setMessage: setToastMessage, invokeToast } =
          useContext(ToastContext);

     // app theme deconstruction
     const { colors, smallTextWhite, container, title, text, border } =
          useTheme();

     // hooks
     const ref = useRef(null);
     useScrollToTop(ref);

     // erase text input state
     const handleErase = () => {
          setInput(() => "");
          setUndo(() => true);
     };

     // add new entry to journal context and persist to storage
     const handleSave = () => {
          const timestamp = new Date();
          // add timestamp, unique id and input data to new entry object
          const entry = {
               input: input.trim(),
               id: timestamp.getTime(),
               timestamp,
          };
          console.log(entry);
          // add object to context and storage
          addEntry(entry);
          // Toast success
          setToastMessage(() => "Journal entry added");
          invokeToast();
          // reset text input
          setInput(() => "");
     };

     const handleUndo = () => {
          setInput(() => prevInput);
          setUndo(() => false);
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
                         minWidth={100}
                         onPress={handleErase}
                    >
                         <Text style={smallTextWhite}>Erase</Text>
                    </TextButton>
               </View>
               <TextButton
                    backgroundColor={colors.notification}
                    minWidth={100}
                    onPress={handleSave}
               >
                    <Text style={smallTextWhite}>Save</Text>
               </TextButton>
          </View>
     );

     return (
          <ScrollView
               contentContainerStyle={container}
               ref={ref}
               showsVerticalScrollIndicator={false}
          >
               <Text style={title}>New Entry</Text>
               <TextInput
                    style={{
                         ...text,
                         ...border,
                         textAlign: "left",
                    }}
                    placeholder="What did you dream of?"
                    placeholderTextColor={colors.text}
                    value={input}
                    onChangeText={(text) => setInput(() => text)}
                    multiline
               />
               {input.trim().length !== 0 && showButtons}
               {undo && input.trim().length === 0 && (
                    <View style={{ flex: 1, marginTop: 40 }}>
                         <TextButton
                              backgroundColor={colors.notification}
                              minWidth={100}
                              onPress={handleUndo}
                         >
                              <Text style={smallTextWhite}>Undo</Text>
                         </TextButton>
                    </View>
               )}
          </ScrollView>
     );
};

export default NewEntry;
