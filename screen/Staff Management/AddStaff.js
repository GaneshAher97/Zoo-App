import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader";
import { CountryPicker } from "react-native-country-codes-picker";
import Colors from "../../configs/Colors";
import Category from "../../components/DropDownBox";
import { AntDesign } from "@expo/vector-icons";
import { getSection } from "../../services/staffManagement/getEducationType";
import { addStaff } from "../../services/staffManagement/addPersonalDetails";
import { useSelector} from "react-redux";


const AddStaff = (props) => {
    const navigation = useNavigation();

    const [designation, setDesignation] = useState([]);
    const [id, setId] = useState(0);
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [countryCode, setCountryCode] = useState('');
    const [mobile, setmobile] = useState("");
    const [country, setcountry] = useState("");
    const [designationName, setdesignationName] = useState(null);
    const [designationId, setdesignationId] = useState("");
    const [isDesignationOpen, setisDesignationOpen] = useState(false);
    const [staffId, setstaffId] = useState("");

    const [show, setShow] = useState(false);

    const [errorMessage, setErrorMessage] = useState({});
    const [isError, setIsError] = useState({});

    const [isLoading, setIsLoading] = useState(false)
	const zooID = useSelector(state => state.UserAuth.zoo_id)


    useEffect(() => {
        getSection().then((res) => {
            let getdata = res.map((item) => {
                return {
                    id: item.seciton_id,
                    name: item.section_name
                }
            })
            setDesignation(getdata);
        })
    }, [])

    const catPressed = (item) => {
        setdesignationName(item.map((u) => u.name).join(", "));
        setdesignationId(item.map((id) => id.id));
        setisDesignationOpen(!isDesignationOpen);
    }

    const validation = () => {
        setIsError({});
        let mobileRegx = /^\d{10}$/;
        let emailRegx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (first_name.trim().length === 0) {
            setIsError({ first_name: true });
            setErrorMessage({ first_name: "This filed required" });
            return false;
        } else if (last_name.trim().length === 0) {
            setIsError({ last_name: true })
            setErrorMessage({ last_name: "This filed required" })
            return false;
        } else if (email.trim().length === 0) {
            setIsError({ email: true })
            setErrorMessage({ email: "This filed required" })
            return false;
        } else if (!emailRegx.test(email)) {
            setIsError({ email: true })
            setErrorMessage({ email: "Enter a valid email" })
            return false;
        }else if (password.trim().length === 0) {
            setIsError({ password: true });
            setErrorMessage({ password: "This filed required" })
            return false;
        } else if (countryCode.trim().length === 0) {
            setIsError({ countryCode: true })
            setErrorMessage({ countryCode: "This filed required" })
            return false
        } else if (mobile.trim().length === 0) {
            setIsError({ mobile: true })
            setErrorMessage({ mobile: "This filed required" })
            return false
        } else if (!mobileRegx.test(mobile)) {
            setIsError({ mobile: true })
            setErrorMessage({ mobile: "Enter a valid mobile no." })
            return false;
        }else if (country.trim().length === 0) {
            setIsError({ country: true })
            setErrorMessage({ country: "This filed required" })
            return false
        } else if (designationName === null) {
            setIsError({ designationName: true })
            setErrorMessage({ designationName: "This filed required" })
            return false
        } else if (staffId.trim().length === 0) {
            setIsError({ staffId: true })
            setErrorMessage({ staffId: "This filed required" })
            return false
        }
        return true;
    }

    const onSubmit = () => {
        if (validation()) {
            var obj = {
                "first_name": first_name,
                "last_name": last_name,
                "user_type": "staff",
                "email": email,
                "password": password,
                "phone_no": mobile,
                "country": country,
                "country_code": countryCode,
                "designation": designationName,
                "staff_id": staffId,
				"zoo_id": zooID

            }
            setIsLoading(true)
            addStaff(obj).then((res) => {
                // console.log(res);
                alert('Staff Added!!');
                navigation.navigate("UserDetails",{
                    item : obj
                });
            }).catch((err) => {
                alert('Something went wrong!');
                console.log('error===>', err);
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
			<>
				{isLoading ? (
					<Loader />
				) : (
					<CustomForm
						header={true}
						title={"User Form"}
						onPress={onSubmit}
						marginBottom={50}
					>
						<InputBox
							inputLabel={"First Name"}
							placeholder={"First Name"}
							onChange={(val) => {
								setfirst_name(val);
							}}
							value={first_name}
							isError={isError.first_name}
							errors={errorMessage.first_name}
						/>
						<InputBox
							inputLabel={"Last Name"}
							placeholder={"Last Name"}
							onChange={(val) => {
								setlast_name(val);
							}}
							value={last_name}
							isError={isError.last_name}
							errors={errorMessage.last_name}
						/>
						<InputBox
							inputLabel={"Email"}
							placeholder={"Email"}
							keyboardType={"email-address"}
							onChange={(val) => {
								setemail(val);
							}}
							value={email}
							isError={isError.email}
							errors={errorMessage.email}
						/>
						<InputBox
							inputLabel={"Password"}
							placeholder={"Password"}
							onChange={(val) => {
								setpassword(val);
							}}
							value={password}
							isError={isError.password}
							errors={errorMessage.password}
						/>
						<InputBox
							inputLabel={"Country Code"}
							placeholder={"Country Code"}
							editable={false}
							rightElement={show ? "chevron-up" : "chevron-down"}
							DropDown={() => {
								setShow(true);
							}}
							onChange={(val) => {
								setCountryCode(val);
							}}
							value={countryCode}
							isError={isError.countryCode}
							errors={errorMessage.countryCode}
						/>
						<InputBox
							inputLabel={"Mobile"}
							placeholder={"Mobile"}
							keyboardType={"numeric"}
							maxLength={10}
							onChange={(val) => {
								setmobile(val);
							}}
							value={mobile}
							isError={isError.mobile}
							errors={errorMessage.mobile}
						/>
						<InputBox
							inputLabel={"Country"}
							placeholder={"Country"}
							onChange={(val) => {
								setcountry(val);
							}}
							value={country}
							isError={isError.country}
							errors={errorMessage.country}
						/>
						<InputBox
							inputLabel={"Designation"}
							placeholder=" "
							editable={false}
							value={designationName}
							isError={isError.designationName}
							errors={errorMessage.designationName}
							rightElement={isDesignationOpen ? "chevron-up" : "chevron-down"}
							DropDown={() => {
								setisDesignationOpen(!isDesignationOpen);
							}}
						/>
						<InputBox
							inputLabel={"Staff Id"}
							placeholder={"Staff Id"}
							keyboardType={"numeric"}
							onChange={(val) => {
								setstaffId(val);
							}}
							value={staffId}
							isError={isError.staffId}
							errors={errorMessage.staffId}
						/>
					</CustomForm>
				)}
				{isDesignationOpen ? (
					<View style={{ flex: 1, backgroundColor: "#fff" }}>
						<Category
							categoryData={designation}
							onCatPress={catPressed}
							heading={"Choose Designation"}
						/>
					</View>
				) : null}
				<CountryPicker
					show={show}
					style={{
						// Styles for whole modal [View]
						modal: {
							height: 300,
						},
					}}
					onBackdropPress={() => setShow(false)}
					// when picker button press you will get the country object with dial code
					pickerButtonOnPress={(item) => {
						setCountryCode(item.dial_code);
						setShow(false);
					}}
				/>
			</>
		);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 8,
        paddingHorizontal: 8
    },
    Label: {
        // top: "3%",
        marginTop: 20,
        fontSize: 5,
        fontWeight: "200",
    },
})
export default AddStaff;