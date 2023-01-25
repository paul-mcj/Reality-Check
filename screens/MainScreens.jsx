// icons
import HomeIcon from "react-native-vector-icons/Octicons";
import PencilIcon from "react-native-vector-icons/Octicons";
import BookIcon from "react-native-vector-icons/Octicons";

// screens
import Home from "./Home";
import Journal from "./Journal";
import NewEntry from "./NewEntry";

// context
import ModalContext from "../context/ModalContext";

// react and misc.
import { useContext } from "react";

// components
import Modal from "../components/Modal";

// style
import theme from "../style";

// react navigation
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const MainScreens = () => {
     // initialize creator function for navigation bar
     const Tab = createMaterialTopTabNavigator();

     // context
     const { modal, setModal, setReducerType } = useContext(ModalContext);

     // app theme deconstruction
     const { colors } = theme;

     return (
          <>
               {/* fixme: all toasts go here! toast when something is deleted (ie. journal entry, reminder obj), and also toast when a reminder is turned off/on!*/}
               {/* {isToast && <Toast />} */}
               {modal && <Modal />}
               {!modal && (
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
               )}
          </>
     );
};

export default MainScreens;
