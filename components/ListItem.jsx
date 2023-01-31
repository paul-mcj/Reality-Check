// react and misc
import { useState } from "react";
import PropTypes from "prop-types";

// components
import TextButton from "./TextButton";

// react native
import { Text, View } from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

const ListItem = ({ title, message }) => {
     // app theme deconstruction
     const { colors, text, container, smallTextNotification } = useTheme();

     // component state
     const [showContent, setShowContent] = useState(false);

     return (
          <View style={{ ...container, marginBottom: 10 }}>
               <TextButton
                    backgroundColor={showContent ? colors.white : colors.text}
                    borderColor={showContent ? colors.white : colors.text}
                    onPress={() => setShowContent(() => !showContent)}
                    minWidth={200}
               >
                    <Text style={smallTextNotification}>{title}</Text>
               </TextButton>
               {showContent && <Text style={text}>{message}</Text>}
          </View>
     );
};

ListItem.propTypes = {
     title: PropTypes.string.isRequired,
     message: PropTypes.string.isRequired,
};

export default ListItem;
