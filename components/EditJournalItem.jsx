// context
import ModalContext from "../context/ModalContext";
import JournalContext from "../context/JournalContext";
import AlertContext from "../context/AlertContext";

// components
import TextButton from "./TextButton";

// react and misc
import { useContext } from "react";
import PropTypes from "prop-types";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { View, Text, ScrollView } from "react-native";

const EditJournalItem = ({ entry }) => {
     // init context
     const { deleteEntry } = useContext(JournalContext);
     const { dispatch } = useContext(ModalContext);
     const {
          setAlert,
          setTitle,
          setMessage: setAlertMessage,
          setHandleOnCancel,
          setHandleOnConfirm,
     } = useContext(AlertContext);

     // app theme deconstruction
     const { colors, smallTextWhite, border } = useTheme();

     // function will delete entry from journal context
     const handleOnPress = () => {
          // Alert user is about to delete the entry
          setTitle(() => "Warning");
          setAlertMessage(
               () => `Are you sure you want to delete this journal entry?`
          );
          setHandleOnConfirm.bind(null, () => deleteEntry(entry?.id));
          setAlert(() => true);
          // fixme: this logic needs some more fine tuning, but the above bind function fixes major issues so its a good start!
          //   setAlert(() => false);
          //   dispatch({ type: "CLOSE_MODAL" });
     };

     return (
          <ScrollView showsVerticalScrollIndicator={false}>
               <Text
                    style={{
                         ...smallTextWhite,
                         paddingBottom: 0,
                    }}
               >
                    {entry?.timestamp.toDateString()}
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
                         <Text style={smallTextWhite}>{entry?.input}</Text>
                    </View>
               </View>
               <View style={{ flex: 1, marginTop: 40 }}>
                    <TextButton
                         backgroundColor={colors.notification}
                         minWidth={100}
                         onPress={handleOnPress}
                    >
                         {/* fixme: fix width of the button to be smaller! */}
                         <Text style={smallTextWhite}>Delete</Text>
                    </TextButton>
               </View>
          </ScrollView>
     );
};

EditJournalItem.propTypes = {
     entry: PropTypes.object.isRequired,
};

export default EditJournalItem;
