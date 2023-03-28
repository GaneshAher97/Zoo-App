import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  AppState,
  View,
  Text,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import GlobalState from "./context/GlobalState";
import Navigation from "./navigation/Navigation";
import ErrorBoundary from "react-native-error-boundary";
import Colors from "./configs/Colors";
import { Ionicons } from "@expo/vector-icons";
import { getAsyncData } from "./utils/Utils";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
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
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      isReady: false,
      userDetails: null,
      appState: AppState.currentState,
      location: {},
      permissionStatus: "",
    };

    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();
  }

  async componentDidMount() {
    this.onStart();
    // For get the AppState
    this.appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
        }
        this.setState({ appState: nextAppState });
      }
    );

    this.connectionSubscription = NetInfo.addEventListener(
      this.handleConnectionInfoChange
    );

    this.notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    this.responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  }

  componentWillUnmount = () => {
    this.appStateSubscription.remove();

    Notifications.removeNotificationSubscription(
      this.notificationListener.current
    );

    Notifications.removeNotificationSubscription(this.responseListener.current);
    this.connectionSubscription && this.connectionSubscription();
  };

  handleConnectionInfoChange = (state) => {
    this.setState({ isConnected: state.isConnected });
  };

  onStart = async () => {
    console.log("Called onStart()");
    try {
      let fontSources = {
        Raleway: require("./assets/fonts/Raleway-Medium.ttf"),
        ...Ionicons.font,
      };

      Promise.all([
        Font.loadAsync(fontSources),
        getAsyncData("@antz_user_data"),
      ])
        .then((response) => {
          this.setState({
            userDetails: response[1],
          });
        })
        .catch((error) => console.log(error));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({
        isReady: true,
      });
    }
  };

  hideScreen = async () => {
    if (this.state.isReady) {
      await SplashScreen.hideAsync();
    }
  };

  render = () => {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <ErrorBoundary>
            <SafeAreaView style={styles.container}>
              {this.state.isReady ? (
                <>
                  {this.state.isConnected ? (
                    <GlobalState userDetails={this.state.userDetails}>
                      <Navigation />
                    </GlobalState>
                  ) : (
                    <View style={styles.offlineView}>
                      <Ionicons
                        name="cloud-offline"
                        size={50}
                        color={Colors.tomato}
                      />
                      <Text style={styles.offlineText}>You are offline</Text>
                    </View>
                  )}
                </>
              ) : (
                <View style={styles.container}>
                  <Image
                    source={require("./assets/splash.png")}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
              )}
            </SafeAreaView>
          </ErrorBoundary>
        </PaperProvider>
      </Provider>
    );
  };
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  offlineView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGrey,
  },
  offlineText: {
    fontSize: 14,
    color: Colors.textColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
