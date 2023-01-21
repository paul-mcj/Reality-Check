// react and misc
import { useState } from "react";
import PropTypes from "prop-types";

// components
import TextButton from "./TextButton";

// react native
import { StyleSheet, Text } from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

const ListItem = ({ title, text }) => {
     // app theme deconstruction
     const { colors } = useTheme();

     // component state
     const [showContent, setShowContent] = useState(false);

     return (
          <>
               <TextButton
                    backgroundColor={colors.white}
                    onPress={() => setShowContent(() => !showContent)}
               >
                    <Text
                         style={{
                              ...styles.smallText,
                         }}
                    >
                         {title}
                    </Text>
               </TextButton>
               {showContent && (
                    <Text
                         style={{
                              ...styles.text,
                              color: colors.white,
                         }}
                    >
                         {text}
                    </Text>
               )}
          </>
     );
};

const styles = StyleSheet.create({
     text: {
          fontSize: 24,
     },
     smallText: {
          fontSize: 16,
          padding: 10,
     },
});

ListItem.propTypes = {
     title: PropTypes.string.isRequired,
     text: PropTypes.string.isRequired,
};

export default ListItem;
