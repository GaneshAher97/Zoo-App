import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QRCodeScanner from "../components/CamScanner";
import HomeScreen from "../screen/Home";
import Module from "../screen/Module";
import Profile from "../screen/Staff Management/Profile";

const HomeRoute = () => <HomeScreen/>;

const MenuRoute = () => <Module/>

const TaskRoute = () => <Module/>
const ScanRoute = () => <QRCodeScanner/>


const ProfileRoute = () => <Profile/>

const BottomTabNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    { key: "menu", title: "Menu", focusedIcon: "menu-open", 
    unfocusedIcon:  "menu" 
},
    { key: "scan", title: "Scan",  focusedIcon: (props) => (
        <MaterialCommunityIcons {...props} name="qrcode-scan" size={24} />
      )},
    { key: "task", title: "Task", focusedIcon: "format-list-bulleted-square", unfocusedIcon: "format-list-checkbox",  },
    {
      key: "profile",
      title: "profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    menu: MenuRoute,
    scan: ScanRoute,
    task: TaskRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // theme={{
      //   colors: {
      //     secondaryContainer: "#54ffad",
      //     onPrimaryContainer: "#37bd69",
      //   },
      // }}
    />
  );
};

export default BottomTabNav;
