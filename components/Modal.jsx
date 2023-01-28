// react and misc
import { useContext, useEffect } from "react";

// context
import ModalContext from "../context/ModalContext";

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
     const { reducerType, data, dispatch, id } = useContext(ModalContext);

     // app theme deconstruction
     const { colors, container, smallTextWhite, border } = useTheme();

     // useEffect(() => {
     // }, [reminders, entries]);

     // fixme: (temporary) for JSX slimming
     // const showEntry = (
     //      <ScrollView showsVerticalScrollIndicator={false}>
     //           <Text
     //                style={{
     //                     ...smallTextWhite,
     //                     paddingBottom: 0,
     //                }}
     //           >
     //                {data?.timestamp.toDateString()}
     //           </Text>
     //           <View
     //                style={{
     //                     ...border,
     //                     borderColor: colors.text,
     //                     marginBottom: 10,
     //                     minWidth: "100%",
     //                }}
     //           >
     //                <View style={{ minHeight: 100 }}>
     //                     <Text style={smallTextWhite}>{data?.input}</Text>
     //                </View>
     //           </View>
     //           {/* const handleOnDelete = (content) => { */}
     //           {/* // fixme: add alert/warning before doing the following logic: // */}
     //           {/* deleteEntry(content); */}
     //           {/* setModalVisible(() => false); */}
     //           {/* }; */}
     //           <Text>delete button with alert here</Text>
     //      </ScrollView>
     // );

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
                         {/* depending on reducerType show different modal content */}
                         {reducerType === "MORE" && <HomeInfoList />}
                         {reducerType === "REMINDER" &&
                              data
                                   .filter((reminder) => reminder.id === id)
                                   .map((item) => (
                                        <Text>{item.active.toString()}</Text>
                                   ))}
                         {reducerType === "JOURNAL" &&
                              data
                                   .filter((entry) => entry.id === id)
                                   .map((item) => <Text>{item.input}</Text>)}
                    </View>
               </View>
          </>
     );
};

export default Modal;
