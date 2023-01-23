// react navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// expo
import { StatusBar } from "expo-status-bar";

// fixme: how to optimize react native apps? fells very slow...

// components
import Home from "./screens/Home";
import Journal from "./screens/Journal";
import NewEntry from "./screens/NewEntry";

// context
import { JournalProvider } from "./context/JournalContext";

// icons
import HomeIcon from "react-native-vector-icons/Octicons";
import PencilIcon from "react-native-vector-icons/Octicons";
import BookIcon from "react-native-vector-icons/Octicons";

export default function App() {
     // initialize creator function for navigation bar
     const Tab = createMaterialTopTabNavigator();

     // fixme: fetch all journal entries in local memory and fill the context when App.js loads (useEffect?)
     const content = { data: [] };

     // fixme: go though all components, and reduce StyleSheet to be imported!

     // define app theme
     const theme = {
          ...DefaultTheme,
          dark: false,
          colors: {
               primary: "rgba(255, 255, 255, 0)",
               secondary: "#381b47",
               background: "#221b47",
               card: "",
               white: "#fff",
               text: "#aaa",
               dim: "#777",
               border: "",
               notification: "#3f3861",
               accent: "#1b2a47",
          },
     };
     const { colors } = theme;

     return (
          <JournalProvider value={content}>
               <NavigationContainer theme={theme}>
                    <StatusBar hidden={true} />
                    {/* fixme: all purpose modal here? it would have its own css properties and a use context hook, and any time in the entire app a modal needs to be used, put it here, and usereducer logic to pass in a string type to differentiate ?? */}
                    <Tab.Navigator
                         initialRouteName="Home"
                         backBehavior="none"
                         tabBarPosition="bottom"
                         screenOptions={{
                              headerShown: false,
                              swipeEnabled: true,
                              tabBarShowLabel: false,
                              tabBarStyle: {
                                   backgroundColor: colors.background,
                              },
                              tabBarActiveTintColor: colors.white,
                              tabBarInactiveTintColor: colors.dim,
                         }}
                    >
                         <Tab.Screen
                              name="Home"
                              component={Home}
                              options={{
                                   tabBarIcon: (props) => (
                                        <HomeIcon
                                             name="home"
                                             size={24}
                                             color={props.color}
                                        />
                                   ),
                              }}
                              tin
                         />
                         <Tab.Screen
                              name="NewEntry"
                              component={NewEntry}
                              options={{
                                   tabBarIcon: (props) => (
                                        <PencilIcon
                                             name="pencil"
                                             size={24}
                                             color={props.color}
                                        />
                                   ),
                              }}
                         />
                         <Tab.Screen
                              name="Journal"
                              component={Journal}
                              options={{
                                   tabBarIcon: (props) => (
                                        <BookIcon
                                             name="book"
                                             size={24}
                                             color={props.color}
                                        />
                                   ),
                              }}
                         />
                    </Tab.Navigator>
               </NavigationContainer>
          </JournalProvider>
     );
}
