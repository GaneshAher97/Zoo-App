//Create by: Ramij Dafadar
//Create on :23/03/2023

import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from 'react-native-paper';
import CustomForm from '../../components/CustomForm';
import InputBox from '../../components/InputBox';
import Loader from '../../components/Loader';
import DatePicker from '../../components/DatePicker';
import Category from '../../components/DropDownBox';
import { getSection } from '../../services/staffManagement/getEducationType';
import { useSelector} from "react-redux";

const AddFeedLog = (props) => {
    const navigation = useNavigation();

    const [foodProvided, setFoodProvided] = useState("")
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [quantity, setQuantity] = useState("")
    const [consumed, SetConsumed] = useState("")
    const [left, setLeft] = useState("")
    const [quantityUOM, setQuantityUOM] = useState("")
    const [id, setId] = useState("")
    const [feedingMethod, setFeedingMethod] = useState("")
    const [fedBy, setFedBy] = useState("")
    const [occupents, setOccupent] = useState(false)
    const [details, setDetails] = useState("")
    const clientID = useSelector(state => state.UserAuth.client_id)


    const [quantity_UOM_DropDown, setQuantity_UOM_DropDown] = useState("");
    const [quantity_UOM_Data, setQuantity_UOM_Data] = useState([]);

    const [feedingMethod_Dropdown, setFeedingMethod_Dropdown] = useState("")
    const [feedingMethod_Data, setFeedingMethod_Data] = useState([])

    const [fedByDropDown, setFedByDropDown] = useState("")
    const [fedBy_Data, setFedBy_Data] = useState([])

    const [isLoading, setLoding] = useState(false);
    // const [error, setError] = useState({});
    const [errorMessage, setErrorMessage] = useState({
        instituteName: null,
        passingYear: null,
        educationType: null,
        course: null,
        marks: null,

    });

    const [isError, setIsError] = useState({});

    const catPressed = (item) => {
        setQuantityUOM(item.map((u) => u.name).join(", "));
        setId(item.map((id) => id.id).join(','));
        setQuantity_UOM_DropDown(!quantity_UOM_DropDown)
    }

    const MethodPressed = (item) => {
        setFeedingMethod(item.map((u) => u.name).join(", "));
        // setId(item.map((id) => id.id).join(','));
        setFeedingMethod_Dropdown(!feedingMethod_Dropdown)
    }

    const FedPressed = (item) => {
        setFedBy(item.map((u) => u.name).join(", "));
        // setId(item.map((id) => id.id).join(','));
        setFedByDropDown(!fedByDropDown)
    }

    const SetDropDown = (data) => {
        setQuantity_UOM_DropDown(data)
        setFeedingMethod_Dropdown(false)
        setFedByDropDown(false)
    }

    const SetMethodDropDown = (data) => {
        setFeedingMethod_Dropdown(data)
        setQuantity_UOM_DropDown(false)
        setFedByDropDown(false)
    }

    const SetFedDropDown = (data) => {
        setFedByDropDown(data)
        setQuantity_UOM_DropDown(false)
        setFeedingMethod_Dropdown(false)
    }

    // const checkName = (str) => {
    // 	let res = str.match(/^[A-Za-z / /]+$/) ? false : true;
    // 	// console.log(res);
    // 	return res;
    // };


    // const CreateTypeEdu = () =>{

    //     setIsError({});
    //     setErrorMessage({});



    //     if(instituteName.trim().length===0 )
    //     {
    //         setIsError({instituteName:true})
    //         setErrorMessage({instituteName:"Institute Name is required"})
    //         return false
    //     }
    //     else if (checkName(instituteName)) {
    // 		setIsError({ instituteName: true });
    // 		setErrorMessage({
    // 			instituteName: "institute name can contains only alphabets",
    // 		});
    // 		return false;
    //     }
    //     else if (passingYear.trim().length ===0) 
    //     {
    // 		setIsError({passingYear:true})
    //         setErrorMessage({passingYear:"Enter passing year"})
    // 		return false;
    // 	}
    //     else if (educationType.trim().length ===0 ) 
    //     {
    // 		setIsError({educationType:true})
    //         setErrorMessage({educationType:"Enter Education Type"})
    // 		return false;
    // 	}
    //     else if (course.trim().length ===0) 
    //     {
    // 		setIsError({course:true})
    //         setErrorMessage({course:"Enter Course Type"})
    // 		return false;
    // 	}
    //     else if (marks.trim().length ===0) 
    //     {
    // 		setIsError({marks:true})
    //         setErrorMessage({marks:"Enter marks "})
    // 		return false;
    // 	}
    //     else
    //     {
    //         let obj = {
    //             type_name : educationType,
    //             client_id : clientID
    //         }

    //         console.log("dfgdfgfdfdghfdgfdg---=-=-",obj)
    //         setLoding(true);
    //         createEducationType(obj)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .finally(() => {
    //             setLoding(false);
    //             navigation.goBack();
    //             Alert.alert("Education type is added successfully")
    //             // console.log("ok Ashu =>>>>>>=====");
    //         });;
    //             setEducationType("")
    //             setInstituteName("")
    //             setMarks("")
    //             setPassingYear("")
    //             SetCourse("")
    //             setErrorMessage("")
    //     } 

    // }

    useEffect(() => {
        getSection().then((res) => {
            let getdata = res.map((item) => {
                return {
                    id: item.seciton_id,
                    name: item.section_name
                }
            })
            setQuantity_UOM_Data(getdata);
            setFeedingMethod_Data(getdata);
            setFedBy_Data(getdata);
        })
    }, [])

    return (
        <>
            {isLoading ? (
                <Loader loaderSize="lg" />
            )
                : (
                    <CustomForm header={true} title={"Add Feed Log"} onPress={() => console.log("Done")}>
                        <InputBox
                            inputLabel={"Food provided"}
                            placeholder={"Food provided"}
                            keyboardType={"default"}
                            onChange={(e) => setFoodProvided(e)}
                            value={foodProvided}
                            errors={errorMessage.foodProvided}
                            isError={isError.foodProvided}
                        />
                        <View>
                            <Text
                                style={[
                                    Styles.Label,
                                    { fontSize: 14, fontWeight: "500", color: "grey" },
                                ]}
                            >
                                Feeding Date
                            </Text>
                            <DatePicker
                                today={date}
                                onChange={(item) => {
                                    let today = item.toJSON().slice(0, 10);
                                    setDate(today);
                                }}
                                mode="date"
                            />
                        </View>
                        {/* <DateTimePickerModal
                isVisible={true}
                mode={'time'}
                // onConfirm={handleConfirm}
                // onCancel={hideDatePicker}
            /> */}

                        <View>
                            <Text
                                style={[
                                    Styles.Label,
                                    { fontSize: 14, fontWeight: "500", color: "grey" },
                                ]}
                            >
                                Feeding Time
                            </Text>
                            <DatePicker
                                today={time}
                                onChange={(item) => {
                                    let today = item.toJSON().slice(0, 10);
                                    setTime(today);
                                }}
                                mode="time"
                            />
                        </View>


                        <InputBox
                            inputLabel={"Quantity"}
                            placeholder={"Quantity"}
                            keyboardType={'numeric'}
                            onChange={(value) => setQuantity(value)}
                            value={quantity}
                            minLength={4}
                            maxLength={4}
                            errors={errorMessage.quantity}
                            isError={isError.quantity}

                        />
                        <InputBox
                            inputLabel={"Consumed"}
                            placeholder={"Consumed"}
                            onChange={(value) => SetConsumed(value)}
                            value={consumed}
                            errors={errorMessage.consumed}
                            isError={isError.consumed}
                        />
                        <InputBox
                            inputLabel={"Left"}
                            onChange={(value) => setLeft(value)}
                            value={left}
                            placeholder={"Left"}
                            errors={errorMessage.left}
                            isError={isError.left}
                        />

                        <View>
                            <InputBox
                                editable={false}
                                inputLabel="Quantity UOM"
                                value={quantityUOM}
                                placeholder="Select UOM"
                                rightElement="chevron-down"
                                DropDown={SetDropDown}
                                errors={errorMessage.id}
                                isError={isError.id}
                            />
                        </View>

                        <View>
                            <InputBox
                                editable={false}
                                inputLabel="Feeding method"
                                value={feedingMethod}
                                placeholder="Select Feeding method"
                                rightElement="chevron-down"
                                DropDown={SetMethodDropDown}
                                errors={errorMessage.id}
                                isError={isError.id}
                            />
                        </View>

                        <View>
                            <InputBox
                                editable={false}
                                inputLabel="Fed by"
                                value={fedBy}
                                placeholder="Select Fed by"
                                rightElement="chevron-down"
                                DropDown={SetFedDropDown}
                                errors={errorMessage.id}
                                isError={isError.id}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={occupents ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setOccupent(!occupents);
                                }}
                            />
                            <Text style={{ fontWeight: '600', color: '#2d2d2d' }}>Apply to all enclosures occupents?</Text>
                        </View>
                        <InputBox
                            inputLabel={"Details"}
                            keyboardType={'default'}
                            onChange={(value) => setDetails(value)}
                            maxLength={3}
                            value={details}
                            placeholder={"Details"}
                            errors={errorMessage.details}
                            isError={isError.details}
                            multiline={true}
                        />

                    </CustomForm>
                )}
            {quantity_UOM_DropDown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={quantity_UOM_Data}
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

            {feedingMethod_Dropdown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={feedingMethod_Data}
                        onCatPress={MethodPressed}
                        heading={"Choose Section"}
                        userType={"admin"}
                        navigation={props.navigation}
                        permission={"Yes"}
                        screen={"AddCategory"}
                        isMulti={false}
                    />
                </View>
            ) : null}

            {fedByDropDown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={fedBy_Data}
                        onCatPress={FedPressed}
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

const Styles = StyleSheet.create({
    Label: {
        // top: "3%",
        marginTop: 20,
        fontSize: 5,
        fontWeight: "200",
    },
})
export default AddFeedLog;
