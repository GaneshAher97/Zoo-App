import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import { StyleSheet, Text, View, FlatList, } from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import { AddEnclosure, editEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import AppContext from "../../context/AppContext";
import InputBox from "../../components/InputBox";

import { getEnclosureService } from "../../services/SettingEnclosure";
import FloatingButton from "../../components/FloatingButton";
import { BottomPopUp } from "../../components/BottomSheet";
import DatePicker from "../../components/DatePicker";
import { data } from "../../configs/Config";
import { BottomSheet } from "../../configs/Config";
import { carcassCondition, carcassDisposition, mannerOfDeath } from "../../services/DispositionService";

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

// const Manner = [
//     {
//         id: 1,
//         name: "Euthanasia",

//     },
//     {
//         id: 2,
//         name: "Natural",
//     },
//     {
//         id: 3,
//         name: "Indeterminate",

//     },
//     {
//         id: 4,
//         name: "Undeterminated",

//     },
//     {
//         id: 5,
//         name: "CongentialTypes",

//     },
//     {
//         id: 6,
//         name: "Murder",

//     },
//     {
//         id: 7,
//         name: "OldAge",

//     },
//     {
//         id: 8,
//         name: "Poisoned",

//     },
//     {
//         id: 9,
//         name: "StrayAttack",

//     },
//     {
//         id: 10,
//         name: "Suspicious",

//     },
//     {
//         id: 11,
//         name: "FoulPlay",

//     },
// ]
// const CarcassCon = [
//     {
//         id: 1,
//         name: "Fresh",

//     },
//     {
//         id: 2,
//         name: "Moderately Autolyzed",
//     },
//     {
//         id: 3,
//         name: "Not Available",

//     },
//     {
//         id: 4,
//         name: "Not Usable",

//     },
//     {
//         id: 5,
//         name: "Severely Autolized",

//     },
//     {
//         id: 6,
//         name: "Slightly Autolized",

//     },
//     {
//         id: 7,
//         name: "OldAge",

//     },

// ]





// const CarcassDis = [
//     {
//         id: 1,
//         name: "Burial",

//     },
//     {
//         id: 2,
//         name: "IncineratED",
//     },
//     {
//         id: 3,
//         name: "Combustion",

//     },
//     {
//         id: 4,
//         name: "RenderED",

//     },
//     {
//         id: 5,
//         name: "Discarded",

//     },
//     {
//         id: 6,
//         name: "Composition",

//     },
//     {
//         id: 7,
//         name: "Slksline Hydrolysis",

//     },
//     {
//         id: 8,
//         name: "Preserved",
//     },
//     {
//         id: 9,
//         name: "Fed Out",
//     },
//     {
//         id: 10,
//         name: "Indeterminate",

//     },
//     {
//         id: 11,
//         name: "Undeterminated",

//     },

// ]
const Necropsy = [
    {
        id: 1,
        name: "Yes",

    },
    {
        id: 2,
        name: "No",
    },
]


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

    const [reason, setReason] = useState(props.route.params?.item?.death_reason ?? "");
    const [note, setNotes] = useState(props.route.params?.item?.user_notes ?? "");

    const [enclosure_id, SetEnclosure_id] = useState(props.route.params?.item.enclosure_id ?? "")
    const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

    const [entityData, setEntityData] = useState([]);


    const [entity, setEntity] = useState(props.route.params?.item?.data ?? "");

    const [entityId, setEntityId] = useState(props.route.params?.item?.entity_id ?? "");

    const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);
    const [encEnvData, setencEnvData] = useState([])

    // manner of death
    const [mannerDeath, setMannerDeath] = useState(props.route.params?.item.manner_death ?? "");
    const [mannerData, setMannerData] = useState([]);
    const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
    const [isEncTypeMenuOpen1, setisEncTypeMenuOpen1] = useState(false);
    // necropsy
    const [isEncTypeMenuOpen2, setisEncTypeMenuOpen2] = useState(false);
    // carcass condition
    const [condition, setCondition] = useState(props.route.params?.item?.condition_type ?? "");
    const [conditionData, setConditionData] = useState([]);
    // carcass disposition
    const [disposition, setDisposition] = useState(props.route.params?.item.disposition_type ?? "");
    const [dispositionData, setDispositionData] = useState([]);
    // necropsy

    const [necropsy, setNecropsy] = useState(props.route.params?.item.necropsy_type ?? "");

    const [encTypeData, setencTypeData] = useState([])

    const [isError, setIsError] = useState({});

    const [errorMessage, setErrorMessage] = useState({});

    const [loading, setLoding] = useState(false);




    // drop down state===============================================================

    const [enclosureTypeDown, setEnclosureTypeDown] = useState(false)
    const catPressed = (item) => {
        item.map((value) => { setEntity(value.name) })
        // console.log('item==========>', item);
        // setSection(item.map((u) => u.name).join(", "));
        // setSectionId(item.map((id) => id.id).join(','));
        setIsSectionMenuOpen(false)
    };

    // map manner of death

    const catEnvPress = (item) => {
        //  item.map((value) => { setMannerDeath(value.name) });
        setMannerDeath(item.map((u) => u.name).join(","));

        setisEncEnvMenuOpen(false);
    }
    //  carcass condition
    const catEnTypePress = (item) => {
        // item.map((value) => { setCondition(value.name) })

        setCondition(item.map((u) => u.name).join(","));
        setisEncTypeMenuOpen(false)
    }
    //  carcass disposition
    const catEnTypePress1 = (item) => {

        setDisposition(item.map((u) => u.name).join(","));

        setisEncTypeMenuOpen1(false)
    }

    // Necropsy
    const catEnTypePress2 = (item) => {
        item.map((value) => { setNecropsy(value.name) })
        // setEnclosureType1(item.map((u) => u.name).join(","))
        setisEncTypeMenuOpen2(false)
    }
    // mannner of the date
    useEffect(() => {
        mannerOfDeath().then((res) => {
            setMannerData(res.data);
        })
    }, [])

    // carcass condition 
    useEffect(() => {


        carcassCondition().then((res) => {
            setConditionData(res.data);
        })

    }, [])



    // setDispositionData
    useEffect(() => {
        carcassDisposition().then((res) => {
            setDispositionData(res.data);
        })

    }, [])
    useEffect(() => {
        getEnclosureService().then((res) => {
            setencTypeData(res.data.condition_type);
            setencEnvData(res.data.environment_type)
        })
    }, [])

    const validation = () => {

        if (entity.length === 0) {
            setIsError({ entity: true })
            setErrorMessage({ entity: "Select Entity Name" })
            return false;
        }
        else if (date === "") {
            setIsError({ date: true });
            setErrorMessage({ date: "Select from dropdown" });
            return false;
        }
        else if (mannerDeath.trim().length === 0) {
            setIsError({ mannerDeath: true })
            setErrorMessage({ mannerDeath: "Enter The Manner of Death" })
            return false;
        }

        else if (reason.trim().length === 0) {
            setIsError({ reason: true });

            setErrorMessage({ reason: "Enter  Reason of Death" });
            return false;
        }
        else if (condition.trim().length === 0) {
            setIsError({ condition: true })
            setErrorMessage({ condition: "Select Carcoss Condition" })
            return false;

        }
        else if (disposition.trim().length === 0) {
            setIsError({ disposition: true })
            setErrorMessage({ disposition: "Select Carcoss Dispostion" })
            return false;

        }

        else if (note.trim().length === 0) {
            setIsError({ note: true });

            setErrorMessage({ note: "Enter notes" });
            return false;
        }
        // necropsy

        else if (necropsy.trim().length === 0) {
            setIsError({ necropsy: true })
            setErrorMessage({ necropsy: "Select necropsy" })
            return false;

        }
        return true;
    };

    const getEnclosureEdit = () => {
        if (validation()) {

            let obj = {
                entity_id: entityId,
                manner_death: mannerDeath,
                condition_type: condition,
                disposition_type: disposition,
                // necropsy
                necropsy_type: necropsy,
                user_dob: date,
                death_reason: reason,
                user_notes: note,

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

                entity_id: entityId,

                user_enclosure_id: context.userDetails.user.user_id,

                manner_death: mannerDeath,

                condition_type: condition,
                disposition_type: disposition,
                necropsy_type: necropsy,


            }

            setLoding(true)
            AddEnclosure(obj).then((res) => {
                console.log("response=============", res);
                alert(res.message)
            }).finally(() => {
                setLoding(false);
                navigation.goBack();
                alert("DispositionForm Added Successfully");
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

    const SetDropDown2 = (data) => {
        // console.log("DRop*************************", data)
        setIsSectionMenuOpen(data)
        setisEncEnvMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen2(false)

    }
    const SetEnvTypeDropDown = (data) => {
        setisEncEnvMenuOpen(data)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen2(false)
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
    const SetEncTypeDropDown2 = (data) => {
        setisEncTypeMenuOpen2(data)
        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
    }


    // console.log('drop down=======>',);

    return (
        <>
            {loading ? <Loader /> : <CustomForm header={true} title={"Add Disposition"} marginBottom={60} onPress={getEnclosureFormData}>


                <InputBox
                    inputLabel={"Entity Name"}
                    placeholder={"Choose Entity Name"}
                    editable={false}
                    value={entity}

                    // defaultValue={section != null ? section : null}

                    DropDown={SetDropDown}
                    rightElement={isSectionMenuOpen ? "chevron-up" : "chevron-down"}
                    errors={errorMessage.entity}
                    isError={isError.entity}
                />
                <DatePicker
                    today={date}
                    onChange={(item) => {
                        let today = item.toJSON().slice(0, 10);
                        setDate(today);
                    }}
                    title="DATE"
                />


                <InputBox
                    inputLabel={"Manner of Death"}
                    placeholder={"Manner of Death"}
                    editable={false}
                    value={mannerDeath}

                    // defaultValue={enclosureEnvironment != null ? enclosureEnvironment : null}

                    rightElement={isEncEnvMenuOpen ? "chevron-up" : "chevron-down"}
                    DropDown={SetEnvTypeDropDown}
                    errors={errorMessage.mannerDeath}

                    isError={isError.mannerDeath}
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
                    value={condition}
                    // defaultValue={enclosureType != null ? enclosureType : null}
                    rightElement={isEncTypeMenuOpen ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown}
                    errors={errorMessage.condition}
                    isError={isError.condition}

                    keyboardType={"default"}
                />

                <InputBox
                    inputLabel={"Carcass Disposition"}
                    // placeholder={"Choose enclosure type"}
                    editable={false}
                    value={disposition}
                    // defaultValue={enclosureType1 != null ? enclosureType1 : null}
                    rightElement={isEncTypeMenuOpen1 ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown1}
                    errors={errorMessage.disposition}
                    isError={isError.disposition}
                />
                <InputBox
                    inputLabel={"Notes"}
                    placeholder={"Notes"}
                    editable={true}

                    onChange={(val) => {
                        setNotes(val);
                    }}
                    multiline={true}
                    numberOfLines={2}
                    errors={errorMessage.note}
                    isError={isError.note}
                />

                {/* Necropsy Submitted */}

                <InputBox
                    inputLabel={"Necropsy"}
                    // placeholder={"Choose enclosure type"}
                    editable={false}
                    value={necropsy}

                    // defaultValue={enclosureType1 != null ? enclosureType1 : null}

                    rightElement={isEncTypeMenuOpen2 ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown2}
                    errors={errorMessage.necropsy}
                    isError={isError.necropsy}
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
                        categoryData={mannerData}
                        onCatPress={catEnvPress}
                        heading={"Choose Manner of Death"}
                        isMulti={false}
                    />
                </View>
            ) : null}

            {isEncTypeMenuOpen ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={conditionData}
                        onCatPress={catEnTypePress}
                        heading={"Choose Carcass condition"}
                        isMulti={false}
                    />
                </View>
            ) : null}

            {isEncTypeMenuOpen1 ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={dispositionData}
                        onCatPress={catEnTypePress1}
                        heading={"Choose Carcass Disposition"}
                        isMulti={false}
                    />
                </View>
            ) : null}

            { /* Necropsy Submitted */}


            {isEncTypeMenuOpen2 ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={Necropsy}
                        onCatPress={catEnTypePress2}
                        heading={"Choose Necropsy "}
                        isMulti={false}
                    />
                </View>
            ) : null}

            {/* <FloatingButton onPress={onShowPopUp} icon={"plus"} />

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
            </BottomPopUp> */}

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