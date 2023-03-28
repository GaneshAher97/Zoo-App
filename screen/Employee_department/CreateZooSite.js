import React, { useEffect, useState } from "react";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import styles from "../../configs/Styles";
import { createZooSite } from "../../services/ZooSiteService";
import { MaterialIcons } from "@expo/vector-icons";
import NewDropdown from "../../components/Dropdown";
import { useSelector} from "react-redux";


const CreateZooSite = () => {
	const navigation = useNavigation();
	const [siteName, setSiteName] = useState("");
	const [description, setDescription] = useState("");
	const [incharge, setIncharge] = useState("");
	const [number, setNumber] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [isLoading, setLoding] = useState(false);
	const zooID = useSelector(state => state.UserAuth.zoo_id)

	const [errorMessage, setErrorMessage] = useState({
		siteName: null,
		description: null,
		incharge: null,
		number: null,
		longitude: null,
		latitude: null,
	});
	const [isError, setIsError] = useState({
		siteName: false,
		description: false,
		incharge: false,
		number: false,
		longitude: false,
		latitude: false,
	});

	const checkSiteName = (str) => {
		let res = str.match(/^[A-Za-z/ /]+$/) ? false : true;
		// console.log(res);
		return res;
	};

	const getLocation = async () => {
		setLoding(true);
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.log("Permission to access location was denied");
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		setLongitude(location.coords.longitude.toString());
		setLatitude(location.coords.latitude.toString());
		setLoding(false);
	};

	const validation = () => {
		if (siteName.trim().length === 0) {
			setIsError({ siteName: true });
			setErrorMessage({ siteName: "Site name is required" });
			return false;
		} else if (checkSiteName(siteName)) {
			setIsError({ siteName: true });
			setErrorMessage({
				siteName: "Site name can contains only alphabets",
			});
			return false;
		} else if (incharge.trim().length === 0) {
			setIsError({ incharge: true });
			setErrorMessage({ incharge: "Incharge is required" });
			return false;
		} else if (number.trim().length === 0) {
			setIsError({ number: true });
			setErrorMessage({ number: "Phone number is required" });
			return false;
		} else if (number.trim().length <= 9) {
			setIsError({ number: true });
			setErrorMessage({
				number: "Phone number should be atleast 10 number",
			});
			return false;
		}
		return true;
	};

	const saveZooSiteData = () => {
		if (validation()) {
			let obj = {
				zoo_id: zooID,
				site_name: siteName,
				site_description: description,
				site_latitude: latitude,
				site_longitude: longitude,
				site_incharge: incharge,
				site_incharge_number: number,
			};

			console.log("hello zoo section--------->>>>>>>", obj);

			setLoding(true);
			createZooSite(obj)
				.then((res) => {
					console.log(
						"<<<<-----hello show me the response from API about create zoo --->>>>",
						res
					);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoding(false);
					navigation.navigate("HomeScreen");
					Alert.alert("Site data added successfully");
					console.log("ok sharad =>>>>>>=====");
				});
			setSiteName("");
			setDescription("");
			setIncharge("");
			setNumber("");
			setIsError("");
			setErrorMessage("");
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader loaderSize="lg" />
			) : (
				<CustomForm
					header={true}
					title={"Zoo Site"}
					onPress={saveZooSiteData}
				>
					<InputBox
						inputLabel={"Site Name"}
						placeholder={"Enter Site Name"}
						onChange={(val) => setSiteName(val)}
						value={siteName}
						errors={errorMessage.siteName}
						isError={isError.siteName}
						keyboardType={"alpha"}
					/>
					<InputBox
						inputLabel={"Site Description"}
						placeholder={"Enter Site Description"}
						onChange={(val) => setDescription(val)}
						value={description}
						errors={errorMessage.description}
						isError={isError.description}
						keyboardType={"alpha"}
					/>
					<InputBox
						inputLabel={"longitude"}
						placeholder={"longitude"}
						keyboardType={"numeric"}
						errors={errorMessage.longitude}
						isError={isError.longitude}
						value={longitude}
						onChange={(value) => setLongitude(value)}
					/>
					<TouchableOpacity
						style={{
							width: "10%",
							alignItems: "center",
							marginHorizontal: "90%",
							bottom: "7%",
						}}
						onPress={getLocation}
					>
						<MaterialIcons name="my-location" size={23} color="grey" />
					</TouchableOpacity>

					<View style={{ bottom: 13 }}>
						<InputBox
							inputLabel={"latitude"}
							placeholder={"latitude"}
							keyboardType={"numeric"}
							errors={errorMessage.latitude}
							isError={isError.latitude}
							value={latitude}
							onChange={(value) => setLatitude(value)}
						/>

						<TouchableOpacity
							style={{
								width: "10%",
								alignItems: "center",
								marginHorizontal: "90%",
								bottom: "45%",
							}}
							onPress={getLocation}
						>
							<MaterialIcons name="my-location" size={23} color="grey" />
						</TouchableOpacity>
					</View>
					<InputBox
						inputLabel={"Site Incharge"}
						placeholder={"Enter Site Incharge"}
						onChange={(val) => setIncharge(val)}
						value={incharge}
						errors={errorMessage.incharge}
						isError={isError.incharge}
						keyboardType={"numeric"}
						// style={{ bottom: 20 }}
					/>
					<InputBox
						inputLabel={"Site Incharge Number"}
						placeholder={"Enter Site Incharge Number"}
						onChange={(val) => setNumber(val)}
						value={number}
						errors={errorMessage.number}
						isError={isError.number}
						maxLength={10}
						keyboardType={"numeric"}
						// style={{ bottom: 15 }}
					/>
					<View
						style={[styles.nextBtn, { backgroundColor: "white" }]}
					></View>
				</CustomForm>
			)}
		</>
	);
};

export default CreateZooSite;
