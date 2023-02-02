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
     const { colors, smallTextNotification, smallTextWhite } = useTheme();

     // component state
     const [showContent, setShowContent] = useState(false);

     return (
          <View style={{ marginBottom: 10 }}>
               <TextButton
                    backgroundColor={showContent ? colors.white : colors.text}
                    borderColor={showContent ? colors.white : colors.text}
                    onPress={() => setShowContent(() => !showContent)}
                    minWidth={250}
               >
                    <Text style={smallTextNotification}>{title}</Text>
               </TextButton>
               {showContent &&
                    message.map((item) => (
                         // its improper to not have a key while mapping, but since the data is static theres no need...
                         <Text style={smallTextWhite}>{item}</Text>
                    ))}
          </View>
     );
};

ListItem.propTypes = {
     title: PropTypes.string.isRequired,
     message: PropTypes.array.isRequired,
};

export default ListItem;
