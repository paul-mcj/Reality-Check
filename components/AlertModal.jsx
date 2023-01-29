// react native
import { View, Text, Alert } from "react-native";

// react and misc
import { useContext, useEffect } from "react";

// context
import AlertContext from "../context/AlertContext";
import JournalContext from "../context/JournalContext";
import ReminderContext from "../context/ReminderContext";
import ModalContext from "../context/ModalContext";

// react navigation
import { useTheme } from "@react-navigation/native";

// components
import TextButton from "./TextButton";

const AlertModal = () => {
     // init context
     const {
          title,
          message,
          obj,
          setAlert,
          setHandleOnConfirm,
          handleOnConfirm,
          handleOnCancel,
     } = useContext(AlertContext);
     const { dispatch } = useContext(ModalContext);
     const { deleteEntry } = useContext(JournalContext);
     const {
          reminders,
          reminderIds,
          addReminder,
          deleteReminder,
          editReminderTime,
          editReminderIsActive,
     } = useContext(ReminderContext);

     useEffect(() => {
          setAlert(() => false);
     });

     // app theme deconstruction
     const { colors, smallTextWhite, border, container } = useTheme();

     // return (
     //      <View
     //           style={{
     //                backgroundColor: "rgba(0, 0, 0, 0.6)",
     //                // position: "absolute",
     //                height: "100%",
     //                width: "100%",
     //           }}
     //      >
     //           <View
     //                style={{
     //                     top: "33%",
     //                     marginLeft: 40,
     //                     marginRight: 40,
     //                }}
     //           >
     //                <View
     //                     style={{
     //                          ...border,
     //                          backgroundColor: colors.background,
     //                     }}
     //                >
     //                     <Text>sauhsuiahsu</Text>
     //                     {/* <View
     //                          style={{
     //                               ...container,
     //                               marginBottom: 80,
     //                               backgroundColor: "yellow",
     //                          }}
     //                     >
     //                          <Text style={smallTextWhite}>{title}</Text>
     //                          <Text style={smallTextWhite}>{message}</Text>
     //                          <TextButton
     //                               backgroundColor=""
     //                               onPress={() => deleteEntry(obj?.id)}
     //                          >
     //                               {<Text>confirm</Text>}
     //                          </TextButton>
     //                          <TextButton
     //                               backgroundColor=""
     //                               onPress={() => setAlert(() => false)}
     //                          >
     //                               {<Text>cancel</Text>}
     //                          </TextButton>
     //                     </View> */}
     //                </View>
     //           </View>
     //      </View>
     // );

     return Alert.alert(
          title,
          message,
          [
               {
                    text: "Cancel",
               },
               {
                    text: "Confirm",
                    onPress:
                         obj === null
                              ? () => {}
                              : () => {
                                     deleteEntry(obj.id);
                                     dispatch({ type: "CLOSE_MODAL" });
                                },

                    // (
                    //      () => {
                    //      deleteEntry(obj.id);
                    //      dispatch({ type: "CLOSE_MODAL" });
                    // }) ?? obj,
               },
          ],
          {
               cancelable: false,
          }
     );
};

export default AlertModal;
