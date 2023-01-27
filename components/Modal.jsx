// react and misc
import { useContext, useEffect } from "react";

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
import { View, Text, ScrollView } from "react-native";

const Modal = () => {
     // init context
     const { dispatch } = useContext(ModalContext);
     const { reminders, reminderIds } = useContext(ReminderContext);
     const { entries, entryIds } = useContext(JournalContext);

     // app theme deconstruction
     const { colors, container, smallTextWhite, border } = useTheme();

     useEffect(() => {
          reminders.forEach((item) => {
               if (item.id === reducerType) {
                    setFound(() => item);
                    // setSource(() => reminders);
               }
          });
          entries.forEach((item) => {
               if (item.id === reducerType) {
                    setFound(() => item);
                    // setSource(() => entries);
               }
          });
     }, [reminders, entries]);

     // fixme: (temporary) for JSX slimming
     const showEntry = (
          <ScrollView showsVerticalScrollIndicator={false}>
               <Text
                    style={{
                         ...smallTextWhite,
                         paddingBottom: 0,
                    }}
               >
                    {found?.timestamp.toDateString()}
               </Text>
               <View
                    style={{
                         ...border,
                         borderColor: colors.text,
                         marginBottom: 10,
                         minWidth: "100%",
                    }}
               >
                    <View style={{ minHeight: 100 }}>
                         <Text style={smallTextWhite}>{found?.input}</Text>
                    </View>
               </View>
               {/* const handleOnDelete = (content) => { */}
               {/* // fixme: add alert/warning before doing the following logic: // */}
               {/* deleteEntry(content); */}
               {/* setModalVisible(() => false); */}
               {/* }; */}
               <Text>delete button with alert here</Text>
          </ScrollView>
     );

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
                         onPress={() => dispatch({ type: "CLOSE_MODAL" })}
                         style={{ marginTop: 20 }}
                    />
               </View>
               <View
                    style={{
                         backgroundColor: colors.background,
                         minHeight: "100%",
                    }}
               >
                    <View
                         style={{
                              ...container,
                              marginTop: 20,
                              marginBottom: 80,
                         }}
                    >
                         {/* fixme: depending on usereducer type, show different modal content */}
                         {reducerType === "MORE" && <HomeInfoList />}
                         {/* {reducerType !== "MORE" && source === entries
                              ? source
                                     .filter((item) => item.id === found.id)
                                     .map((element) => (
                                          <Text>{element.active}</Text>
                                     ))
                              : console.log("nope")} */}
                         {reducerType !== "MORE" && showEntry}
                    </View>
               </View>
          </>
     );
};

export default Modal;
