import React, { useState } from "react";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import SearchBox from "./SearchBox";
import { useNavigation } from "@react-navigation/native";
import Colors from "../configs/Colors";

const deviceWidth = Dimensions.get("window").width;

const Header = (props) => {
  const navigation = useNavigation();
  const gotoBack = () => navigation.goBack();
  return (
    <SafeAreaView style={{ backgroundColor: "#fff"}}>
      <StatusBar
        // barStyle={"light-content"}
        backgroundColor="#24595F"
      />
      {props.route == true ? <SearchBox /> :

        <View style={styles.container}>
          {props.noIcon ? <View style={styles.leftIcon}></View> :
            <TouchableOpacity style={styles.leftIcon} onPress={gotoBack}>
              <Entypo name="cross" size={32} color="black" />
            </TouchableOpacity>
          }
          <Text style={{ fontSize: 25, color: "black", textAlign: "center" }}>
            {props.title}
          </Text>
          {props.noIcon ? <View style={styles.leftIcon}></View> :
            <TouchableOpacity onPress={props.onPress} style={[styles.rightIcon]}>
              <AntDesign name="check" size={30} color="black" />
              {props.addHeader ? props.addHeader : null}
            </TouchableOpacity>
          }
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: deviceWidth,
    width: deviceWidth,
    height: 70,
    alignSelf: "center",
    flexDirection: "row",
    borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftIcon: {
    maxWidth: 60,
    width: 50,
    height: 50,
    borderColor: "white",
    // borderWidth: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  rightIcon: {
    maxWidth: 150,
    width: "auto",
    height: 50,
    borderColor: "white",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 5,
    paddingTop: 10,
    paddingRight: 15,
  },
});

export default Header;

//  <<<<<<<<<<<<<---------- Documentation for My header component------------>>>>>>>>> //
// step-1 --->> you have to call a function & pass it as a props named addHeader //
// step-2 --->>  you can add multiple icon into header by adding it into the function as many as you want //
// function returns multiple icons //

// const handleHeaderFun = () => {
// 	return (
// 		<>
// 			<View style={{ marginLeft: 10, flexDirection: "row" }}>
// 				<Entypo name="export" size={24} color="white" />
// 			</View>
// 			<View style={{ marginLeft: 10, flexDirection: "row" }}>
// 				<AntDesign name="retweet" size={24} color="white" />
// 			</View>
// 			<View style={{ marginLeft: 10, flexDirection: "row" }}>
// 				<AntDesign name="pluscircle" size={24} color="white" />
// 			</View>
// 		</>
// 	);
// };