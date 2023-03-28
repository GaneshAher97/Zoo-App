
import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import { StyleSheet ,View} from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import { AddEnclosure, editEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";


import AppContext from "../../context/AppContext";
import InputBox from "../../components/InputBox";
import CheckBox from "../../components/CheckBox";
import { getEnclosureService } from "../../services/SettingEnclosure";


const CreateEnclosure = (props) => {
	const navigation = useNavigation();
	const context = useContext(AppContext);


	const [enclosure_id, SetEnclosure_id] = useState(props.route.params?.item.enclosure_id ?? "")
	const [enclosureName, setEnclosureName] = useState(props.route.params?.item?.user_enclosure_name ?? "");
	const [enclosureDesc, SetEnclosureDesc] = useState(props.route.params?.item?.enclosure_desc ?? "");
	const [enclosureCode, setEnclosureCode] = useState(props.route.params?.item.enclosure_code ?? "");
	const [isMovable, setIsMovable] = useState(props.route.params?.item?.enclosure_is_movable ?? false);
	const [isWalkable, setIsWalkable] = useState(props.route.params?.item?.enclosure_is_walkable ?? false);
	const [enclosureSunlight, setEnclosureSunlight] = useState(props.route.params?.item?.enclosure_sunlight ?? "");
	
	const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
	const [sectionData, setSectionData] = useState([]);
	const [section, setSection] = useState(props.route.params?.item?.data ?? "");
	const [sectionId, setSectionId] = useState(props.route.params?.item?.section_id ?? "");

	const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);
	const [encEnvData, setencEnvData] = useState([])
	const [enclosureEnvironment, setEnclosureEnvironment] = useState(props.route.params?.item.enclosure_environment ?? "");
	
	const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
	const [enclosureType, setEnclosureType] = useState(props.route.params?.item.enclosure_type ?? "");
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
	const onMovable = () => {
		setIsMovable(!isMovable)
	}
	const onWalkable = () => {
		setIsWalkable(!isWalkable)
	}

	const catPressed = (item) => {
		// console.log('item==========>', item);
		setSection(item.map((u) => u.name).join(", "));
		setSectionId(item.map((id) => id.id).join(','));
		setIsSectionMenuOpen(false)
	};

	const catEnvPress = (item) => {
		setEnclosureEnvironment(item.map((u) => u.name).join(","));
		// setSectionId(item.map((id) => id.id).join(','));
		setisEncEnvMenuOpen(false);
	}

	const catEnTypePress = (item) => {
		setEnclosureType(item.map((u) => u.name).join(","))
		setisEncTypeMenuOpen(false)
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
		if (enclosureName.trim().length === 0) {
			setIsError({ enclosureName: true })
			setErrorMessage({ enclosureName: "Enter The Name" })
			return false;
		} else if (section.length === 0) {
			setIsError({ section: true })
			setErrorMessage({ section: "Select Section Id" })
			return false;
		} else if (enclosureDesc.trim().length === 0) {
			setIsError({ enclosureDesc: true })
			setErrorMessage({ enclosureDesc: "Enter The EnclosureDesc" })
			return false;
		} else if (enclosureCode.trim().length === 0) {
			setIsError({ enclosureCode: true })
			setErrorMessage({ enclosureCode: "Enter The EnclosureCode" })
			return false;
		} else if (enclosureEnvironment.trim().length === 0) {
			setIsError({ enclosureEnvironment: true })
			setErrorMessage({ enclosureEnvironment: "Enter The Enclosure Environment" })
			return false;
		}else if (enclosureType.trim().length === 0) {
			setIsError({ enclosureType: true })
			setErrorMessage({ enclosureType: "Enter The Enclosure Type" })
			return false;
		} else if (enclosureSunlight.trim().length === 0) {
			setIsError({ enclosureSunlight: true })
			setErrorMessage({ enclosureSunlight: "Enter The Enclosure Sunlight" })
			return false;
		}
		return true;
	};

	const getEnclosureEdit = () => {
		if (validation()) {

			let obj = {
				user_enclosure_name: enclosureName,
				section_id: sectionId,
				enclosure_desc: enclosureDesc,
				user_enclosure_id: context.userDetails.user.user_id,
				enclosure_code: enclosureCode,
				enclosure_environment: enclosureEnvironment,
				enclosure_incharge_id: context.userDetails.user.user_id,
				enclosure_is_movable: Number(isMovable),
				enclosure_is_walkable: Number(isWalkable),
				enclosure_type: enclosureType,
				enclosure_sunlight: enclosureSunlight,
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
				user_enclosure_name: enclosureName,
				section_id: sectionId,
				enclosure_desc: enclosureDesc,
				user_enclosure_id: context.userDetails.user.user_id,
				enclosure_code: enclosureCode,
				enclosure_environment: enclosureEnvironment,
				enclosure_incharge_id: context.userDetails.user.user_id,
				enclosure_is_movable: Number(isMovable),
				enclosure_is_walkable: Number(isWalkable),
				enclosure_type: enclosureType,
				enclosure_sunlight: enclosureSunlight,
			}
			// console.log(obj, ">>>>>>>>>>>");
			// return;
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




	const SetEnvTypeDropDown = (data) => {
		setisEncEnvMenuOpen(data)
		setIsSectionMenuOpen(false)
		setisEncTypeMenuOpen(false)
	}

	const SetEncTypeDropDown = (data) => {
		setisEncTypeMenuOpen(data)
		setisEncEnvMenuOpen(false)
		setIsSectionMenuOpen(false)
	}

	// console.log('drop down=======>',);

	return (
		<>
			{loading ? <Loader /> : <CustomForm header={true} title={enclosure_id > 0 ? "Edit Enclosure" : "Add Enclosure"} marginBottom={60} onPress={enclosure_id > 0 ? getEnclosureEdit : getEnclosureFormData}>
				<InputBox
					inputLabel={"Enclosure Name"}
					placeholder={"Enter Enclosure Name"}
					onChange={(value) => setEnclosureName(value)}
					value={enclosureName}
					errors={errorMessage.enclosureName}
					isError={isError.enclosureName}
				/>
				<InputBox
					inputLabel={"Section Name"}
					placeholder={"Choose Section Name"}
					editable={false}
					value={section}
					// defaultValue={section != null ? section : null}
					DropDown={SetDropDown}
					rightElement={isSectionMenuOpen ? "chevron-up" : "chevron-down"}
					errors={errorMessage.section}
					isError={isError.section}
				/>

				<View style={{}}>
					<CheckBox checked={checked} onPress={onChecked} title={'Is it parent?'} />
				</View>

				{
					checked ?
						<View>
							<InputBox
								inputLabel={'Parent Enclosure'}
								placeholder={'parent'}
							/>
						</View> : null
				}

				<InputBox
					inputLabel={"Enclosure Desc"}
					placeholder={"Enter Enclosure Desc"}
					onChange={(value) => SetEnclosureDesc(value)}
					value={enclosureDesc}
					errors={errorMessage.enclosureDesc}
					isError={isError.enclosureDesc}
				/>

				<InputBox
					inputLabel={"Enclosure Code"}
					placeholder={"Enter Enclosure Code"}
					onChange={(value) => setEnclosureCode(value)}
					value={enclosureCode}
					errors={errorMessage.enclosureCode}
					isError={isError.enclosureCode}
				/>

				<InputBox
					inputLabel={"Enclosure Environment"}
					placeholder={"Choose environment"}
					editable={false}
					value={enclosureEnvironment}
					defaultValue={enclosureEnvironment != null ? enclosureEnvironment : null}
					rightElement={isEncEnvMenuOpen ? "chevron-up" : "chevron-down"}
					DropDown={SetEnvTypeDropDown}
					errors={errorMessage.enclosureEnvironment}
					isError={isError.enclosureEnvironment}
				/>

				<View>
					<CheckBox title={'Is Movable?'} onPress={onMovable} checked={isMovable} />
				</View>

				<View>
					<CheckBox title={'Is walkable?'} checked={isWalkable == 1 ? isWalkable : null} onPress={onWalkable} />
				</View>

			
				<InputBox
					inputLabel={"Enclosure Type"}
					placeholder={"Choose enclosure type"}
					editable={false}
					value={enclosureType}
					defaultValue={enclosureType != null ? enclosureType : null}
					rightElement={isEncTypeMenuOpen ? "chevron-up" : "chevron-down"}
					DropDown={SetEncTypeDropDown}
					errors={errorMessage.enclosureType}
					isError={isError.enclosureType}
				/>

				<InputBox
					inputLabel={"Sunlight"}
					placeholder={"Sunlight"}
					onChange={(value) => setEnclosureSunlight(value)}
					value={enclosureSunlight}
					errors={errorMessage.enclosureSunlight}
					isError={isError.enclosureSunlight}
				/>
			</CustomForm>
			}
			{isSectionMenuOpen ? (
				<View style={{ flex: 1, backgroundColor: "#fff" }}>
					<Category
						categoryData={sectionData}
						onCatPress={catPressed}
						heading={"Choose Section"}
						isMulti={false}
					/>
				</View>
			) : null}
			{isEncEnvMenuOpen ? (
				<View style={{ flex: 1, backgroundColor: "#fff" }}>
					<Category
						categoryData={encEnvData}
						onCatPress={catEnvPress}
						heading={"Choose environment"}
						isMulti={false}
					/>
				</View>
			) : null}
			{isEncTypeMenuOpen ? (
				<View style={{ flex: 1, backgroundColor: "#fff" }}>
					<Category
						categoryData={encTypeData}
						onCatPress={catEnTypePress}
						heading={"Choose enclosure type"}
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
});
export default CreateEnclosure;