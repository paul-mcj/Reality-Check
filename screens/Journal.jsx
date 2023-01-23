// react native
import {
     Text,
     FlatList,
     ScrollView,
     View,
     StyleSheet,
     TextInput,
     RefreshControl,
     Pressable,
} from "react-native";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// random values npm
import "react-native-get-random-values";

// context
import JournalContext from "../context/JournalContext";

// components
import JournalEntry from "../components/JournalEntry";
import TextButton from "../components/TextButton";

// react and misc.
import { useState, useCallback, useEffect, useContext } from "react";

// global variable for later assignment (for JSX slimming)
let showModal;

const Journal = () => {
     // init component state
     const [refreshing, setRefreshing] = useState(false);
     const [modalVisible, setModalVisible] = useState(false);
     const [editing, setEditing] = useState(false);
     const [input, setInput] = useState("");

     // init context
     const { entries, editEntry, deleteEntry } = useContext(JournalContext);

     // app theme deconstruction
     const { colors } = useTheme();

     const handleOnDelete = (content) => {
          // fixme: add alert/warning before doing the following logic:
          deleteEntry(content);
          setModalVisible(() => false);
     };

     const handleOnEdit = (content) => {
          // editEntry(content);
          // setModalVisible(() => false);
     };

     const handleCloseModal = () => {
          setModalVisible(() => false);
          setEditing(() => false);
     };

     const showEntry = (content) => {
          setModalVisible(() => true);

          showModal = (
               <View style={styles.container}>
                    {/* fixme: BackHandler to go to Home page should be allowed */}
                    <CloseIcon
                         name="close"
                         size={24}
                         color={colors.white}
                         onPress={() => handleCloseModal}
                         style={{ marginBottom: 40 }}
                    />
                    {/* fixme: editing state should be its own component?? */}
                    {editing && (
                         <>
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
                                   value={content.input}
                                   onChangeText={(text) => setInput(() => text)}
                              />
                              <Text>Cancel Button Here</Text>
                              <Text>Save Button Here</Text>
                         </>
                    )}
                    {!editing && (
                         <>
                              <Pressable
                                   style={{
                                        borderColor: colors.white,
                                        borderRadius: 10,
                                        borderStyle: "solid",
                                        borderWidth: 2,
                                        padding: 10,
                                   }}
                                   onPress={() => setEditing(() => true)}
                              >
                                   <Text
                                        style={{
                                             ...styles.smallText,
                                             color: colors.white,
                                             marginBottom: 10,
                                        }}
                                   >
                                        {content.timestamp.toDateString()}
                                   </Text>
                                   <Text
                                        style={{
                                             ...styles.text,
                                             color: colors.white,
                                        }}
                                   >
                                        {content.input}
                                   </Text>
                              </Pressable>
                              <TextButton
                                   backgroundColor={colors.notification}
                                   onPress={() => handleOnDelete(content)}
                              >
                                   <Text
                                        style={{
                                             ...styles.smallText,
                                             color: colors.white,
                                        }}
                                   >
                                        Delete
                                   </Text>
                              </TextButton>
                         </>
                    )}
               </View>
          );
     };

     // const onRefresh = useCallback(() => {
     //      setRefreshing(true);
     //      setTimeout(() => {
     //           setRefreshing(false);
     //           resetSwitch();
     //      }, 2000);
     // }, []);

     useEffect(() => {
          // fixme: when context is updated...
     }, [entries]);

     return (
          <>
               {modalVisible && showModal}
               {/* <ScrollView contentContainerStyle={styles.container}> */}
               {!modalVisible && (
                    <View style={styles.container}>
                         <Text
                              style={{
                                   ...styles.title,
                                   color: colors.white,
                              }}
                         >
                              Journal
                         </Text>
                         {entries.length === 0 && (
                              <>
                                   <Text
                                        style={{
                                             ...styles.text,
                                             color: colors.white,
                                             fontStyle: "italic",
                                        }}
                                   >
                                        “I love sleep. My life has the tendency
                                        to fall apart when I'm awake, you know?”
                                   </Text>
                                   <Text
                                        style={{
                                             ...styles.smallText,
                                             color: colors.white,
                                        }}
                                   >
                                        ― Ernest Hemingway
                                   </Text>
                              </>
                         )}
                         {/* fixme: sort by timestamp by default! */}
                         <FlatList
                              style={{ marginBottom: 80 }}
                              data={entries}
                              keyExtractor={(item) => item.id}
                              renderItem={({ item }) => (
                                   <JournalEntry
                                        input={item.input}
                                        timestamp={item.timestamp}
                                        openModal={() => showEntry(item)}
                                   />
                              )}
                         />
                    </View>
               )}
               {/* </ScrollView> */}
          </>
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

export default Journal;
