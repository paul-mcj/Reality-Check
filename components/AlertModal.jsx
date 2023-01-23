// react native
import { Alert } from "react-native";

// react and misc
import PropTypes from "prop-types";

const AlertModal = ({
     title,
     message,
     firstButtonTitle,
     firstOnPress,
     secondButtonTitle,
     secondOnPress,
}) => {
     return Alert.alert(
          title,
          message,
          [
               { text: firstButtonTitle, onPress: firstOnPress },
               { text: secondButtonTitle, onPress: secondOnPress },
          ],
          {
               cancelable: false,
          }
     );
};

AlertModal.propTypes = {
     title: PropTypes.string.isRequired,
     message: PropTypes.string.isRequired,
     firstButtonTitle: PropTypes.string,
     firstOnPress: PropTypes.func,
     secondButtonTitle: PropTypes.string,
     secondOnPress: PropTypes.func,
};

export default AlertModal;
