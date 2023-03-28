import { View, Text, ScrollView,SafeAreaView } from "react-native";
import React from "react";
import styles from "../configs/Styles";
import Header from "./Header";

const CustomForm = (props) => {
	return (
		<SafeAreaView style={{flex:1,marginBottom:50}}>
			{props.header ? <Header onPress={props.onPress} /> : null}
			<View style={styles.body}>
				{props.title ? (
					<Text style={styles.headerTitle}>{props.title}</Text>
				) : null}
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.body}>
						<View isRequired>{props.children}</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default CustomForm;
