// react and misc
import { useContext } from "react";

// context
import ModalContext from "../context/ModalContext";

// components
import HomeInfoList from "./HomeInfoList";
import EditJournalItem from "./EditJournalItem";
import EditReminderItem from "./EditReminderItem";
import TextButton from "./TextButton";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, ScrollView } from "react-native";

const Modal = () => {
     // init context
     const {
          reducerType,
          data,
          dispatch: modalDispatch,
          id,
     } = useContext(ModalContext);

     // app theme deconstruction
     const { colors, container } = useTheme();

     return (
          <View
               style={{
                    backgroundColor: colors.background,
                    minHeight: "100%",
               }}
          >
               {/* fixme: BackHandler to go to previous page state should be allowed! this needs to be passed as props! */}
               <View
                    style={{
                         right: 20,
                         top: 20,
                         position: "absolute",
                         zIndex: 3,
                    }}
               >
                    <TextButton
                         style={{ padding: 20 }}
                         minWidth={0}
                         borderWidth={0}
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
