// react and misc
import { useContext, useEffect } from "react";

// context
import ModalContext from "../context/ModalContext";

// components
import HomeInfoList from "../components/HomeInfoList";

// icons
import CloseIcon from "react-native-vector-icons/MaterialIcons";

// react navigation
import { useTheme } from "@react-navigation/native";

// react native
import { ScrollView, Text } from "react-native";

// fixme: usereducer logic: get prop string type to differentiate what to display??
const Modal = () => {
     // init context
     const { setModal, reducerType } = useContext(ModalContext);

     // app theme deconstruction
     const { colors, container, border } = useTheme();

     useEffect(() => {
          console.log(reducerType);
     }, []);

     // fixme: every modal will have the same css outline (ie. z-index ,etc.). eventually, get rid of the border!!
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
               {reducerType === "MORE" && <HomeInfoList />}
               {/* fixme: depending on reducer type, show different things */}
          </ScrollView>
     );
};

export default Modal;
