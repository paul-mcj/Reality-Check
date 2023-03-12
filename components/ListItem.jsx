// react and misc
import { useState } from "react";
import PropTypes from "prop-types";

// components
import TextButton from "./TextButton";

// react native
import { Text, View, Pressable } from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

// eslint-disable-next-line react/display-name
const ListItem = ({ title, message }) => {
     // app theme deconstruction
     const { colors, smallTextNotification, smallTextWhite, border } =
          useTheme();

     // component state
     const [showContent, setShowContent] = useState(false);

     return (
          <View style={{ marginBottom: 10 }}>
               <View style={{ zIndex: 1 }}>
                    <TextButton
                         backgroundColor={colors.white}
                         borderColor={colors.white}
                         onPress={() => setShowContent(() => !showContent)}
                         minWidth={250}
                    >
                         <Text style={smallTextNotification}>{title}</Text>
                    </TextButton>
               </View>
               {showContent && (
                    <View
                         style={{
                              ...border,
                              backgroundColor: colors.notification,
                              borderTopWidth: 0,
                              borderTopLeftRadius: 0,
                              borderTopRightRadius: 0,
                              borderBottomStartRadius: 25,
                              borderBottomEndRadius: 25,
                              marginTop: -20,
                         }}
                    >
                         <View style={{ marginTop: 20 }}>
                              {message.map((item) => (
                                   // its improper to not have a key for each item while mapping, but since the data is static theres no need:
                                   // eslint-disable-next-line react/jsx-key
                                   <Pressable
                                        onPress={() =>
                                             setShowContent(() => !showContent)
                                        }
                                   >
                                        <Text style={smallTextWhite}>
                                             {item}
                                        </Text>
                                   </Pressable>
                              ))}
                         </View>
                    </View>
               )}
          </View>
     );
};

ListItem.propTypes = {
     title: PropTypes.string.isRequired,
     message: PropTypes.array.isRequired,
};

export default ListItem;
