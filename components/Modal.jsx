// react and misc
import { useContext } from "react";

// context
import ModalContext from "../context/ModalContext";

// components
import HomeInfoList from "../components/HomeInfoList";
import EditJournalItem from "./EditJournalItem";
import EditReminderItem from "./EditReminderItem";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View } from "react-native";

const Modal = () => {
     // init context
     const { reducerType, data, dispatch, id } = useContext(ModalContext);

     // app theme deconstruction
     const { colors, container } = useTheme();

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
                    </View>
               </View>
          </>
     );
};

export default Modal;
