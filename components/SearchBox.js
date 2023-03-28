import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Searchbar } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from '@expo/vector-icons';
import VoiceText from "./VoiceText";
import DrawerNavigator from "../navigation/DrawerNavigation";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();
  const toggleDrawer = () => navigation.toggleDrawer();


  const onVoiceInput = (text) => {
    setSearchText(text)
  };

  return (
    <View  style={styles.barStyle}>
    <Searchbar
      placeholder="Search"
      onChangeText={(text)=>{setSearchText(text)}}
      value={searchText}
      inputStyle={styles.input}
      style={styles.searchBar}
      loading={false}
      icon={({ size, color }) => (
        <MaterialIcons name="menu" size={24} color />
      )}
      onIconPress={toggleDrawer}
      // clearIcon={({ size, color }) => (
      //   <View style={styles.rightIcons}>
      //       <MaterialIcons name="search" size={24} />
      //       <VoiceText resultValue={onVoiceInput} />
      //   </View>
      // )}
      
      right={({ size, color }) => (
        <View style={styles.rightIcons}>
          <MaterialIcons name="search" size={24} 
            style={{
              margin: 10
            }}
          />
          <VoiceText resultValue={onVoiceInput} />
        </View>
      )}

      />
    </View>   
  );
};

const styles = StyleSheet.create({
    barStyle: {
      marginHorizontal: 12,
      marginTop : 5 ,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    searchBar:{
        width: "96%",
    },
    rightIcons:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: '3%',
        marginHorizontal: '1%'
    },
    input:{
        width: "40%",
    }
  });

  
export default SearchBox;