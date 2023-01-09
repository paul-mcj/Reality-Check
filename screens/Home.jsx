// react and misc.
import { useState, useCallback } from "react";
import PropTypes from "prop-types";

// react native
import {
     StyleSheet,
     Text,
     View,
     Image,
     TextInput,
     ScrollView,
     Button,
     Switch,
     Alert,
     ToastAndroid,
     RefreshControl,
} from "react-native";

const Home = ({ navigation }) => {
     const [input, setInput] = useState("");
     const [isAlert, setIsAlert] = useState(false);
     const [switchValue, setSwitchValue] = useState(null);
     const [refreshing, setRefreshing] = useState(false);

     const onRefresh = useCallback(() => {
          setRefreshing(true);
          setTimeout(() => {
               setRefreshing(false);
               resetSwitch();
          }, 2000);
     }, []);

     const resetSwitch = () => {
          setSwitchValue(() => false);
          setInput(() => "");
     };

     const handleOnPress = () => {
          setIsAlert(() => !isAlert);
     };

     const handleSwitch = () => {
          setSwitchValue(() => !switchValue);
     };
     return (
          <View style={styles.container}>
               <Text style={styles.title}>Home</Text>
               <Text style={styles.text}>
                    Explain the app, add ability change the clock using internal
                    permissions
               </Text>
               {/* {isAlert &&
                    Alert.alert("This is an alert", "no", [
                         { text: "cancel", onPress: handleOnPress },
                    ])}
               {switchValue && ToastAndroid.show("toast", ToastAndroid.SHORT)}
               <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                         <RefreshControl
                              refreshing={refreshing}
                              onRefresh={onRefresh}
                         />
                    }
               >
                    <Text style={styles.title}>Reality Check </Text>
                    <Switch value={switchValue} onChange={handleSwitch} />
                    <Image source={require("../assets/favicon.png")} />
                    <TextInput
                         style={styles.textInput}
                         value={input}
                         onChangeText={setInput}
                    />
                    <Text style={styles.text}>
                         wowowow ipsum dolor sit amet, consectetur adipiscing
                         elit, sed do eiusmod tempor incididunt ut labore et
                         dolore magna aliqua. Ut enim ad minim veniam, quis
                         nostrud exercitation ullamco laboris nisi ut aliquip ex
                         ea commodo consequat. Duis aute irure dolor in
                         reprehenderit in voluptate velit esse cillum dolore eu
                         fugiat nulla pariatur. Excepteur sint occaecat
                         cupidatat non proident, sunt in culpa qui officia
                         deserunt mollit anim id est laborum.
                    </Text>
                    <Button
                         color={"red"}
                         title="press me!"
                         onPress={handleOnPress}
                    />
                    <Button
                         title="Journal"
                         onPress={() => navigation.navigate("Journal")}
                    />
               </ScrollView> */}
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          // backgroundColor: "#221b47",
          backgroundColor: "rgb(37,40,34)",

          // backgroundColor: "rgb(172,129,236)",
          alignItems: "center",
          justifyContent: "center",
     },
     title: {
          marginTop: 20,
          fontSize: 42,
          color: "#fff",
     },
     image: {
          width: 100,
          height: 100,
     },
     textInput: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          width: "80%",
          padding: 10,
     },
     text: {
          fontSize: 16,
          color: "#fff",
     },
     scrollView: {
          backgroundColor: "pink",
          marginHorizontal: 20,
     },
});

Home.propTypes = {
     navigation: PropTypes.object.isRequired,
};

export default Home;
