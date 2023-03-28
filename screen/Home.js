import { View, StyleSheet, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { data } from "../configs/Config";
import { buttonData } from "../configs/Config";
import Header from "../components/Header";
import { getRefreshToken } from "../services/AuthService";
import { saveAsyncData } from "../utils/Utils";
import Colors from "../configs/Colors";
import FloatingButton from "../components/FloatingButton";
import { Button } from "react-native-paper";
import { BottomPopUp } from "../components/BottomSheet";
import { Avatar, Card, Badge, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useDispatch , useSelector} from "react-redux";

const HomeScreen = (props) => {
  const [route, setRoute] = useState(false);
  const[unreadNotifications, setUnreadNotifications] = useState(2)
  const navigation = useNavigation();

  const user = useSelector(state => state.UserAuth)
  console.log("user=====>>>", user);

  let popUpRef = React.createRef();
  const onShowPopUp = () => {
    popUpRef.show();
  };


  const onClosePopUp = (item) => {
    popUpRef.close();
  };
  useEffect(() => {
    setRoute(true);
    getRefreshToken()
      .then((res) => {
        console.log(res.token);
        saveAsyncData("@antz_user_token", res.token);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const onIconClick = (item) => {
    popUpRef.close();
    navigation.navigate(item.screen);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          alignItems: "center"
        }}
      >
        <View >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "48%",
              alignItems: "center"
            }}
          >
            <FontAwesome name="location-arrow" size={18} color="#37BD69" />
            <Text>Site Name</Text>
            <AntDesign name="down" size={14} color="black" />
          </View>
          <Text style={{ fontSize: 10 }}>Site address of the zoo</Text>
        </View>
        <View >
          <Badge
            visible={unreadNotifications && unreadNotifications > 0}
            size={14}
            style={{ position: 'absolute', top: 8, right: 6 }}
          >
            {unreadNotifications}
          </Badge>
          {/* <AntDesign name="bells" size={20} color="black" /> */}
          <Appbar.Action
            icon={unreadNotifications ? 'bell' : 'bell-outline'}
            size={18}
            accessibilityLabel="TagChat"
            // onPress={() => history.push('/notes')}
            // {...commonProps}
          />
</View>
      </View>
      <Header route={route} />

      <View style={{ margin: 15 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 20 }}>
              <Card.Title title="Card Title" subtitle="Card Subtitle" />
              <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          )}
        />
      </View>
      <FloatingButton onPress={onShowPopUp} icon={"plus"} />
      <BottomPopUp
        ref={(target) => (popUpRef = target)}
        onTouchOutside={onClosePopUp}
      >
        {
          <FlatList
            numColumns={2}
            data={buttonData}
            width="100%"
            style={{ marginTop: 20, marginBottom: 30 }}
            renderItem={({ item }) => {
              return (
                <View style={styles.btnCont}>
                  <Button
                    style={styles.button}
                    onPress={() => onIconClick(item)}
                  >
                    <Text style={styles.btnText}>{item.buttonTitle}</Text>
                  </Button>
                </View>
              );
            }}
          />
        }
      </BottomPopUp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  newsCont: {
    alignItems: "center",
    marginTop: 18,
  },
  newsText: {
    fontSize: 16,
    fontWeight: "600",
  },
  btnCont: {
    flexDirection: "row",
    width: "55%",
    padding: "2%",
  },
  button: {
    width: "81%",
    // backgroundColor: "#e1f6ff",
    borderRadius: 5,
  },
  btnText: {
    // color: "#00abf0",
    fontWeight: "600",
    fontSize: 18,
  },
  AddText: {
    fontSize: 20,
    fontWeight: "700",
    color: "gray",
  },
});

export default HomeScreen;
