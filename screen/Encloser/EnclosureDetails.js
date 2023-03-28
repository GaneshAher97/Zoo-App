import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { GetDetailesEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import Header from "../../components/Header";

const { width, height } = Dimensions.get("window");

const EnclosureDetails = ({ route }) => {
  const [loading, setLoding] = useState(false)
  const [enclosuredata, setEnclosureData] = useState([]);

  let itemId = route.params;
  useEffect(() => {
    setLoding(true);
    GetDetailesEnclosure({ itemId: itemId })
      .then((res) => {
        setEnclosureData(res.data);
      }).finally(() => {
        setLoding(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
    <>
      {loading ? (
        <Loader loaderSize={"lg"} />
      ) : (
        <View style={styles.container}>

          <View>
            <Header title="Enclosure Details" noIcon={true} />
            <View
              style={[
                styles.innerContainer

              ]}
            >
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>
                  Id:
                </Text>
                <Text>{`#${enclosuredata.enclosure_id}`}</Text>
              </View>
              {/* <Text style={styles.idNumber}>{data.status}</Text> */}
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>
                  Name:
                </Text>
                <Text>{enclosuredata.user_enclosure_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>
                  Code:
                </Text>
                <Text>{enclosuredata.enclosure_code}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>
                  Descripation :
                </Text>
                <Text>{enclosuredata.enclosure_desc}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Environment :</Text>
                <Text>{enclosuredata.enclosure_environment}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Sunlite :</Text>
                <Text>{enclosuredata.enclosure_sunlight}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Created at :</Text>
                <Text>{enclosuredata.created_at}</Text>
              </View>
            </View>
          </View>

        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
    alignItems: "center",
  },

  innerContainer: {
    backgroundColor: "rgba(100,100,100,0.2)",
    alignItems: "center",
    padding: 8,
    marginVertical: 20,
    marginHorizontal: "10%",
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: "space-evenly",
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    // backgroundColor:'red',
    width: width * 0.8,
    justifyContent: "space-between",
    // marginHorizontal:20
  },
});

export default EnclosureDetails;
