import {
	View,
	Text,
	StyleSheet,
	Alert,
} from "react-native";
import DatePicker from "../../components/DatePicker";
import React, { useContext, useState } from "react";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import { useNavigation } from "@react-navigation/native";
import { EditpersonalDetails, personalDetails } from "../../services/staffManagement/addPersonalDetails";
import AppContext from "../../context/AppContext";
import Loader from "../../components/Loader";
import DocumentUpload from "../../components/DocumentUpload";
import Category from "../../components/DropDownBox";
import NewDropdown from "../../components/Dropdown";

const genderItem = [
	{
		id: 1,
		name: "Male",
	},
	{
		id: 2,
		name: "Female",
	},
];

const Item = [

	{
		id: 1,
		name: "Married",
	},
	{
		id: 2,
		name: "Unmarried",
	},
];

let userGender = "";
let userMarritalStatus = "";

const PersonalDetails = (props) => {

	const navigation = useNavigation();
	const [phone, setPhone] = useState(props.route.params?.item?.user_mobile_number ?? "");
	const [email, setEmail] = useState(props.route.params?.item?.user_email ?? "");
	const [Gender, setGender] = useState(props.route.params?.item?.user_gender ?? "");
	const [bloodGroup, setBloodGroup] = useState(props.route.params?.item?.user_blood_grp ?? "");
	const [address, setAddress] = useState(props?.route?.params?.item?.user_address ?? "");
	const [martialStatus, setMartialStatus] = useState(props.route.params?.item?.user_marital_status ?? "");
	const [date, setDate] = useState(props.route.params?.item?.user_dob ?? "");
	const [DropDown, setDropDown] = useState("");
	const context = useContext(AppContext);
	const { user_id } = context.userDetails.user;
	const id = props.route.params?.item?.user_id

	const [errorMessage, setErrorMessage] = useState({});
	const [isError, setIsError] = useState({});
	const [isLoading, setLoding] = useState(false);
	const [uploadFile, setUploadFile] = useState("");
	const[martialItemDropDown,setMartialItemDropDown]=useState(false)

	const getGenderData = (item) => {
		item.map((value) => { setGender(value.name) })
		setDropDown(!DropDown)
	};

	const SetDropDown = (data) => {
		setDropDown(data)
	}

	const SetMaritalStatus = (data) => {
		setMartialItemDropDown(data)
	}
	const getMaritalStatusData = (item) => {
		// userMarritalStatus = item.val;
		// setMartialStatus(userMarritalStatus);
		item.map((value) => { setMartialStatus(value.name) })
		setMartialItemDropDown(!martialItemDropDown)
		// console.log("staff status sval----", userMarritalStatus);
	};

	const onSubmit = () => {
		setIsError({});
		setErrorMessage({});
		let mobileRegx = /^\d{10}$/;
		let emailRegx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		let bloodRegex = /(A|B|AB|O)[+-]/;

		if (phone.trim().length === 0 || !mobileRegx.test(phone)) {
			setIsError({ phone: true });
			// scrollToScrollViewTop();
			setErrorMessage({ phone: "Enter valid number" });
			return false;
		} else if (email.trim().length === 0 || !emailRegx.test(email)) {
			setIsError({ email: true });
			// scrollToScrollViewTop();
			setErrorMessage({ email: "Enter valid email" });
			return false;
		} else if (Gender.trim().length === 0 || Gender === "") {
			setIsError({ Gender: true });
			setErrorMessage({ Gender: "Select from dropdown" });
			return false;
		} else if (date === "") {
			setIsError({ date: true });
			setErrorMessage({ date: "Select from dropdown" });
			return false;
		} else if (bloodGroup.trim().length === 0) {
			setIsError({ bloodGroup: true });
			setErrorMessage({ bloodGroup: "Enter valid blood group" });
			return false;
		} else if (martialStatus.trim().length === 0 || martialStatus === "") {
			setIsError({ martialStatus: true });
			setErrorMessage({ martialStatus: "Select from dropdown" });
			return false;
		} else if (address.trim().length === 0 || address === "") {
			setIsError({ address: true });
			setErrorMessage({ address: "Enter your address" });
			return false;
		} else if (uploadFile == "") {
			setIsError({ uploadFile: true });
			setErrorMessage({ uploadFile: "Please upload id proof document" });
		} else {
			var obj = {
				user_id: user_id,
				user_mobile_number: phone,
				user_email: email,
				user_gender: Gender,
				user_dob: date,
				user_blood_grp: bloodGroup,
				user_marital_status: martialStatus,
				user_address: address,
				user_address_doc: `data:${uploadFile.type};base64,${uploadFile.fileBase64}`,
			};
			setLoding(true);
			console.log("object data<<<<<<<<<<<<<=====>", obj);
			personalDetails(obj)
				.then((response) => {
					setLoding(false);
					console.log("response -->", response);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoding(false);
					Alert.alert("Your data sucessfully save");
					navigation.navigate("HomeScreen");
					// console.log("ok===========");
				});
		}
	};

	const validate = () => {
		let mobileRegx = /^\d{10}$/;
			let emailRegx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			let bloodRegex = /(A|B|AB|O)[+-]/;
		
			if (phone.trim().length === 0 || !mobileRegx.test(phone)) {
			  setIsError({ phone: true });
			  // scrollToScrollViewTop();
			  setErrorMessage({ phone: "Enter valid number" });
			  return false;
			} else if (email.trim().length === 0 || !emailRegx.test(email)) {
			  setIsError({ email: true });
			  // scrollToScrollViewTop();
			  setErrorMessage({ email: "Enter valid email" });
			  return false;
			} else if (Gender.trim().length === 0 || Gender === "") {
			  setIsError({ Gender: true });
			  setErrorMessage({ Gender: "Select from dropdown" });
			  return false;
			} else if (date === "") {
			  setIsError({ date: true });
			  setErrorMessage({ date: "Select from dropdown" });
			  return false;
			} else if (bloodGroup.trim().length === 0) {
			  setIsError({ bloodGroup: true });
			  setErrorMessage({ bloodGroup: "Enter valid blood group" });
			  return false;
			} else if (martialStatus.trim().length === 0 || martialStatus === "") {
			  setIsError({ martialStatus: true });
			  setErrorMessage({ martialStatus: "Select from dropdown" });
			  return false;
			} else if (address.trim().length === 0 || address === "") {
			  setIsError({ address: true });
			  setErrorMessage({ address: "Enter your address" });
			  return false;
			}  else if (uploadFile == "") {
			  setIsError({uploadFile: true})
			  setErrorMessage({uploadFile: "Please upload id proof document"})
			} 
		return true
	}

	const onEditSubmit = () => {
		if(validate()) {
				var obj = {
					user_id: user_id,
					user_mobile_number: phone,
					user_email: email,
					user_gender: Gender,
					user_dob: date,
					user_blood_grp: bloodGroup,
					user_marital_status: martialStatus,
					user_address: address,
					user_address_doc: `data:${uploadFile.type};base64,${uploadFile.fileBase64}`,
				};
				setLoding(true);
				console.log("object data<<<<<<<<<<<<<=====>", obj);
				EditpersonalDetails(obj)
					.then((response) => {
						setLoding(false);
						console.log("response -->", response);
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {
						setLoding(false);
						Alert.alert("Your data update successfully");
						navigation.navigate("HomeScreen");
						// console.log("ok===========");
					});
			}
		};

	return (
		<>
			{isLoading ? (
				<Loader loaderSize="lg" />
			) : (
				<CustomForm
					header={true}
					title={"Personal Details"}
					onPress={id > 0 ? onEditSubmit : onSubmit}
					marginBottom={50}
				>
					<InputBox
						inputLabel={"Personal Phone number"}
						placeholder={"Personal Phone number"}
						onChange={(val) => {
							setPhone(val);
						}}
						value={phone}
						isError={isError.phone}
						errors={errorMessage.phone}
						keyboardType={"number-pad"}
						maxLength={10}
					/>
					<InputBox
						inputLabel={"Personal Email"}
						placeholder={"Personal Email"}
						onChange={(val) => setEmail(val)}
						value={email}
						isError={isError.email}
						errors={errorMessage.email}
						keyboardType={"email-address"}
					/>
					<InputBox
						editable={false}
						inputLabel="Gender"
						value={Gender}
						placeholder="Enter Gender"
						rightElement={DropDown ? "chevron-up" : "chevron-down"}
						// DropDown={()=>{setIdProofDropDown(!idProofDropDown)}}
						DropDown={SetDropDown}
						errors={errorMessage.Gender}
						isError={isError.Gender}
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
						inputLabel={"Blood Group"}
						placeholder={"Blood Group"}
						onChange={(val) => setBloodGroup(val)}
						value={bloodGroup}
						isError={isError.bloodGroup}
						errors={errorMessage.bloodGroup}
					/>
					{/* <NewDropdown
						title="Marital Status"
						data={martialItem}
						afterPressDropdown={getMaritalStatusData}
						errors={errorMessage.martialStatus}
						isError={isError.martialStatus}
					/> */}
					<InputBox
						editable={false}
						inputLabel="Marital Status"
						value={martialStatus}
						placeholder="Enter Marital Status"
						rightElement={DropDown ? "chevron-up" : "chevron-down"}
						// DropDown={()=>{setIdProofDropDown(!idProofDropDown)}}
						DropDown={SetMaritalStatus}
						errors={errorMessage.Gender}
						isError={isError.Gender}
					/>
					<InputBox
						inputLabel={"Address"}
						placeholder={"Address"}
						onChange={(val) => setAddress(val)}
						value={address}
						isError={isError.address}
						errors={errorMessage.address}
					/>
					<View>
						<Text
							style={[
								Styles.Label,
								{ fontSize: 14, fontWeight: "500", color: "grey" },
							]}
						>
							Address Proof Doc Upload
						</Text>
						<DocumentUpload
							uploadable={true}
							type={"document"}
							items={uploadFile}
							onChange={(value) => {
								console.log({ value });
								setUploadFile(value);
							}}
						/>
						{isError.uploadFile ? (
							<Text style={Styles.errortext}>
								{errorMessage.uploadFile}
							</Text>
						) : null}
					</View>
				</CustomForm>

			)}
			{DropDown ? (
				<View style={{ flex: 1, backgroundColor: "#fff" }}>
					<Category
						categoryData={genderItem}
						onCatPress={getGenderData}
						heading={"Choose Gender"}
					/>
				</View>
			) : null}
			{martialItemDropDown ? (
				<View style={{ flex: 1, backgroundColor: "#fff" }}>
					<Category
						categoryData={Item}
						onCatPress={getMaritalStatusData}
						heading={"Choose Gender"}
					/>
				</View>
			) : null}
		</>
	);
};
export default PersonalDetails;

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	headerTitle: {
		color: "grey",
		fontSize: 20,
		fontWeight: "700",
		// marginBottom: 20
	},
	body: {
		width: "100%",
		height: "100%",
		paddingHorizontal: 20,
		paddingVertical: 20,
		//    backgroundColor:"green"
	},
	headerTitle: {
		color: "grey",
		fontSize: 20,
		fontWeight: "700",
		// marginBottom: 20
	},
	body: {
		width: "100%",
		height: "100%",
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "white",
	},

	Label: {
		// top: "3%",
		marginTop: 20,
		fontSize: 5,
		fontWeight: "200",
	},
	nextBtn: {
		marginVertical: 12,
		backgroundColor: "#7CC0CF",
		width: "40%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: 10,
	},
	btnText: {
		color: "white",
	},
	errortext: {
		color: "red"

	}
});