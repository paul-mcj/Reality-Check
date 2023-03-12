// expo
import { LinearGradient } from "expo-linear-gradient";

// react navigation
import { useTheme } from "@react-navigation/native";

const ShadowOverlay = () => {
     // app theme deconstruction
     const { colors } = useTheme();

     return (
          <LinearGradient
               style={{
                    bottom: 0,
                    position: "absolute",
                    zIndex: 1,
                    minHeight: 12,
                    minWidth: "100%",
               }}
               colors={[colors.transparent, colors.background]}
          />
     );
};

export default ShadowOverlay;
