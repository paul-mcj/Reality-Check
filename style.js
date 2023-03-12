// react navigation
import { DefaultTheme } from "@react-navigation/native";

// define app theme
const theme = {
     ...DefaultTheme,
     dark: false,
     colors: {
          primary: "rgba(255, 255, 255, 0)",
          secondary: "#381b47",
          background: "#221b47",
          white: "#fff",
          text: "#aaa",
          dim: "#888",
          notification: "#3f3861",
          accent: "#1b2a47",
          transparent: "transparent",
     },
     container: {
          alignItems: "center",
          justifyContent: "center",
          margin: 40,
     },
     title: {
          textAlign: "center",
          fontSize: 28,
          color: "#fff",
          marginBottom: 40,
     },
     text: {
          textAlign: "center",
          fontSize: 24,
          color: "#fff",
          padding: 10,
     },
     smallTextWhite: {
          textAlign: "center",
          fontSize: 16,
          color: "#fff",
          padding: 10,
     },
     smallTextNotification: {
          textAlign: "center",
          fontSize: 16,
          color: "#3f3861",
          padding: 10,
     },
     border: {
          borderColor: "#fff",
          borderRadius: 10,
          borderStyle: "solid",
          borderWidth: 2,
          padding: 10,
     },
};

export default theme;
