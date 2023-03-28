import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import EnclosureForm from "../screen/Encloser/EnclosureForm";
import Education from "../screen/Staff Management/Education";
import ProfileScreen from "../screen/Staff Management/Profile";
import HomeScreen from "../screen/Home";
import CamScanner from "../components/CamScanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigation from "./StackNavigation";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import LoginStack from "./LoginStack";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const context = useContext(AppContext);


  return (
    <>
      <NavigationContainer>
        {context.userDetails === null ? (
          <LoginStack />
        ) : (
          <MainStackNavigation />
        )}
      </NavigationContainer>
    </>
  );
};

export default Navigation;
