// react and misc
import { useContext, useEffect } from "react";

// context
import ModalContext from "../context/ModalContext";

// components
import HomeInfoList from "./HomeInfoList";
import EditJournalItem from "./EditJournalItem";
import EditReminderItem from "./EditReminderItem";
import TextButton from "./TextButton";
import ShadowOverlay from "./ShadowOverlay";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, ScrollView, BackHandler } from "react-native";

const Modal = () => {
     // init context
     const {
          reducerType,
          data,
          dispatch: modalDispatch,
          id,
     } = useContext(ModalContext);

     // app theme deconstruction
     const { colors } = useTheme();

     useEffect(() => {
          BackHandler.addEventListener("hardwareBackPress", () => {
               modalDispatch({ type: "CLOSE_MODAL" });
               return true;
          });
          return () => {
               BackHandler.removeEventListener("hardwareBackPress", () => {
                    return true;
               });
          };
     });

     return (
          <View
               style={{
                    backgroundColor: colors.background,
                    minHeight: "100%",
               }}
          >
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
                         onPress={() => modalDispatch({ type: "CLOSE_MODAL" })}
                    >
                         <CloseIcon
                              style={{ padding: 10 }}
                              name="close"
                              size={24}
                              color={colors.white}
                         />
                    </TextButton>
               </View>
               <ShadowOverlay />
               <ScrollView
                    style={{
                         marginLeft: 40,
                         marginRight: 40,
                    }}
                    showsVerticalScrollIndicator={false}
               >
                    {/* depending on reducerType show different modal content */}
                    {reducerType === "MORE" && <HomeInfoList />}
                    {reducerType === "REMINDER" &&
                         data
                              .filter((reminder) => reminder.id === id)
                              .map((item) => (
                                   <EditReminderItem
                                        reminder={item}
                                        key={item.id}
                                   />
                              ))}
                    {reducerType === "JOURNAL" &&
                         data
                              .filter((entry) => entry.id === id)
                              .map((item) => (
                                   <EditJournalItem
                                        entry={item}
                                        key={item.id}
                                   />
                              ))}
               </ScrollView>
          </View>
     );
};

export default Modal;
