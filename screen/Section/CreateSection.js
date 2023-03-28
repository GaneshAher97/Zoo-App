//create by:Gaurav Shukla
// create on :1/03/2023

import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import { MaterialIcons } from '@expo/vector-icons';
import { CreateSection } from "../../services/CreateSectionServices";
import Loader from "../../components/Loader";
import { TouchableOpacity,View } from "react-native";
import { useSelector} from "react-redux";




export default function CreateSectionForm() {
    const navigation = useNavigation()
    const [sectionName, setSectionName] = useState("");
    const [sectionCode, setSectionCode] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [loading, setLoding] = useState(false);
    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({})
    const zooID = useSelector(state => state.UserAuth.zoo_id)

    const validation = () => {
        if (sectionName.trim().length === 0) {
            setIsError({ sectionName: true })
            setErrorMessage({ sectionName: "Enter The Name" })
            return false;
        } else if (sectionCode.trim().length === 0) {
            setIsError({ sectionCode: true })
            setErrorMessage({ sectionCode: "Enter The Code" })
            return false;
        } else if (longitude.trim().length === 0) {
            setIsError({ longitude: true })
            setErrorMessage({ longitude: "Enter The longitude" })
            return false;
        } else if (latitude.trim().length === 0) {
            setIsError({ latitude: true })
            setErrorMessage({ latitude: "Enter The latitude" })
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        setLoding(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude.toString());
        setLatitude(location.coords.latitude.toString());
        setLoding(false);
    };
    // console.log(longitude,"********")

    const getSectionData = () => {
        if (validation()) {
            let obj = {
                section_name: sectionName,
                section_code: sectionCode,
                zoo_id: zooID,
                section_latitude: latitude,
                section_longitude: longitude,
                zone_id: 1,
                site_id: 1
            }
            // console.log(obj, ">>>>>>>>>>>");
            setLoding(true)
            CreateSection(obj).then((res) => {
                // console.log("hello this is response by gaurav--->>>>", res);
            }).finally(() => {
                setLoding(false);
                navigation.navigate("ListSection");
                alert("CreateSection Added Successfully");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <>
            {loading ? <Loader /> :
                <CustomForm header={true} title={"Add Section"} onPress={getSectionData}>
                    <InputBox
                        inputLabel={"Name"}
                        placeholder={"Enter Name"}
                        errors={errorMessage.sectionName}
                        isError={isError.sectionName}
                        onChange={(value) => setSectionName(value)}
                        value={sectionName}
                    />
                    <InputBox
                        inputLabel={"Code"}
                        placeholder={"Enter Code"}
                        keyboardType={"numeric"}
                        errors={errorMessage.sectionCode}
                        isError={isError.sectionCode}
                        onChange={(value) => setSectionCode(value)}
                        value={sectionCode}
                    />
                    <InputBox
                        inputLabel={"longitude"}
                        placeholder={"longitude"}
                        keyboardType={"numeric"}
                        value={longitude}
                        errors={errorMessage.longitude}
                        isError={isError.longitude}
                        onChange={(value) => setLongitude(value)}
                    />
                    <TouchableOpacity style={{
                        width: "7%", alignItems: "center",
                        marginHorizontal: "90%", bottom: "15%"
                    }} onPress={getLocation}>
                        <MaterialIcons name="my-location" size={23} color="grey" />
                    </TouchableOpacity>

                    <View style={{ bottom: 13 }}>
                        <InputBox
                            inputLabel={"latitude"}
                            placeholder={"latitude"}
                            keyboardType={"numeric"}
                            errors={errorMessage.latitude}
                            isError={isError.latitude}
                            value={latitude}
                            onChange={(value) => setLatitude(value)}
                        />
                        
                        <TouchableOpacity style={{
                            width: "7%", alignItems: "center",
                            marginHorizontal: "90%", bottom: "45%"
                        }}
                            onPress={getLocation}
                        >
                            <MaterialIcons name="my-location" size={23} color="grey" />
                        </TouchableOpacity>
                    </View>
                </CustomForm>
            }
        </>
    );
}
