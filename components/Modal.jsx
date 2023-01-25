// react and misc
import { useContext, useEffect, useState } from "react";

// context
import ModalContext from "../context/ModalContext";
import ReminderContext from "../context/ReminderContext";
import JournalContext from "../context/JournalContext";

// components
import HomeInfoList from "../components/HomeInfoList";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { ScrollView, View, Text } from "react-native";

const Modal = () => {
     const [found, setFound] = useState(null);

     // init context
     const { setModal, reducerType } = useContext(ModalContext);
     const { reminders, reminderIds } = useContext(ReminderContext);
     const { entries, entryIds } = useContext(JournalContext);

     // app theme deconstruction
     const { colors, container } = useTheme();

     useEffect(() => {
          reminders.forEach((item) => {
               if (item.id === reducerType) {
                    setFound(() => item);
               }
          });
          entries.forEach((item) => {
               if (item.id === reducerType) {
                    setFound(() => item);
               }
          });
     }, [reminders, entries]);

     return (
          <>
               {/* fixme: BackHandler to go to previous page state should be allowed! this needs to be passed as props! */}
               <View
                    style={{
                         justifyContent: "center",
                         alignItems: "center",
                         backgroundColor: colors.background,
                    }}
               >
                    <CloseIcon
                         name="close"
                         size={24}
                         color={colors.white}
                         onPress={() => setModal(() => false)}
                         style={{ marginBottom: 20, marginTop: 20 }}
                    />
               </View>
               <ScrollView
                    contentContainerStyle={{
                         backgroundColor: colors.background,
                         minHeight: "100%",
                    }}
               >
                    <View
                         style={{
                              ...container,
                         }}
                    >
                         {/* fixme: depending on reducer type, show different modal content */}
                         {reducerType === "MORE" && <HomeInfoList />}
                         {/* {reducerType !== "MORE" &&
                              found?.active &&
                              console.log(found) && <Text>{found.id}</Text>} */}
                         {reducerType !== "MORE" && <Text>{found?.input}</Text>}
                    </View>
               </ScrollView>
          </>
     );
};

export default Modal;
