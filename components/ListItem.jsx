// react and misc
import { useState } from "react";
import PropTypes from "prop-types";

// components
import TextButton from "./TextButton";

// react native
import { Text } from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

const ListItem = ({ title, message }) => {
     // app theme deconstruction
     const { colors, text, smallTextNotification } = useTheme();

     // component state
     const [showContent, setShowContent] = useState(false);

     return (
          <>
               <TextButton
                    backgroundColor={colors.white}
                    onPress={() => setShowContent(() => !showContent)}
               >
                    <Text style={smallTextNotification}>{title}</Text>
               </TextButton>
               {showContent && <Text style={text}>{message}</Text>}
          </>
     );
};

ListItem.propTypes = {
     title: PropTypes.string.isRequired,
     message: PropTypes.string.isRequired,
};

export default ListItem;
