// react and misc
import { useContext } from "react";

// context
import ModalContext from "../context/ModalContext";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { ScrollView } from "react-native";

// fixme: usereducer logic: get prop string type to differentiate what to display??
const Modal = () => {
     // init context
     const { setModal } = useContext(ModalContext);

     // app theme deconstruction
     const { colors, container, border } = useTheme();

     // fixme: every modal will have the same css outline (ie. z-index ,etc.)
     return (
          <ScrollView
               contentContainerStyle={{
                    ...container,
                    ...border,
               }}
          >
               {/* fixme: BackHandler to go to previous page should be allowed! this needs to be passed as props! */}
               <CloseIcon
                    name="close"
                    size={24}
                    color={colors.white}
                    onPress={() => setModal(() => false)}
                    style={{ marginBottom: 40 }}
               />
               {/* fixme: depends on props */}
               {/* {modalOutput} */}
          </ScrollView>
     );
};

export default Modal;
