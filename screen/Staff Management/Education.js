//Create by: Gaurav Shukla
//Create on :21/02/2023

import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import CustomForm from '../../components/CustomForm';
import InputBox from '../../components/InputBox';
import { createEducationType } from '../../services/CreateEducationTypeService';
import { useNavigation } from "@react-navigation/native";
import Loader from '../../components/Loader';
import { useSelector} from "react-redux";

const Education = () => {
    const navigation = useNavigation();
    const [instituteName, setInstituteName] = useState("")
    const [passingYear, setPassingYear] = useState("")
    const [educationType, setEducationType] = useState("")
    const [course, SetCourse] = useState("")
    const [marks, setMarks] = useState("")
    const [isLoading, setLoding] = useState(false);
    // const [error, setError] = useState({});
    const [errorMessage, setErrorMessage] = useState({
		instituteName: null,
		passingYear: null,
        educationType:null,
        course:null,
        marks:null,

	});

    const [isError, setIsError] = useState({
		instituteName: false,
		passingYear: false,
        educationType:false,
        course:false,
        marks:false
	});
    const clientID = useSelector(state => state.UserAuth.client_id)

    console.log(instituteName, passingYear, educationType, course, marks, ">>>>>")
    const checkName = (str) => {
		let res = str.match(/^[A-Za-z / /]+$/) ? false : true;
		// console.log(res);
		return res;
	};

    // const validation = () => {
	// 	// console.log("hello validation");
    //     const nameRegex = /[A-Za-z]/;
    //     const numericRegex = /^[0-9\b]+$/;
		
    //     if(instituteName.trim().length===0 || !nameRegex.test(instituteName)){
    //         setIsError({instituteName:true})
    //         setErrorMessage({instituteName:"Institute Name is required"})
    //         return false
    //     }
    //     else if (passingYear.trim().length ===0 || !numericRegex.test(passingYear)) {
	// 		setIsError({passingYear:true})
    //         setErrorMessage({passingYear:"Enter passing year"})
	// 		return false;
	// 	}
    //     else if (educationType.trim().length ===0  || !nameRegex.test(educationType)) {
	// 		setIsError({educationType:true})
    //         setErrorMessage({educationType:"Enter Education Type"})
	// 		return false;
	// 	}
    //     else if (course.trim().length ===0  || !nameRegex.test(course)) {
	// 		setIsError({course:true})
    //         setErrorMessage({course:"Enter Course Type"})
	// 		return false;
	// 	}
    //     else if (marks.trim().length ===0  || !numericRegex.test(marks)) {
	// 		setIsError({marks:true})
    //         setErrorMessage({marks:"Enter marks "})
	// 		return false;
	// 	}
       
       
    //     return true
		
	// };

    const CreateTypeEdu = () =>{

        setIsError({});
        setErrorMessage({});

        
		
        if(instituteName.trim().length===0 )
        {
            setIsError({instituteName:true})
            setErrorMessage({instituteName:"Institute Name is required"})
            return false
        }
        else if (checkName(instituteName)) {
			setIsError({ instituteName: true });
			setErrorMessage({
				instituteName: "institute name can contains only alphabets",
			});
			return false;
        }
        else if (passingYear.trim().length ===0) 
        {
			setIsError({passingYear:true})
            setErrorMessage({passingYear:"Enter passing year"})
			return false;
		}
        else if (educationType.trim().length ===0 ) 
        {
			setIsError({educationType:true})
            setErrorMessage({educationType:"Enter Education Type"})
			return false;
		}
        else if (course.trim().length ===0) 
        {
			setIsError({course:true})
            setErrorMessage({course:"Enter Course Type"})
			return false;
		}
        else if (marks.trim().length ===0) 
        {
			setIsError({marks:true})
            setErrorMessage({marks:"Enter marks "})
			return false;
		}
        else
        {
            let obj = {
                type_name : educationType,
                client_id : clientID
            }
            
            console.log("dfgdfgfdfdghfdgfdg---=-=-",obj)
            setLoding(true);
            createEducationType(obj)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoding(false);
                navigation.goBack();
                Alert.alert("Education type is added successfully")
                // console.log("ok Ashu =>>>>>>=====");
            });;
                setEducationType("")
                setInstituteName("")
                setMarks("")
                setPassingYear("")
                SetCourse("")
                setErrorMessage("")
        } 
      
    }
    
    return (
        <>
            {isLoading ? (
            <Loader loaderSize="lg" />
            ) 
            : (
            <CustomForm header={true} title={"Education"} onPress={CreateTypeEdu}>
            <InputBox
                inputLabel={"Institute Name"}
                placeholder={"Enter Institute Name"}
                keyboardType={"character"}
                onChange={(e) => setInstituteName(e)}
                value={instituteName}
                errors={errorMessage.instituteName}
                isError={isError.instituteName}
                
            />
            <InputBox
                inputLabel={"Year of Passing"}
                placeholder={"Enter Passing Year"}
                keyboardType = {'numeric'}
                onChange={(value) => setPassingYear(value)}
                value={passingYear}
                minLength={4}
                maxLength={4}
                errors={errorMessage.passingYear}
                isError={isError.passingYear}
               
            />
            <InputBox
                inputLabel={"Choose Education Type"}
                placeholder={"Education Type"}
                onChange={(value) => setEducationType(value)}
                value={educationType}
                errors={errorMessage.educationType}
                isError={isError.educationType}
            />
            <InputBox
                inputLabel={"Course"}
                onChange={(value) => SetCourse(value)}
                value={course}
                placeholder={"Enter Course Name"}
                errors={errorMessage.course}
                isError={isError.course}
            />
            <InputBox
                inputLabel={"Marks (%)"}
                keyboardType = {'numeric'}                
                onChange={(value) => setMarks(value)}
                maxLength={3}
                value={marks}
                placeholder={"Marks in %"}
                errors={errorMessage.marks}
                isError={isError.marks}
            />
          
            </CustomForm>
            )}
        </>
    )
}
export default Education;
