//create by : Arnab
// create on : 10.3.23

import { useContext, useEffect, useState } from "react";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import { assignUserSite, CreateSection } from "../../services/CreateSectionServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import Category from "../../components/DropDownBox";
import { Text, View } from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import AppContext from "../../context/AppContext";


export default function AssignUserSite() {
    const navigation = useNavigation();
    const context = useContext(AppContext);
    const [sites, setSites] = useState([]);
    const [sitesId, setSitesId] = useState("");
    const [sitesName, setSitesName] = useState(null);
    const [loading, setLoding] = useState(false);

    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({})
    const [siteDropDown, setSiteDropDown] = useState()

    const validation = () => {
        if (sitesName === null || sitesName.trim().length === 0) {
            setIsError({ sitesName: true })
            setErrorMessage({ sitesName: "Choose any Site" })
            return false;
        }
        return true;
    };

    const getData = async () => {
        getSection().then((res) => {
            let sites = res.map((item) => {
                return {
                    id: item.seciton_id,
                    name: item.section_name
                }
            })
            setSites(sites);
            setLoding(false);
        }).catch((err) => console.log(err))
    };

    const handleSites = (item) => {
        setSitesName(item.map((u) => u.name).join(", "));
        setSitesId(item.map((u) => u.id));
        // setSiteDropDown(!siteDropDown)
    };

    useEffect(() => {
        setLoding(true)
        getData() 
    }, [])

    const addSectionData = () => {
        if (validation()) {
            let obj = {
                user_id: context.userDetails.user.user_id,
                site_id: sitesId
            }
            setLoding(true)
            assignUserSite(obj).then((res) => {
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
        setSiteDropDown(data)
    }

    return (
        <>
            <CustomForm header={true} title={"Assign User Sites"} onPress={addSectionData}>
                <Loader visible={loading} />
                <InputBox
                    editable={false}
                    inputLabel="Section Name"
                    value={sitesName}
                    placeholder="Select Section Name"
                    rightElement={siteDropDown ?"chevron-up" :"chevron-down"}
                    DropDown={SetDropDown}
                    errors={errorMessage.sitesName}
                    isError={isError.sitesName}
                />
            </CustomForm>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                {siteDropDown ? (
                    <Category
                        categoryData={sites}
                        onCatPress={handleSites}
                        heading={"Choose Sites"}
                        isMulti={true}
                    />) 
                    : null}
            </View>
        </>
    );
}

