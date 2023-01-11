// react native
import { TextInput, Text, StyleSheet, ScrollView, Button } from "react-native";

// react and misc
import { useState } from "react";

// react navigation
import { useTheme } from "@react-navigation/native";

const NewEntry = () => {
     // init component state
     const [input, setInput] = useState("");

     // app theme deconstruction
     const { colors } = useTheme();

     // erase text input state
     const handleErase = () => {
          setInput(() => "");
     };

     // add text input to journal
     // fixme: need to useContext
     // fixme: add timestamp
     const handleSave = () => {};

     return (
          <ScrollView contentContainerStyle={styles.container}>
               <Text style={{ ...styles.title, color: colors.white }}>
                    New Entry
               </Text>
               <TextInput
                    style={{ ...styles.text, color: colors.white }}
                    placeholder="What did you dream of?"
                    placeholderTextColor={colors.text}
                    value={input}
                    onChangeText={(text) => setInput(() => text)}
                    multiline
               />
               <Button
                    onPress={handleErase}
                    title="Erase"
                    color={colors.text}
               />
               <Button
                    onPress={handleSave}
                    title="Save"
                    color={colors.accent}
               />
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
});

export default NewEntry;
