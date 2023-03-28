//create by : Arnab
// create on : 10.3.23

import { useContext, useEffect, useState } from "react";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import { assignUserSection, assignUserSite, CreateSection } from "../../services/CreateSectionServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import Category from "../../components/DropDownBox";
import { Text, View } from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import AppContext from "../../context/AppContext";


export default function AssignUserSection(props) {
    const navigation = useNavigation();
    const context = useContext(AppContext);
    const [section, setsection] = useState([]);
    const [sectionId, setsectionId] = useState("");
    const [sectionName, setsectionName] = useState(null);
    const [loading, setLoding] = useState(false);

    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({})
    const[sectionDropDown,setSectionDropDown]=useState()

    const validation = () => {
        if (sectionName === null || sectionName.trim().length === 0) {
            setIsError({ sectionName: true })
            setErrorMessage({ sectionName: "Choose any Section" })
            return false;
        }
        return true;
    };

    const getData = async () => {
        getSection().then((res) => {
            let section = res.map((item) => {
                return {
                    id: item.seciton_id,
                    name: item.section_name
                }
            })
            setsection(section);
            setLoding(false);
        }).catch((err) => console.log(err))
    };

    const handlesection = (item) => {
        setsectionName(item.map((u) => u.name).join(", "));
        setsectionId(item.map((u) => u.id));
        setSectionDropDown(!sectionDropDown)
    };

    useEffect(() => {
        setLoding(true)
        getData()
    }, [])

    const addSectionData = () => {
        if (validation()) {
            let obj = {
                user_id: context.userDetails.user.user_id,
                site_id: sectionId
            }
            setLoding(true)
            assignUserSection(obj).then((res) => {
                console.log(res);
                alert("Added Successfully");
                navigation.goBack();
            }).catch((err) => {
                console.log(err);
                alert("Something went wrong!!");
            }).finally(() => {
                setLoding(false);
            });
        }
    }

    const SetDropDown = (data) => {
        // console.log("DRop*************************", data)
        setSectionDropDown(data)
    }
    return (
        <>
            <CustomForm header={true} title={"Assign User Section"} onPress={addSectionData}>
                <Loader visible={loading} />
                 <InputBox
                        editable={false}
                        inputLabel="Section Name"
                        value={sectionName}
                        placeholder="Select Section Name"
                        rightElement="chevron-down"
                        DropDown={SetDropDown}
                        errors={errorMessage.sectionName}
                        isError={isError.sectionName}
                    />
            </CustomForm>
            {sectionDropDown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={section}
                        onCatPress={handlesection}
                        heading={"Choose Section"}
                        userType={"admin"}
                        navigation={props.navigation}
                        permission={"Yes"}
                        screen={"AddCategory"}
                        isMulti={false}
                    />
                </View>
            ) : null}
          
        </>
    );
}
