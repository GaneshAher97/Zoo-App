import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { Button, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../../context/AppContext";
import { signin } from "../../services/AuthService";
import { saveAsyncData } from "../../utils/Utils";
import ButtonLoader from "../../components/ButtonLoader";
import Colors from "../../configs/Colors";
import ButtonCom from "../../components/ButtonCom";
import { useNavigation } from "@react-navigation/native";
import { setSignIn } from "../../redux/AuthSlice";
import { useDispatch , useSelector} from "react-redux";

const LoginScreen = () => {
  const [show, setShow] = React.useState(true);
  const [isLoading, setLoding] = React.useState(false);
  const [errorMSG, setErrorMSG] = React.useState(undefined);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const context = useContext(AppContext);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start();
		});
		return unsubscribe;
  }, [fadeAnim]);

  const login = () => {
    setErrorMSG(undefined);
    setLoding(true);
    let obj = {
      email: email,
      password: password,
    };
    signin(obj)
      .then((res) => {
        console.log(res);
        if (res.message) {
          setLoding(false);
          setErrorMSG(res.message);
          return;
        }
        dispatch(setSignIn(res))
        saveAsyncData("@antz_user_data", res);
        saveAsyncData("@antz_user_token", res.token);
        context.setUserData(res);
        setLoding(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Animated.View // Special animatable View
      style={{
        // ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      <SafeAreaView>
        <ScrollView style={{ backgroundColor: "#F5F5F5", height: "100%" }}>
          <View
            style={{
              alignItems: "center",
              marginBottom: "10%",
              marginTop: "10%",
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 150, height: 150 }}
              alt="loading..."
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 44,
                fontWeight: "300",
                color: "gray",
              }}
            >
              Login
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={{
                marginTop: "12%",
                width: "80%",
                backgroundColor: "#F5F5F5",
              }}
              label="Username"
              autoCapitalize="none"
              mode="outlined"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              left={
                <TextInput.Icon
                  icon={(props) => (
                    <FontAwesome
                      {...props}
                      name="user-circle-o"
                      size={20}
                      color="gray"
                    />
                  )}
                />
              }
            />
            <TextInput
              style={{
                marginTop: 30,
                width: "80%",
                backgroundColor: "#F5F5F5",
              }}
              mode="outlined"
              label="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={show}
              right={
                <TextInput.Icon
                  icon={(props) => (
                    <Pressable onPress={() => setShow(!show)}>
                      <MaterialIcons
                        {...props}
                        name={show ?  "visibility-off" : "visibility" }
                      />
                    </Pressable>
                  )}
                />
              }
              left={
                <TextInput.Icon
                  icon={(props) => (
                    <MaterialCommunityIcons
                      {...props}
                      name="key"
                      size={25}
                      style={{ color: "gray" }}
                    />
                  )}
                />
              }
            />
            {typeof errorMSG !== "undefined" ? (
              <Text style={styles.errorText}>{errorMSG}</Text>
            ) : (
              <Text style={styles.errorText}></Text>
            )}

            {!isLoading ? (
              <ButtonCom
                title="Login"
                buttonStyle={{
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: 5,
                  backgroundColor: "#37BD69",
                  height: 55,
                }}
                textStyle={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: 22,
                }}
                onPress={login}
              />
            ) : (
              <ButtonLoader
								loaderColor="warning.500"
								buttonColor="indigo"
								buttonWidth="305"
							/>
            )}
            <View style={styles.registerCont}>
              <Text style={{ color: "#666666" }}>Don’t have an account?</Text>
              <Text style={styles.register}>Register</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  label: {
    marginTop: 20,
    fontSize: 5,
    fontWeight: "200",
  },
  inputFlieds: {
    fontSize: 12,
    color: "black",
    borderColor: "#00008B",
  },
  errorText: {
    fontSize: 14,
    color: Colors.tomato,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
  },
  registerCont: {
    alignItems: "center",
    marginTop: "15%",
  },
  register: {
    color: "#37BD69",
    fontWeight: "500",
    fontSize: 18,
  },
});