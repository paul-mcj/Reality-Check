// react native
import {
     Text,
     ScrollView,
     View,
     TextInput,
     RefreshControl,
     Pressable,
} from "react-native";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme, useScrollToTop } from "@react-navigation/native";

// context
import JournalContext from "../context/JournalContext";
import ModalContext from "../context/ModalContext";
import ToastContext from "../context/ToastContext";

// components
import JournalEntry from "../components/JournalEntry";
import TextButton from "../components/TextButton";

// react and misc.
import { useState, useCallback, useEffect, useRef, useContext } from "react";

// global variable for later assignment (for JSX slimming)
let showModal;

const Journal = () => {
     // init component state
     const [refreshing, setRefreshing] = useState(false);
     const [modalVisible, setModalVisible] = useState(false);
     const [input, setInput] = useState("");

     // init context
     const { entries, deleteEntry } = useContext(JournalContext);
     //fixme: when entry is deleted, update toast context
     const { isToast, invokeToast } = useContext(ToastContext);
     //fixme: use modal to display currently selected entry
     const { dispatch } = useContext(ModalContext);

     // app theme deconstruction
     const { colors, container, text, title, border, smallTextWhite } =
          useTheme();

     // hooks
     const ref = useRef(null);
     useScrollToTop(ref);

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
          <ScrollView
               contentContainerStyle={container}
               ref={ref}
               showsVerticalScrollIndicator={false}
          >
               <Text style={title}>Journal</Text>
               {entries.length === 0 && (
                    <>
                         <Text
                              style={{
                                   ...text,
                                   fontStyle: "italic",
                              }}
                         >
                              “I love sleep. My life has the tendency to fall
                              apart when I'm awake, you know?”
                         </Text>
                         <Text style={smallTextWhite}>― Ernest Hemingway</Text>
                    </>
               )}
               <View style={{ marginBottom: 40 }}>
                    {/* fixme: sort by timestamp by default! */}
                    {entries.length !== 0 &&
                         entries.map((item) => (
                              <JournalEntry
                                   id={item.id}
                                   key={item.id}
                                   input={item.input}
                                   timestamp={item.timestamp}
                              />
                         ))}
               </View>
          </ScrollView>
     );
};

export default Journal;
