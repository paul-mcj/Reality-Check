// react and misc
import PropTypes from "prop-types";

// react native
import { Pressable } from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

const TextButton = ({ borderWidth, backgroundColor, onPress, children }) => {
     // app theme deconstruction
     const { colors } = useTheme();

     return (
          <Pressable
               style={{
                    borderRadius: 100,
                    borderWidth: borderWidth ?? 2,
                    borderColor: colors.white,
                    borderStyle: "solid",
                    backgroundColor: backgroundColor,
                    minWidth: borderWidth ?? 100,
                    alignItems: "center",
                    justifyContent: "center",
               }}
               onPress={onPress || null}
          >
               {children}
          </Pressable>
     );
};

TextButton.propTypes = {
     borderWidth: PropTypes.number,
     backgroundColor: PropTypes.string.isRequired,
     onPress: PropTypes.func,
     children: PropTypes.node.isRequired,
};

export default TextButton;
