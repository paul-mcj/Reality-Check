// react native
import { Text, ScrollView, View } from "react-native";

// react navigation
import { useTheme, useScrollToTop } from "@react-navigation/native";

// context
import JournalContext from "../context/JournalContext";

// components
import JournalEntry from "../components/JournalEntry";

// react and misc.
import { useEffect, useRef, useContext } from "react";

const Journal = () => {
     // init context
     const { entries } = useContext(JournalContext);

     // app theme deconstruction
     const { container, text, title, smallTextWhite } = useTheme();

     // hooks
     const ref = useRef(null);
     useScrollToTop(ref);

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
