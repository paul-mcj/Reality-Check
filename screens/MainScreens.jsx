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
import ToastContext from "../context/ToastContext";
import AlertContext from "../context/AlertContext";

// react and misc.
import { useContext } from "react";

// components
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import AlertModal from "../components/AlertModal";

// style
import theme from "../style";

// react navigation
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const MainScreens = () => {
     // initialize creator function for navigation bar
     const Tab = createMaterialTopTabNavigator();

     // context
     const { modal } = useContext(ModalContext);
     const { isToast } = useContext(ToastContext);
     const { alert } = useContext(AlertContext);

     // app theme deconstruction
     const { colors } = theme;

     return (
          <>
               {isToast && <Toast />}
               {modal && <Modal />}
               {alert && <AlertModal />}
               <Tab.Navigator
                    initialRouteName="Home"
                    backBehavior="order"
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
                         tabBarScrollEnabled: false,
                         tabBarPressColor: colors.transparent,
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
          </>
     );
};

export default MainScreens;
