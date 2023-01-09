// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// expo
import { StatusBar } from "expo-status-bar";

// components
import Home from "./screens/Home";
import Journal from "./screens/Journal";

export default function App() {
     const Stack = createNativeStackNavigator();

     return (
          <>
               <StatusBar style="auto" hidden={true} />
               <NavigationContainer>
                    <Stack.Navigator>
                         <Stack.Screen name="Home" component={Home} />
                         <Stack.Screen name="Journal" component={Journal} />
                    </Stack.Navigator>
               </NavigationContainer>
          </>
     );
}
