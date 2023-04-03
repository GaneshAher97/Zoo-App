// whole component Created  by Ganesh 
// Date:- 31 March 2023


import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import { StyleSheet, Text, View, FlatList, } from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import { AddEnclosure, editEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../context/AppContext";
import InputBox from "../../components/InputBox";

import DatePicker from "../../components/DatePicker";
import { data } from "../../configs/Config";
import { BottomSheet } from "../../configs/Config";
import { carcassCondition, carcassDisposition, getAnimal, mannerOfDeath } from "../../services/DispositionService";
import moment from "moment";
import { addanimalmortality } from "../../services/AddDispositioService";



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

const Necropsy = [
    {
        id: true,
        name: "Yes",

    },
    {
        id: false,
        name: "No",
    },
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



const Disposition = (props) => {

    const navigation = useNavigation();

    const context = useContext(AppContext);

    const [encEnvData, setencEnvData] = useState([])
    const [encTypeData, setencTypeData] = useState([])

    const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
    const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);

    const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
    const [isEncTypeMenuOpen1, setisEncTypeMenuOpen1] = useState(false);
    const [isEncTypeMenuOpen2, setisEncTypeMenuOpen2] = useState(false);

    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    // Entity
    const [entity, setEntity] = useState(props.route.params?.item?.data ?? "");
    const [entityData, setEntityData] = useState([]);
    const [entityId, setEntityId] = useState(props.route.params?.item?.entity_id ?? "");

    // date
    const [date, setDate] = useState(props.route.params?.item?.user_dob ?? new Date());
    // const [currentDate, setCurrentDate] = useState(new Date());

    // manner of death
    const [mannerDeath, setMannerDeath] = useState(props.route.params?.item.manner_death ?? "");
    const [mannerDeathId, setMannerDeathId] = useState(props.route.params?.item?.manner_of_death ?? "");
    const [mannerData, setMannerData] = useState([]);

    // reasons of death
    const [reason, setReason] = useState(props.route.params?.item?.reason_for_death ?? "");
    // const [reasonId, setReasonId] = useState(props.route.params?.item?.reason_for_death ?? "");

    // carcass condition
    const [condition, setCondition] = useState(props.route.params?.item?.condition_type ?? "");
    const [conditionId, setConditionId] = useState(props.route.params?.item?.carcass_condition ?? "");
    const [conditionData, setConditionData] = useState([]);
    // carcass disposition
    const [disposition, setDisposition] = useState(props.route.params?.item.disposition_type ?? "");
    const [dispositionId, setDispositionId] = useState(props.route.params?.item?.carcass_disposition ?? "");
    const [dispositionData, setDispositionData] = useState([]);

    //    notes
    const [note, setNotes] = useState(props.route.params?.item?.user_for_notes ?? "");

    // necropsy
    const [necropsy, setNecropsy] = useState(props.route.params?.item.necropsy_type ?? "");

    const [loading, setLoding] = useState(false);


    // Get Animal
    const [animalData, setAnimalData] = useState([]);

    // drop down state ===============================================================

    const [enclosureTypeDown, setEnclosureTypeDown] = useState(false)

    const catPressed = (item) => {
        // item.map((value) => { setEntity(value.name) })

        setEntity(item.map((u) => u.name).join(", "));

        setEntityId(item.map((id) => id.id).join(','));

        setIsSectionMenuOpen(false)
    };

    // map manner of death
    const catEnvPress = (item) => {

        setMannerDeath(item.map((u) => u.name).join(","));
        setMannerDeathId(item.map((id) => id.id).join(','));

        setisEncEnvMenuOpen(false);
    }
    //  carcass condition
    const catEnTypePress = (item) => {
        // item.map((value) => { setCondition(value.name) })

        setCondition(item.map((u) => u.name).join(","));
        setConditionId(item.map((id) => id.id).join(','));


        setisEncTypeMenuOpen(false)
    }
    //  carcass disposition
    const catEnTypePress1 = (item) => {

        setDisposition(item.map((u) => u.name).join(","));
        setDispositionId(item.map((id) => id.id).join(','));
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
            console.log(res, 'res')
            setDispositionData(res.data);
        })

    }, [])
    // Get Animal Data

    useEffect(() => {
        getAnimal().then((res) => {
            console.log(res, 'res............................')
            setAnimalData(res.data);
        })

    }, [])

    const validation = () => {

        if (entity.length === 0) {
            setIsError({ entity: true })
            setErrorMessage({ entity: "Select The Entity Name" })
            return false;
        }
        else if (date === "") {
            setIsError({ date: true });
            setErrorMessage({ date: "Select from dropdown" });
            return false;
        }
        else if (mannerDeath.trim().length === 0) {
            setIsError({ mannerDeath: true })
            setErrorMessage({ mannerDeath: "Select The Manner of Death" })
            return false;
        }

        else if (reason.trim().length === 0) {
            setIsError({ reason: true });

            setErrorMessage({ reason: "Enter The Reason of Death" });
            return false;
        }
        else if (condition.trim().length === 0) {
            setIsError({ condition: true })
            setErrorMessage({ condition: "Select The Carcoss Condition" })
            return false;

        }
        else if (disposition.trim().length === 0) {
            setIsError({ disposition: true })
            setErrorMessage({ disposition: "Select The Carcoss Disposition" })
            return false;

        }

        else if (note.trim().length === 0) {
            setIsError({ note: true });
            setErrorMessage({ note: "Enter The Notes" });
            return false;
        }
        // necropsy

        else if (necropsy.trim().length === 0) {
            setIsError({ necropsy: true })
            setErrorMessage({ necropsy: "Select The Necropsy" })
            return false;

        }
        return true;
    };


    const getEnclosureFormData = () => {
        if (validation()) {
            let obj = {
                "entity_id": entityId,

                "entity_type": entity,

                "discovered_date": moment(date).format('YYYY-MM-DD'),

                "is_estimate": true,

                "manner_of_death": mannerDeathId,

                "reason_for_death": reason,

                "carcass_condition": conditionId,



                "carcass_disposition": dispositionId,
                "user_for_notes": note,

                "submitted_for_necropsy": true
            }
            console.log("object.............", obj);

            setLoding(true)
            addanimalmortality(obj).then((res) => {
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

    const setSelectedDate = (item)=>{

        let today = new Date();
        if(today < item){
            alert("Select only today or previous date");
            return;
        }              
        setDate(item);
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
                    onChange={setSelectedDate}
                    // title='DATE'
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
                    keyboardType={"default"}
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
                    numberOfLines={3}
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