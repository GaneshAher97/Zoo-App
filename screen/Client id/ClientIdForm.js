import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { idproof } from "../../services/ClientService";
import InputBox from "../../components/InputBox";
import CustomForm from "../../components/CustomForm";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader";
import { Checkbox } from "react-native-paper";
import NewDropdown from "../../components/Dropdown";
import { useSelector} from "react-redux"; 

const items = [
	{
		category_id: 1,
		category_name: "Staff Status",
		category_type: 1,
		isExpanded: true,
		subcategory: [
			{
				id: 1,
				val: "Aadhar Card",
			},
			{
				id: 2,
				val: "Passport",
			},
		],
	},
];

let documentType = "";

const ClientIdForm = () => {
	const navigation = useNavigation();

	const [isChecked, setIsChecked] = useState(false);
	const [inputValue, setInputValue] = useState(null);

	const [isError, setIsError] = useState({});
	const [errorMessage, setErrorMessage] = useState({});
	const [isLoading, setLoding] = useState(false);
	const clientID = useSelector(state => state.UserAuth.client_id)

	// console.log("ischecked", isChecked);

	const getDocumentTypeData = (item) => {
		documentType = item.val;
		setInputValue(documentType);
		console.log("staff status sval----", documentType);
	};

	const onSubmit = () => {
		setIsError({});
		setErrorMessage({});

		const validAttr = ["Passport", "AadharCard"];

		if (!validAttr.includes(inputValue)) {
			// console.log('input========>', inputValue);
			setIsError({ inputValue: true });
			setErrorMessage({ inputValue: "Please select from dropdown*" });
			return false;
		} else if (!isChecked) {
			setIsError({ isChecked: true });
			setErrorMessage({ isChecked: "please select check box*" });
			return false;
		}

		var obj = {
			id_name: inputValue,
			client_id : clientID,
			required: isChecked,
		};
		setLoding(true);
		console.log("object data========>", obj);
		idproof(obj)
			.then((response) => {
				console.log("response -->", response);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoding(false);
				navigation.goBack();
				console.log("ok===========");
				alert("Create ID proof successfuly");
			});
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<CustomForm
					header={true}
					title={"Client Id Proof"}
					onPress={onSubmit}
				>
					<NewDropdown
						title="Id Proof"
						data={items}
						afterPressDropdown={getDocumentTypeData}
						errors={errorMessage.inputValue}
						isError={isError.inputValue}
					/>
					<View isInvalid={isError.isChecked}>
						<Checkbox
							status={isChecked ? "checked" : "unchecked"}
							onPress={() => {
								setIsChecked(!isChecked);
							}}
						/>
						{isError.isChecked ? (
							<Text style={styles.errortext}>
								{errorMessage.isChecked}
							</Text>
						) : null}
					</View>
				</CustomForm>
			)}
		</>
	);
};


export default ClientIdForm;

const styles = StyleSheet.create({
  Label: {
    marginTop: 20,
    fontSize: 5,
    fontWeight: "200",
  },
  errortext: {
    color: "red"

  }
})
