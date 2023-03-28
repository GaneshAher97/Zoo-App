
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import CustomForm from "../../components/CustomForm";
import Loader from "../../components/Loader";
import InputBox from "../../components/InputBox";
import { createDesignation } from "../../services/staffManagement/DesignationService";


const CreateDesignation = () => {
	const navigation = useNavigation()
	const [designationName, setDesignation] = useState("");
	const [designationCode, setDesignationCode] = useState("");
	const [loading, setLoding] = useState(false)
	const [errorMessage, setErrorMessage] = useState({});
	const [isError, setIsError] = useState({});
  
	const saveDesignationData = () => {
		setIsError({});
		setErrorMessage({}); 
		if (designationName.trim().length === 0) {    
			setIsError({ designationName: true });
			setErrorMessage({ designationName: "Designation name is required" });
			return false;
		} else if (designationCode.trim().length === 0) {
			setIsError({ designationCode: true });
			setErrorMessage({ designationCode: "Designation code is required" });
			return false;
		} else {
			let obj = {
				designation_name: designationName,
				designation_code: designationCode,
			};
			console.log("hello obj", obj);
			setLoding(true)
			createDesignation(obj)
				.then((res) => {       
				}).finally(() => {
					setLoding(false);
					alert("Designation added successfully") 
					navigation.goBack();
				})
				.catch((err) => {
					console.log(err);
				})
		}
	};

	return (
		<>
		{ loading?<Loader/>: <CustomForm
			header={true}
			title={"Designation"}
			onPress={saveDesignationData}
		>
			<InputBox
				inputLabel={"Name"}
				placeholder={"Enter Designation Name"}
				onChange={(val) => setDesignation(val)}
				value={designationName}
				errors={errorMessage.designationName}
				isError={isError.designationName}
				keybordType={"default"}
				textTransform="uppercase"

			/>
			<InputBox
				inputLabel={"Designation Code"}
				placeholder={"Enter Designation  "}
				onChange={(val) => setDesignationCode(val)}
				value={designationCode}
				errors={errorMessage.designationCode}
				isError={isError.designationCode}
				keyboardType={"numeric"}
			/>
		</CustomForm>
}
</>
	);
};

export default CreateDesignation;
