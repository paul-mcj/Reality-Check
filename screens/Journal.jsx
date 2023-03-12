// react native
import { Text, ScrollView, View } from "react-native";

// react navigation
import { useTheme, useScrollToTop } from "@react-navigation/native";

// context
import JournalContext from "../context/JournalContext";
import ToastContext from "../context/ToastContext";

// components
import JournalEntry from "../components/JournalEntry";
import TextButton from "../components/TextButton";
import ShadowOverlay from "../components/ShadowOverlay";

// icons
import SortAsc from "react-native-vector-icons/MaterialCommunityIcons";
import SortDesc from "react-native-vector-icons/MaterialCommunityIcons";

// react and misc.
import { useRef, useContext, useState } from "react";

const Journal = () => {
     // local state
     const [sortedByNewest, setSortedByNewest] = useState(true);

     // init context
     const { entries, setEntries } = useContext(JournalContext);
     const { invokeToast, setMessage: setToastMessage } =
          useContext(ToastContext);

     // app theme deconstruction
     const { colors, container, text, title, smallTextWhite } = useTheme();

     // hooks
     const ref = useRef(null);
     useScrollToTop(ref);

     // function will sort entries array by desc or asc deeding on sortedByNewest local state
     const sortEntries = () => {
          let copyEntriesArr = [...entries];
          copyEntriesArr.sort((entry1, entry2) => {
               return sortedByNewest
                    ? entry2.timestamp - entry1.timestamp
                    : entry1.timestamp - entry2.timestamp;
          });
          setEntries(() => copyEntriesArr);
          setSortedByNewest((prev) => !prev);
          setToastMessage(
               () =>
                    `Journal sorted by ${
                         !sortedByNewest ? "oldest" : "newest"
                    } entry first`
          );
          invokeToast();
     };

     return (
          <>
               <View
                    style={{
                         left: 12,
                         top: 40,
                         position: "absolute",
                         zIndex: 2,
                    }}
               >
                    <TextButton
                         style={{ padding: 20 }}
                         minWidth={0}
                         backgroundColor={colors.notification}
                         onPress={sortEntries}
                    >
                         {sortedByNewest ? (
                              <SortDesc
                                   style={{ padding: 10 }}
                                   name="sort-calendar-descending"
                                   size={24}
                                   color={colors.white}
                              />
                         ) : (
                              <SortAsc
                                   style={{ padding: 10 }}
                                   name="sort-calendar-ascending"
                                   size={24}
                                   color={colors.white}
                              />
                         )}
                    </TextButton>
               </View>
               <ShadowOverlay />
               <ScrollView
                    contentContainerStyle={{ ...container, marginTop: 80 }}
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
                                   “I love sleep. My life has the tendency to
                                   fall apart when I'm awake, you know?”
                              </Text>
                              <Text style={{ ...smallTextWhite, padding: 0 }}>
                                   ― Ernest Hemingway
                              </Text>
                         </>
                    )}
                    <View style={{ marginBottom: 40 }}>
                         {entries.length !== 0 &&
                              entries
                                   // reverse method makes newest entries visible and older ones go to the bottom
                                   .reverse()
                                   .map((item) => (
                                        <JournalEntry
                                             id={item.id}
                                             key={item.id}
                                             input={item.input}
                                             timestamp={item.timestamp}
                                        />
                                   ))}
                    </View>
               </ScrollView>
          </>
     );
};

export default Journal;
