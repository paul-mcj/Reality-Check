// react native
import {
     Text,
     FlatList,
     Button,
     ScrollView,
     StyleSheet,
     RefreshControl,
} from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

// random values npm
import "react-native-get-random-values";

// context
import JournalContext from "../context/JournalContext";

// react and misc.
import { useState, useCallback, useEffect, useContext } from "react";

const Journal = () => {
     // init component state
     const [refreshing, setRefreshing] = useState(false);

     // init context
     const content = useContext(JournalContext);

     // app theme deconstruction
     const { colors } = useTheme();

     // const onRefresh = useCallback(() => {
     //      setRefreshing(true);
     //      setTimeout(() => {
     //           setRefreshing(false);
     //           resetSwitch();
     //      }, 2000);
     // }, []);

     useEffect(() => {
          console.log(content);
     }, []);

     return (
          <ScrollView contentContainerStyle={styles.container}>
               <Text style={{ ...styles.title, color: colors.white }}>
                    Journal
               </Text>
               <Text style={{ ...styles.text, color: colors.white }}>
                    “I love sleep. My life has the tendency to fall apart when
                    I'm awake, you know?” ― Ernest Hemingway
               </Text>
               {/* fixme: loop through entries and sort by timestamp in a FlatList! */}
               {/* fixme: edit or delete any entry*/}
               {/* fixme: useContext to grab from NewEntry page */}
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

export default Journal;
