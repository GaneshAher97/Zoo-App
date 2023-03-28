
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import { StyleSheet, Text,View,FlatList,} from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import { AddEnclosure, editEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import AppContext from "../../context/AppContext";
import InputBox from "../../components/InputBox";
import CheckBox from "../../components/CheckBox";
import { getEnclosureService } from "../../services/SettingEnclosure";
import FloatingButton from "../../components/FloatingButton";
import { BottomPopUp } from "../../components/BottomSheet";
import DatePicker from "../../components/DatePicker";
import { data } from "../../configs/Config";
import { BottomSheet } from "../../configs/Config";

const EntityItem = [

    {
        id: 1,
        name: "Preselected"

    },
    {
        id: 2,
        name: "Auto completed"
    }
]

const Manner = [
    {
        id: 1,
        name: "Euthanasia",

    },
    {
        id: 2,
        name: "Natural",
    },
    {
        id: 3,
        name: "Indeterminate",

    },
    {
        id: 4,
        name: "Undeterminated",

    },
    {
        id: 5,
        name: "CongentialTypes",

    },
    {
        id: 6,
        name: "Murder",

    },
    {
        id: 7,
        name: "OldAge",

    },
    {
        id: 8,
        name: "Poisoned",

    },
    {
        id: 9,
        name: "StrayAttack",

    },
    {
        id: 10,
        name: "Suspicious",

    },
    {
        id: 11,
        name: "FoulPlay",

    },
]
const CarcassCon = [
    {
        id: 1,
        name: "Fresh",

    },
    {
        id: 2,
        name: "Moderately Autolyzed",
    },
    {
        id: 3,
        name: "Not Available",

    },
    {
        id: 4,
        name: "Not Usable",

    },
    {
        id: 5,
        name: "Severely Autolized",

    },
    {
        id: 6,
        name: "Slightly Autolized",

    },
    {
        id: 7,
        name: "OldAge",

    },

]


const CarcassDis = [
    {
        id: 1,
        name: "Burial",

    },
    {
        id: 2,
        name: "IncineratED",
    },
    {
        id: 3,
        name: "Combustion",

    },
    {
        id: 4,
        name: "RenderED",

    },
    {
        id: 5,
        name: "Discarded",

    },
    {
        id: 6,
        name: "Composition",

    },
    {
        id: 7,
        name: "Slksline Hydrolysis",

    },
    {
        id: 8,
        name: "Preserved",
    },
    {
        id: 9,
        name: "Fed Out",
    },
    {
        id: 10,
        name: "Indeterminate",

    },
    {
        id: 11,
        name: "Undeterminated",

    },

]
// const Data1 = [
//     {
//       id: 1,
//       title: "First Item",
//     },
//     {
//       id: 2,
//       title: "Second Item",
//     },
// ]
// const FloatingFun =[
//     {
//         id:1,
//         name:'Yes',
//     },
//     {
//         id:2,
//         name:'No',
//     },
// ]

const Disposition = (props) => {
    const navigation = useNavigation();
    const context = useContext(AppContext);

//   comment float
    let popUpRef = React.createRef();
    const onShowPopUp = () => {
      popUpRef.show();
    };
  
  
    const onClosePopUp = (item) => {
      popUpRef.close();
    };
    const onIconClick = (item) => {
        popUpRef.close();
        navigation.navigate(item.screen);
      };


    const [date, setDate] = useState(props.route.params?.item?.user_dob ?? "");
    const [reason, setReason] = useState(props.route.params?.item?.user_death_reason ?? "");

    const [enclosure_id, SetEnclosure_id] = useState(props.route.params?.item.enclosure_id ?? "")
    const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
    const [sectionData, setSectionData] = useState([]);
    const [section, setSection] = useState(props.route.params?.item?.data ?? "");
    const [sectionId, setSectionId] = useState(props.route.params?.item?.section_id ?? "");

    const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);
    const [encEnvData, setencEnvData] = useState([])
    const [enclosureEnvironment, setEnclosureEnvironment] = useState(props.route.params?.item.enclosure_environment ?? "");
    // comment
    const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
    // comment2
    const [isEncTypeMenuOpen1, setisEncTypeMenuOpen1] = useState(false);
    // comment

    const [enclosureType, setEnclosureType] = useState(props.route.params?.item.enclosure_type ?? "");

    // comment2
    const [enclosureType1, setEnclosureType1] = useState(props.route.params?.item.enclosure_type ?? "");

    const [encTypeData, setencTypeData] = useState([])

    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [loading, setLoding] = useState(false);

    const [checked, setChecked] = useState(false);



    // drop down state===============================================================

    const [enclosureTypeDown, setEnclosureTypeDown] = useState(false)


    const onChecked = () => {
        setChecked(!checked)
        // console.log('ok');
    }
  

    const catPressed = (item) => {
        item.map((value) => { setSection(value.name) })
        // console.log('item==========>', item);
        // setSection(item.map((u) => u.name).join(", "));
        // setSectionId(item.map((id) => id.id).join(','));
        setIsSectionMenuOpen(false)
    };

    const catEnvPress = (item) => {
        item.map((value) => { setEnclosureEnvironment(value.name) })
        // setEnclosureEnvironment(item.map((u) => u.name).join(","));
        // setSectionId(item.map((id) => id.id).join(','));
        setisEncEnvMenuOpen(false);
    }

    const catEnTypePress = (item) => {
        item.map((value) => { setEnclosureType(value.name) })

        // setEnclosureType(item.map((u) => u.name).join(","))
        setisEncTypeMenuOpen(false)
    }
    const catEnTypePress1 = (item) => {
        item.map((value) => { setEnclosureType(value.name) })
        // setEnclosureType1(item.map((u) => u.name).join(","))
        setisEncTypeMenuOpen1(false)
    }

    useEffect(() => {
        getSection().then((res) => {
            let section = res.map((item) => {
                return {
                    id: item.seciton_id,
                    name: item.section_name
                }
            })
            setSectionData(section);

            // console.log(sectionData, ">>>>>>>>>>>>>>>>>>")
        })
    }, [])

    useEffect(() => {
        getEnclosureService().then((res) => {
            setencTypeData(res.data.enclosure_type);
            setencEnvData(res.data.environment_type)
        })
    }, [])

    const validation = () => {
    
         if (section.length === 0) {
            setIsError({ section: true })
            setErrorMessage({ section: "Select Entity Name" })
            return false;
        } 
        else if (reason.trim().length === 0 || !mobileRegx.test(reason)) {
			setIsError({ reason: true });
			
			setErrorMessage({ reason: "Enter  Reason" });
			return false;
        }
     
     
        else if (enclosureEnvironment.trim().length === 0) {
            setIsError({ enclosureEnvironment: true })
            setErrorMessage({ enclosureEnvironment: "Enter The Enclosure Environment" })
            return false;
        }
        else if (enclosureType.trim().length === 0) {
            setIsError({ enclosureType: true })
            setErrorMessage({ enclosureType: "Enter The Enclosure Type" })
            return false;

        }
        //    Comment2
        else if (enclosureType1.trim().length === 0) {
            setIsError({ enclosureType1: true })
            setErrorMessage({ enclosureType1: "Enter The Enclosure Type" })
            return false;

        }

        else if (date === "") {
			setIsError({ date: true });
			setErrorMessage({ date: "Select from dropdown" });
			return false;
		} 


    };

    const getEnclosureEdit = () => {
        if (validation()) {

            let obj = {
                
                section_id: sectionId,
               
                user_enclosure_id: context.userDetails.user.user_id,
               
                enclosure_environment: enclosureEnvironment,
                enclosure_incharge_id: context.userDetails.user.user_id,
                enclosure_is_movable: Number(isMovable),
                enclosure_is_walkable: Number(isWalkable),
                // comment2
                enclosure_type: enclosureType,
                enclosure_type: enclosureType1,
                user_dob: date,
                user_death_reason: reason,
              
            }
            console.log('edit obj=========', obj);
            editEnclosure(obj).then((res) => {
                alert(res.message);
            }).catch((err) => {
                console.log('error===>', err);
            }).finally(() => {
                navigation.goBack();
            })
        }
    }

    const getEnclosureFormData = () => {
        if (validation()) {
            let obj = {
               
                section_id: sectionId,
                
                user_enclosure_id: context.userDetails.user.user_id,
                
                enclosure_environment: enclosureEnvironment,
                enclosure_incharge_id: context.userDetails.user.user_id,
                enclosure_is_movable: Number(isMovable),
                enclosure_is_walkable: Number(isWalkable),
                // comment2
                enclosure_type: enclosureType,
                enclosure_type: enclosureType1,
              
            }

            setLoding(true)
            AddEnclosure(obj).then((res) => {
                console.log("response=============", res);
                alert(res.message)
            }).finally(() => {
                setLoding(false);
                navigation.goBack();
                alert("EnclosureForm Added Successfully");
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    const SetDropDown = (data) => {
        // console.log("DRop*************************", data)
        setIsSectionMenuOpen(data)
        setisEncEnvMenuOpen(false)
        setisEncTypeMenuOpen(false)
    }
    const SetDropDown1 = (data) => {
        // console.log("DRop*************************", data)
        setIsSectionMenuOpen(data)
        setisEncEnvMenuOpen(false)
        setisEncTypeMenuOpen1(false)
    }





    const SetEnvTypeDropDown = (data) => {
        setisEncEnvMenuOpen(data)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen(false)
        setisEncTypeMenuOpen1(false)
    }

    // comment2
    const SetEncTypeDropDown = (data) => {
        setisEncTypeMenuOpen(data)

        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
    }
    const SetEncTypeDropDown1 = (data) => {
        setisEncTypeMenuOpen1(data)
        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
    }

    // console.log('drop down=======>',);

    return (
        <>
            {loading ? <Loader /> : <CustomForm header={true} title={enclosure_id > 0 ? "Edit Enclosure" : "Add Disposition"} marginBottom={60} onPress={enclosure_id > 0 ? getEnclosureEdit : getEnclosureFormData}>


                <InputBox
                    inputLabel={"Entity Name"}
                    placeholder={"Choose Entity Name"}
                    editable={false}
                    value={section}

                    // defaultValue={section != null ? section : null}

                    DropDown={SetDropDown}
                    rightElement={isSectionMenuOpen ? "chevron-up" : "chevron-down"}
                    errors={errorMessage.section}
                    isError={isError.section}
                />
                	<DatePicker
						today={date}
						onChange={(item) => {
							let today = item.toJSON().slice(0, 10);
							setDate(today);
						}}
						title="DOB"
					/>
                    

                <InputBox
                    inputLabel={"Manner of Death"}
                    placeholder={"Manner of Death"}
                    editable={false}
                    value={enclosureEnvironment}

                    // defaultValue={enclosureEnvironment != null ? enclosureEnvironment : null}

                    rightElement={isEncEnvMenuOpen ? "chevron-up" : "chevron-down"}
                    DropDown={SetEnvTypeDropDown}
                    errors={errorMessage.enclosureEnvironment}

                    isError={isError.enclosureEnvironment}
                />


                <InputBox
                    inputLabel={"Reason for Death"}
                    placeholder={"Reason for Death"}
                    editable={true}
                 
                    onChange={(val) => {
                        setReason(val);
                    }}
                    
                    multiline={true}
                    numberOfLines={3}
                    errors={errorMessage.reason}
                    isError={isError.reason}
                />



                <InputBox
                    inputLabel={"Carcass condition"}
                    // placeholder={"Choose enclosure type"}
                    editable={false}
                    value={enclosureType}
                    // defaultValue={enclosureType != null ? enclosureType : null}
                    rightElement={isEncTypeMenuOpen ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown}
                    errors={errorMessage.enclosureType}
                    isError={isError.enclosureType}
                />

                <InputBox
                    inputLabel={"Carcass Disposition"}
                    // placeholder={"Choose enclosure type"}
                    editable={false}
                    value={enclosureType1}
                    // defaultValue={enclosureType1 != null ? enclosureType1 : null}
                    rightElement={isEncTypeMenuOpen1 ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown1}
                    errors={errorMessage.enclosureType1}
                    isError={isError.enclosureType1}
                />
                <InputBox
                    inputLabel={"Notes"}
                    placeholder={"Notes"}
                    editable={true}
                   
                    onChange={(val) => {
                        setReason(val);
                    }}
                    multiline={true}
                    numberOfLines={2}
                    errors={errorMessage.reason}
                    isError={isError.reason}
                />

            </CustomForm>
            }
            {isSectionMenuOpen ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={EntityItem}
                        onCatPress={catPressed}
                        heading={"Choose Entity"}
                        isMulti={false}
                    />
                </View>
            ) : null}
            {isEncEnvMenuOpen ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={Manner}
                        onCatPress={catEnvPress}
                        heading={"Choose Manner of Death"}
                        isMulti={false}
                    />
                </View>
            ) : null}

            {isEncTypeMenuOpen ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={CarcassCon}
                        onCatPress={catEnTypePress}
                        heading={"Choose Carcass condition"}
                        isMulti={false}
                    />
                </View>
            ) : null}

            {isEncTypeMenuOpen1 ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={CarcassDis}
                        onCatPress={catEnTypePress1}
                        heading={"Choose Carcass Disposition"}
                        isMulti={false}
                    />
                </View>
            ) : null}
           
        <FloatingButton onPress={onShowPopUp} icon={"plus"} />
        
        <BottomPopUp
        ref={(target) => (popUpRef = target)}
        onTouchOutside={onClosePopUp}
      >
        {
               
          <FlatList
            numColumns={2}
            
           
            
          data={BottomSheet}

            width="100%"
            style={{ marginTop: 50, marginBottom: 30 }}
            renderItem={({ item }) => {
              return (
                 <View style={Styles.btnCont}>
               
                  <Button
                    style={Styles.button}
                    onPress={() => onIconClick(item)}
                  >
                   <Text style={Styles.btnText}>{item.buttonTitle}</Text>
                    
                     
                     
                  </Button>
                </View>
              );
            }}
          />
        }
      </BottomPopUp> 
      
        </>
    );
};
const Styles = StyleSheet.create({
    Label: {
        // top: "3%",
        marginTop: 20,
        fontSize: 5,
        fontWeight: "200",
    },
    btnCont: {
        flexDirection: "row",
        width: "55%",
        padding: "2%",
      },
    btnText: {
        // color: "#00abf0",
        fontWeight: "600",
        fontSize: 18,
      },
      button: {
        width: "81%",
        // backgroundColor: "#e1f6ff",
        borderRadius: 5,
      },
});
export default Disposition;