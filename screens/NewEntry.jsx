// react native
import { TextInput, Text, ScrollView, View } from "react-native";

// react and misc
import { useContext, useEffect, useRef, useState } from "react";

// react navigation
import { useTheme, useScrollToTop } from "@react-navigation/native";

// components
import TextButton from "../components/TextButton";
import ShadowOverlay from "../components/ShadowOverlay";

// context
import JournalContext from "../context/JournalContext";
import ToastContext from "../context/ToastContext";

const NewEntry = () => {
     // component state
     const [undo, setUndo] = useState(false);
     const [prevInput, setPrevInput] = useState("");
     const [fontStyle, setFontStyle] = useState("italic");

     // init context
     const { addEntry, input, setInput } = useContext(JournalContext);
     const { setMessage: setToastMessage, invokeToast } =
          useContext(ToastContext);

     // app theme deconstruction
     const { colors, smallTextWhite, container, title, border } = useTheme();

     // hooks
     const ref = useRef(null);
     useScrollToTop(ref);

     // erase text input state and show undo button
     const handleErase = () => {
          setPrevInput(() => input);
          setInput(() => "");
          setUndo(() => true);
     };

     // reset input field to what it was before erasing, and hide the undo button
     const handleUndo = () => {
          setInput(() => prevInput);
          setUndo(() => false);
     };

     // add new entry to journal context and persist to storage
     const handleSave = () => {
          const timestamp = new Date();
          // add timestamp, unique id and input data to new entry object
          const entry = {
               input: input?.trim(),
               timestamp,
               id: timestamp.getTime(),
               revised: null,
          };
          // add object to context and storage
          addEntry(entry);
          // Toast success
          setToastMessage(() => "Journal entry added");
          invokeToast();
          // reset text input
          setInput(() => "");
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

     // update the text field to be italicized if there is no text in it (UI enhancement)
     useEffect(() => {
          input?.trim().length > 0
               ? setFontStyle(() => "")
               : setFontStyle(() => "italic");
     }, [input]);

     return (
          <>
               <ShadowOverlay />
               <ScrollView
                    contentContainerStyle={{ ...container, marginTop: 80 }}
                    ref={ref}
                    showsVerticalScrollIndicator={false}
               >
                    <Text style={title}>New Entry</Text>
                    <View
                         style={{
                              ...border,
                              backgroundColor: colors.notification,
                              marginTop: 20,
                         }}
                    >
                         <TextInput
                              style={{
                                   ...smallTextWhite,
                                   textAlign: "left",
                                   backgroundColor: colors.notification,
                                   fontStyle,
                              }}
                              placeholder="What did you dream of?"
                              placeholderTextColor={colors.text}
                              value={input}
                              onChangeText={(text) => setInput(() => text)}
                              multiline
                         />
                    </View>
                    {input?.trim().length !== 0 && showButtons}
                    {undo && input?.trim().length === 0 && (
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
          </>
     );
};

export default NewEntry;
