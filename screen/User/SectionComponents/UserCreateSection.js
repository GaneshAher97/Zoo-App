
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import CustomForm from '../../../components/CustomForm'
import Loader from '../../../components/Loader'
import { CreateSectionData, EditSectionData } from '../../../services/AllSectionApis'
import { getSection } from '../../../services/staffManagement/getEducationType'
import NewDropdown from '../../../components/Dropdown'
import InputBox from '../../../components/InputBox'
import { View } from 'react-native'
import Category from '../../../components/DropDownBox'


const items = [
    {
        category_id: 1,
        category_name: "FullAccess",
        category_type: 1,
        isExpanded: true,
        subcategory: [
            {
                id: 0,
                val: "No",
            },
            {
                id: 1,
                val: "Yes",
            },

        ],
    },
]

const activeitem = [{
    category_id: 1,
    category_name: "Active",
    category_type: 1,
    isExpanded: true,
    subcategory: [
        {
            id: 0,
            val: "No",
        },
        {
            id: 1,
            val: "Yes",
        },

    ],
},
]


const UserCreateSection = (props) => {
    const navigation = useNavigation();
    const [fullAccess, setFullAccess] = useState(props.route.params?.item.full_access ?? "");
    const [sectionName, setSectionName] = useState(props.route.params?.item.section_name ?? "");
    const [id, setId] = useState(props.route.params?.item.section_id ?? "");
    const [active, setActive] = useState(props.route.params?.item.active ?? "");
    const [loading, setLoding] = useState("");
    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [sectionDropDown, setSectionDropDown] = useState("");
    const [sectionData, setSectionData] = useState([]);


    const catPressed = (item) => {
        setSectionName(item.map((u) => u.name).join(", "));
        setId(item.map((id) => id.id).join(','));
        setSectionDropDown(!sectionDropDown)
    }
    const validation = () => {
        if (fullAccess.length === 0) {
            setIsError({ fullAccess: true })
            setErrorMessage({ fullAccess: "Select Full Access Options" })
            return false;
        } else if (id.length === 0) {
            setIsError({ id: true })
            setErrorMessage({ id: "Select Section Options" })
            return false;
        } else if (active.length === 0) {
            setIsError({ active: true })
            setErrorMessage({ active: "Select Active Options" })
            return false;
        }
        return true;
    };
    useEffect(() => {
        getSection().then((res) => {
            let getdata = res.map((item) => {
                return {
                    id: item.seciton_id,
                    name: item.section_name
                }
            })
            setSectionData(getdata);
            // console.log("****************SectionData", sectionData)
        })
    }, [])

    const PostSectionData = () => {
        if (validation()) {
            let obj = {
                full_access: fullAccess,
                section_id: id,
                active: active,
                user_id: 1
            }
            // console.log("****obj data", obj)
            setLoding(true);
            CreateSectionData(obj).then((res) => {
                // console.log("hello this is response--->>>>", res)
                setLoding(false);
                if (res.success) {
                    navigation.goBack();
                    alert("Added Successfully");
                } else {
                    alert("Something went wrong");
                }
            }).catch((err) => {
                console.log(err, "Validation error");
            });
        }

    }

    const getFullAccessData = (item) => {
        const accessdata = item.id
        setFullAccess(accessdata)
    }

    const getActiveData = (item) => {
        const activeData = item.id
        setActive(activeData)
    }

    const editOnSubmit = () => {
        if (validation()) {
            var obj = {
                // id: id,
                full_access: fullAccess,
                section_id: id,
                active: active,
            }
            setLoding(true);
            EditSectionData(obj).then((res) => {
                console.log('edit data=======>', res);
            }).catch((err) => {
                console.log('error===>', err);
            }).finally(() => {
                setLoding(false);
                Alert.alert('Data update successfully');
                navigation.goBack();
            })
        }
    }

    const SetDropDown = (data) => {
        setSectionDropDown(data)
    }

    return (
        <>
            {loading ? <Loader /> : <CustomForm header={true} title={"Add Section "}
                onPress={PostSectionData}>
                <NewDropdown
                    title="FullAccess"
                    data={items}
                    afterPressDropdown={getFullAccessData}
                    errors={errorMessage.fullAccess}
                    isError={isError.fullAccess}
                />
                <View style={{ marginTop: 20 }}>
                    <InputBox
                        editable={false}
                        inputLabel="Section Name"
                        value={sectionName}
                        placeholder="Select Section Name"
                        rightElement="chevron-down"
                        DropDown={SetDropDown}
                        errors={errorMessage.id}
                        isError={isError.id}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <NewDropdown
                        title="Active"
                        data={activeitem}
                        afterPressDropdown={getActiveData}
                        errors={errorMessage.active}
                        isError={isError.active}
                    />
                </View>
            </CustomForm>}
            {sectionDropDown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={sectionData}
                        onCatPress={catPressed}
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

    )
}
export default UserCreateSection;
const Styles = StyleSheet.create({
    Label: {
        // top: "3%",
        marginTop: 20,
        fontSize: 5,
        fontWeight: "200",
    },
});


