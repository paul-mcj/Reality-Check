// context
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
     const { dispatch: alertDispatch } = useContext(AlertContext);

     // app theme deconstruction
     const { colors, container, smallTextWhite, border, text } = useTheme();

     // function will delete entry from journal context
     const handleOnPress = () => {
          // Alert user is about to delete the entry
          alertDispatch({
               type: "DELETE_ENTRY",
               payload: {
                    title: "Warning",
                    message: "Are you sure you want to delete this journal entry?",
                    data: entry,
               },
          });
     };

     return (
          <ScrollView
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ marginTop: 60 }}
          >
               <Text
                    style={{
                         ...text,
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
                         <Text style={{ ...smallTextWhite, textAlign: "left" }}>
                              {entry?.input}
                         </Text>
                    </View>
               </View>
               <View style={container}>
                    <TextButton
                         backgroundColor={colors.notification}
                         minWidth={100}
                         onPress={handleOnPress}
                    >
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
