import React, { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { default as Colors } from "../configs/Colors";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import BottomNavigator from "./BottomTabNavigation";
import { clearAsyncData } from "../utils/Utils";
import AppContext from "../context/AppContext";
import { Divider, Drawer } from "react-native-paper";
const Drawers = createDrawerNavigator();
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
export const CustomDrawerContent = (props) => {
  const context = useContext(AppContext);
  const [active, setActive] = React.useState("");
  const gotoHome = () => props.navigation.navigate("Home");
  const gotoLogout = () => {
    clearAsyncData("@antz_user_data");
    clearAsyncData("@antz_user_token");
    context.unsetUserData();
  };
  const gotoEducation = () => props.navigation.navigate("Education");
  const gotoWorkExperience = () => props.navigation.navigate("WorkExperience");

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      primary: "#37BD69",
      onPrimary: "#FFFFFF",
      primaryContainer: "#52F990",
      onPrimaryContainer: "#1F515B",
      secondary: "#00D6C9",
      onSecondary: "#FFFFFF",
      secondaryContainer: "#AFEFEB",
      onSecondaryContainer: "#1F415B",
      tertiary: "#FA6140",
      onTertiary: "#FFFFFF",
      tertiaryContainer: "#FFBDA8",
      onTertiaryContainer: "#250E01",
      error: "#E93353",
      onError: "#FFFFFF",
      errorContainer: "#FFD3D3",
      onErrorContainer: "#4A0415",
      background: "#F7FDFB",
      onBackground: "#1F415B",
      surface: "#F7FDFB",
      onSurface: "#1F415B",
      surfaceVariant: "#DAE7DF",
      onSurfaceVariant: "#44544A",
      outline: "#839D8D",
      outlineVariant: "#C3CEC7",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(46, 49, 46)",
      inverseOnSurface: "rgb(240, 241, 236)",
      inversePrimary: "rgb(94, 223, 134)",
      elevation: {
        level0: "transparent",
        level1: "rgb(239, 246, 237)",
        level2: "rgb(232, 242, 232)",
        level3: "rgb(224, 237, 226)",
        level4: "rgb(222, 236, 224)",
        level5: "rgb(217, 233, 220)",
      },
      surfaceDisabled: "rgba(25, 28, 25, 0.12)",
      onSurfaceDisabled: "rgba(25, 28, 25, 0.38)",
      backdrop: "rgba(43, 50, 43, 0.4)",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerTop}>
          <Image
            source={require("../assets/lset.png")}
            resizeMode="center"
            style={styles.logo}
          />
        </View>
        <Divider />
        
        <DrawerItemList {...props} />
        <Drawer.Item
          label="Paradise Aviaries"
          active={active === "first"}
          onPress={() => setActive("first")}
          icon={({ focused, color }) => (
            <FontAwesome
            name="paw"
            size={24}
            color="black"
            style={[ focused ? { color: "#FFF" } : null]}
          />
          
          )}
        />

        <Drawer.Item
          label="Paradise Reptiles"
          active={active === "second"}
          onPress={() => setActive("second")}
          icon={({ focused, color }) => (
            <FontAwesome
            name="paw"
            size={24}
            color="black"
            style={[ focused ? { color: "#FFF" } : null]}
          />
          
          )}
        />
        <Divider />
        <DrawerItem
          label={({ focused, color }) => (
            <Text style={[styles.itemText, { color }]}>{"Dark Mode"}</Text>
          )}
          icon={({ focused, color }) => (
            <FontAwesome
              name="moon-o"
              size={22}
              style={[styles.iconStyle, focused ? { color: "#FFF" } : null]}
            />
          )}
        />

        <DrawerItem
          label={({ focused, color }) => (
            <Text style={[styles.itemText, { color }]}>{"Help & Support"}</Text>
          )}
          icon={({ focused, color }) => (
            <Ionicons
            size={28}
              name="help-circle-outline"
              style={[styles.iconStyle, focused ? { color: "#FFF" } : null]}
            />
          )}
        />
        <DrawerItem
          label={({ focused, color }) => (
            <Text style={[styles.itemText, { color }]}>{"Settings"}</Text>
          )}
          icon={({ focused, color }) => (
            <Feather
              name="settings"
              size={24}
              style={[styles.iconStyle, focused ? { color: "#FFF" } : null]}
            />
          )}
        />

        <DrawerItem
          label={({ focused, color }) => (
            <Text style={[styles.itemText, { color }]}>{"Sign Out"}</Text>
          )}
          icon={({ focused, color }) => (
            <Ionicons
              name="power"
              style={[styles.iconStyle, focused ? { color: "#FFF" } : null]}
            />
          )}
          onPress={gotoLogout}
        />
      </DrawerContentScrollView>
    </PaperProvider>
  );
};

const DrawerNavigator = () => (
  <Drawers.Navigator
    screenOptions={{
      itemStyle: { marginVertical: 5 },
      headerShown: false,
      drawerActiveBackgroundColor: false,
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawers.Screen
      component={BottomNavigator}
      name="Zoos"
      options={{
        drawerLabel: ({ focused, color }) => <Text  style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#49454F",
          marginLeft : 10
        }}>{"Zoos"}</Text>,
      }}
      onPress={() => setActive("first")}
    />
  </Drawers.Navigator>
);

const styles = StyleSheet.create({
  drawerTop: {
    height: "20%",
    justifyContent: "center",
    marginLeft: 20,
  },
  logo: {
    width: "65%",
  },
  itemText: {
    
    marginLeft : -10
  },
  iconStyle: {
    width: 25,
    color: Colors.textColor,
    fontSize: 20,
    marginLeft : 10
  },
});

export default DrawerNavigator;

{
  /* <Drawers.Screen
component={BottomNavigator}
name="Paradise Reptiles"
options={{
  drawerLabel: ({ focused, color }) => (
    <Text style={[styles.itemText]}>{"Paradise Reptiles"}</Text>
  ),
  drawerIcon: ({ focused, color }) => (
    <FontAwesome
      name="paw"
      size={24}
      color="black"
      style={[styles.iconStyle]}
    />
  ),
}}
onPress={() => setActive("second")}
/> */
}
