// note: general app fixes
// fixme: how to optimize react native apps? fells very slow...
// fixme: google fonts??

// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// expo
import { StatusBar } from "expo-status-bar";

// components
import Home from "./screens/Home";
import Journal from "./screens/Journal";
import NewEntry from "./screens/NewEntry";

// style
import theme from "./style";

// context
import { JournalProvider } from "./context/JournalContext";
import { ModalProvider } from "./context/ModalContext";

// icons
import HomeIcon from "react-native-vector-icons/Octicons";
import PencilIcon from "react-native-vector-icons/Octicons";
import BookIcon from "react-native-vector-icons/Octicons";

export default function App() {
     // initialize creator function for navigation bar
     const Tab = createMaterialTopTabNavigator();

     // app theme deconstruction
     const { colors } = theme;

     // fixme: fetch all journal entries in local storage and fill the journal context when App.js loads (useEffect?)

     return (
          <ModalProvider>
               <JournalProvider>
                    <NavigationContainer theme={theme}>
                         <StatusBar hidden={true} />
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
          </ModalProvider>
     );
}
