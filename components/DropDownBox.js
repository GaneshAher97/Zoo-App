/*Example of Expandable ListView in React Native*/
import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
//import react in our project
import {
	LayoutAnimation,
	StyleSheet,
	View,
	Text,
	ScrollView,
	UIManager,
	TouchableOpacity,
	Platform,
	Image,
	FlatList,
	SafeAreaView,
} from "react-native";
//import basic react native components
import { Bullets } from "react-native-easy-content-loader";


class ExpandableItemComponent extends Component {
	//Custom Component for the Expandable List
	constructor(props) {
		super();
		this.state = {
			layoutHeight: 0,
		};
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.item.isSelect) {
			this.setState(() => {
				return {
					layoutHeight: null,
				};
			});
		} else {
			this.setState(() => {
				return {
					layoutHeight: 0,
				};
			});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.layoutHeight !== nextState.layoutHeight) {
			return true;
		}
		return false;
	}

	render() {
		return (
			<View style={{ alignItems: "center", justifyContent: "space-around" }}>
				<TouchableOpacity
					onPress={this.props.onClickFunction}
					style={[
						styles.selectedChild2,
						{
							backgroundColor: this.props.item.isSelect
								? "green"
								: "white",
						},
					]}
				>
					<Text
						style={{
							textAlign: "center",
							color: this.props.item.isSelect ? "white" : "black",
							fontSize: 16,
						}}
					>
						{this.props.item.name}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default class Category extends Component {
	//Main View defined under this Class
	constructor(props) {
		super(props);
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
		this.state = {
			newCat: null,
			listDataSource: props.categoryData,
			catPresed: props.onCatPress,
			heading: props.heading,
			userType: props.userType,
			navigation: props.navigation,
			permission: props.permission,
			screen: props.screen,
			isMulti: props.isMulti,
		};
	}

	static getDerivedStateFromProps(props, state) {
		// Any time the current user changes,
		// Reset any parts of state that are tied to that user.
		// In this simple example, that's just the email.
		if (props.categoryData.length != state.listDataSource.length) {
			return {
				newCat: null,
				listDataSource: props.categoryData,
				catPresed: props.onCatPress,
				heading: props.heading,
				userType: props.userType,
				navigation: props.navigation,
				permission: props.permission,
				screen: props.screen,
			};
		}
		return null;
	}

	filterSubCat = (i) => {
		//console.log("I================>", i)
		const arrayy = [...this.state.listDataSource];
		arrayy.map((value, placeindex) =>
			placeindex === i
				? this.setState({ newCat: value })
				: console.log("None=========>")
		);
	};

	updateLayout = (index) => {
		this.filterSubCat(index);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		const array = [...this.state.listDataSource];
		if (!this.state.isMulti) {
			//For Single Expand at a time
			array.map((value, placeindex) =>
				placeindex === index
					? (array[placeindex]["isSelect"] =
							!array[placeindex]["isSelect"])
					: (array[placeindex]["isSelect"] = false)
			);
			this.state.catPresed(
				array.filter((element) => element.isSelect == true));
		} else {
			//For Multiple Expand at a time
			array[index]["isSelect"] = !array[index]["isSelect"];
			this.state.catPresed(
				array.filter((element) => element.isSelect == true)
			);
		}
		this.setState(() => {
			return {
				listDataSource: array,
			};
		});
	};

	render() {
		const { listDataSource, newCat, catPresed, heading, navigation, screen } =
			this.state;

		return (
			<>
				{listDataSource != "" ? (
					<View style={styles.container}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								backgroundColor: "#273238",
							}}
						>
							<Text style={styles.topHeading}>{this.state.heading}</Text>
							{this.state.userType == "admin" &&
							this.state.permission == "Yes" ? (
								<TouchableOpacity
									style={{
										paddingVertical: 5,
										paddingRight: 15,
										justifyContent: "center",
										alignItems: "center",
									}}
									onPress={() => {
										this.state.navigation.navigate(screen);
									}}
								>
									<AntDesign
										active
										name="edit"
										type="AntDesign"
										style={{
											color: "#fff",
											fontSize: 20,
										}}
									/>
								</TouchableOpacity>
							) : null}
						</View>

						<SafeAreaView
							style={{
								flexDirection: "row",
								flex: 1,
							}}
						>
							<View
								style={{
									width: "100%",
									borderColor: "#ccc",
									borderRightWidth: 1,
									alignItems: "center",
								}}
							>
								<FlatList
									data={listDataSource}
									extraData={listDataSource}
									showsVerticalScrollIndicator={false}
									numColumns={3}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<ExpandableItemComponent
											key={item.id}
											onClickFunction={this.updateLayout.bind(
												this,
												index
											)}
											onCatPressed={catPresed}
											item={item}
										/>
									)}
								/>
							</View>
						</SafeAreaView>
					</View>
				) : (
					<View style={styles.container}>
						<View
							style={{
								justifyContent: "space-between",
								backgroundColor: "#273238",
							}}
						>
							<Text style={styles.topHeading}>{this.state.heading}</Text>
						</View>
						<View style={{ marginTop: 10 }}>
							<Bullets active listSize={10} />
						</View>
					</View>
				)}
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// width: "90%",
		// maxHeight: 280,
		// marginTop: "auto",
		// paddingBottom: "10%",
		// marginRight: 10,
	},
	topHeading: {
		paddingLeft: 10,
		paddingVertical: 10,
		fontSize: 15,
		backgroundColor: "#273238",
		color: "#fff",
	},
	header: {
		backgroundColor: "#fff",
		height: 40,
		justifyContent: "center",
	},
	headerText: {
		fontSize: 15,
		fontWeight: "500",
		paddingLeft: 15,
	},
	separator: {
		height: 0.5,
		backgroundColor: "#808080",
		width: "95%",
		marginLeft: 16,
		marginRight: 16,
	},
	text: {
		fontSize: 15,
		color: "#606070",
		padding: 10,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 6,
		height: 40,
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
	selectedChild: {
		width: 100,
		height: 50,
		borderRadius: 12,
		marginLeft: "4%",
		marginTop: "5%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		flexDirection: "row",
		paddingLeft: 10,
		paddingRight: 10,
	},

	selectedChild2: {
		width: 100,
		height: 50,
		borderRadius: 12,
		margin: 10,
		alignItems: "center",
		justifyContent: "space-evenly",
		// backgroundColor: "white",
		borderColor: "green",
		borderWidth: 2,
		flexDirection: "row",
	},

	submit_Icon: {
		width: "100%",
		height: "14%",
		// borderWidth: 1,
		// borderColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
});
