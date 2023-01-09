// react and misc
import PropTypes from "prop-types";

// react native
import { Button, Text } from "react-native";

const Journal = ({ navigation }) => {
     return (
          <>
               {/* <h1>Journal</h1> */}
               <Text>Journal</Text>
               <Button
                    title="Home"
                    onPress={() => navigation.navigate("Home")}
               />
          </>
     );
};

// Journal.PropTypes = {
//      navigation: PropTypes.object.isRequired,
// };

export default Journal;
