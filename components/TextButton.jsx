// react and misc
import PropTypes from "prop-types";

// react native
import { Pressable } from "react-native";

// react navigation
import { useTheme } from "@react-navigation/native";

// eslint-disable-next-line react/display-name
const TextButton = ({
     minWidth,
     borderWidth,
     backgroundColor,
     borderColor,
     onPress,
     children
}) => {
     // app theme deconstruction
     const { colors } = useTheme();

     return (
          <Pressable
               style={{
                    borderRadius: 100,
                    borderWidth: borderWidth ?? 2,
                    borderColor: borderColor ?? colors.white,
                    borderStyle: "solid",
                    backgroundColor: backgroundColor,
                    minWidth: minWidth ?? 250,
                    alignItems: "center",
                    justifyContent: "center"
               }}
               onPress={onPress || null}>
               {children}
          </Pressable>
     );
};
TextButton.propTypes = {
     minWidth: PropTypes.any,
     borderWidth: PropTypes.number,
     backgroundColor: PropTypes.string.isRequired,
     borderColor: PropTypes.string,
     onPress: PropTypes.func,
     children: PropTypes.node.isRequired
};

export default TextButton;
