// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// expo
import { StatusBar } from "expo-status-bar";

// components
import Home from "./screens/Home";
import Journal from "./screens/Journal";
import NewEntry from "./screens/NewEntry";

// mui vector icons
import HomeIcon from "react-native-vector-icons/Octicons";
import PencilIcon from "react-native-vector-icons/Octicons";
import BookIcon from "react-native-vector-icons/Octicons";

// react native
import { StyleSheet, ScrollView, View } from "react-native";

export default function App() {
     const Tab = createMaterialTopTabNavigator();

     return (
          <>
               <StatusBar style="auto" hidden={true} />
               <NavigationContainer>
                    <Tab.Navigator
                         initialRouteName="Home"
                         backBehavior="none"
                         tabBarPosition="bottom"
                         screenOptions={{
                              headerShown: false,
                              swipeEnabled: true,
                              tabBarShowLabel: false,
                              tabBarStyle: {
                                   backgroundColor: "rgb(37,40,34)",
                                   // backgroundColor: "#221b47",
                              },
                              tabBarPressColor: "red",
                         }}
                    >
                         <Tab.Screen
                              name="Home"
                              component={Home}
                              options={{
                                   tabBarIcon: () => (
                                        <HomeIcon
                                             name="home"
                                             size={24}
                                             color={"#fff"}
                                        />
                                   ),
                              }}
                         />
                         <Tab.Screen
                              name="NewEntry"
                              component={NewEntry}
                              options={{
                                   tabBarIcon: () => (
                                        <PencilIcon
                                             name="pencil"
                                             size={24}
                                             color={"#fff"}
                                        />
                                   ),
                              }}
                         />
                         <Tab.Screen
                              name="Journal"
                              component={Journal}
                              options={{
                                   tabBarIcon: () => (
                                        <BookIcon
                                             name="book"
                                             size={24}
                                             color={"#fff"}
                                        />
                                   ),
                              }}
                         />
                    </Tab.Navigator>
               </NavigationContainer>
          </>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#221b47",
          alignItems: "center",
          justifyContent: "center",
     },
});
