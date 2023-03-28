//Update Native Base to Native Paper by - Anirban Pan
//Date - 10-03-2023
//Docs - follow the link "https://callstack.github.io/react-native-paper/4.0/text-input.html#error"


import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const InputBox = ({
	mode,
	inputLabel,
	placeholder,
	onChange,
	value,
	editable,
	rightElement,
	multiline,
	leftElement,
	numberOfLines,
	style,
	isError,
	errors,
	onPress,
	disabled,
	DropDown,
	onFocus,
	pointerEvents,
	...props
}) => {
	const [passwordShow, setPasswordShow] = useState(false);
	const [setDown, setSetDown] = useState(true)
	const handleIconDropDown = () => {
		setSetDown(!setDown)
		DropDown(setDown)
	}
	let propsCustom = {
		mode: mode === undefined || mode === "" ? "outlined" : mode,
		inputLabel:
			inputLabel === undefined || inputLabel === "" ? "Label" : inputLabel,
		placeholder:
			placeholder === undefined || placeholder === ""
				? "Placeholder"
				: placeholder,
		onChange: onChange === undefined ? () => { } : onChange,
		multiline:
			multiline === undefined || multiline === "" ? false : multiline,
		numberOfLines:
			numberOfLines === undefined || numberOfLines === ""
				? 5
				: numberOfLines,
		style:
			style === undefined || style === "" ? styles.inputContainer : style,
		    	
	};

	return (
		<>
			<TextInput
				mode={propsCustom.mode}
				label={propsCustom.inputLabel}
				secureTextEntry={passwordShow}
				style={propsCustom.style}
				pointerEvents={pointerEvents}
				placeholder={propsCustom.placeholder}
				onChangeText={propsCustom.onChange}
				multiline={propsCustom.multiline}
				value={value}
				numberOfLines={propsCustom.numberOfLines}
				disabled={disabled}
				editable={editable}
				right={
					inputLabel == "Password" ? (
						<TextInput.Icon
							icon={(props) => (
								<Pressable
									onPress={() => setPasswordShow(!passwordShow)}
								>
									<MaterialCommunityIcons
										{...props}
										name={passwordShow ? "eye" : "eye-off"}
										size={25}
										style={{ color: "gray" }}
									/>
								</Pressable>
							)}
						/>
					) : (
						<TextInput.Icon
							icon={rightElement}
							onPress={() => handleIconDropDown()}
						/>
					)
				}
			// left={
			//   inputLabel == "Password" ? (
			//     <TextInput.Icon
			//       icon={(props) => (
			//         <MaterialCommunityIcons
			//           {...props}
			//           name={"key"}
			//           size={25}
			//           style={{ color: "gray" }}
			//         />
			//       )}
			//     />
			//   ) : (
			//     <>{leftElement}</>
			//   )
			// }
			/>
			{isError ? (
				<Text style={{ color: "red", fontSize: 13 }}>{errors}</Text>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		position: "relative",
		zIndex: 0,
		marginVertical: 8
	},
	// label: {
	//   marginTop: 20,
	//   fontSize: 5,
	//   fontWeight: "200",
	// },
	// inputFlieds: {
	//   fontSize: 12,
	//   color: "black",
	//   borderColor: "#00008B",
	// },
});

export default InputBox;


