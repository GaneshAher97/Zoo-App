
import React, { useEffect, useState } from 'react'
import { addEducation, editEducation, getListEducation } from '../../../services/EducationService';
import InputBox from "../../../components/InputBox";
import CustomForm from "../../../components/CustomForm";
import { useNavigation } from '@react-navigation/native';
import { getSection } from '../../../services/staffManagement/getEducationType';
import NewDropdown from '../../../components/Dropdown';
import Category from "../../../components/DropDownBox";
import Loader from '../../../components/Loader';
import { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { View } from 'react-native';

const CreateEducation = (props) => {

  
  const navigation = useNavigation()

  const context = useContext(AppContext);
  const [user_id, setuser_id] = useState(props.route.params?.item?.user_id ?? context.userDetails.user.user_id)

  const [id, setId] = useState(props.route.params?.item?.item?.education_id ?? 0);
  const [eduValue, setEduValue] = useState(props.route.params?.item.item?.education_type ?? "");
  const [institutionValue, setInstitutionValue] = useState(props.route.params?.item.item?.institution_name ?? "");
  const [passoutValue, setPassoutValue] = useState(props.route.params?.item.item?.year_of_passout ?? "");
  const [courseValue, setCourseValue] = useState(props.route.params?.item.item?.course ?? "");
  const [marksValue, setMarksValue] = useState(props.route.params?.item.item?.marks ?? "");
  const [isLoading, setIsLoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [isError, setIsError] = useState({});
  const [data, setData] = useState("");
  const [sectionData, setSectionData] = useState([]);
  const [educationDown, setEducationDown] = useState(false);
  // const [siteDropDown, setSiteDropDown] = useState()

  const dataEducationType = [
   
        {
          id: 0,
          name: "html",
        },
        
        {
          id: 1,
          name: "react",
        },
        {
          id: 2,
          name: "native",
        },
        {
          id: 3,
          name: "Nativepaper",
        },
  ]

  const validation = () => {
    setIsError({});
    setErrorMessage({});
    if (eduValue.length === 0) {
      setIsError({ eduValue: true })
      setErrorMessage({ eduValue: "Enter Education Type*" })
      return false;
    } else if (institutionValue.trim().length === 0) {
      setIsError({ institutionValue: true })
      setErrorMessage({ institutionValue: "Enter Institution Name*" })
      return false;
    } else if (passoutValue.trim().length === 0) {
      setIsError({ passoutValue: true })
      setErrorMessage({ passoutValue: "Enter Passout Year*" })
      return false;
    } else if (courseValue.trim().length === 0) {
      setIsError({ courseValue: true })
      setErrorMessage({ courseValue: "Enter Course Name*" })
      return false;
    } else if (marksValue.trim().length === 0) {
      setIsError({ marksValue: true })
      setErrorMessage({ marksValue: "Enter marks here*" })
      return false;
    }
    return true;
  };

  const catPressed = (item) => {
    // console.log('item==========>', item);
    // setData(item.map((u) => u.name).join(", "));
    item.map((value)=>{
      setData(value.name)
    })
  };

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

  const addEducationdata = () => {
    if (validation()) {
      var obj = {
        education_type: eduValue,
        institution_name: institutionValue,
        year_of_passout: passoutValue,
        course: courseValue,
        marks: marksValue,
        id: 2,
      };
      setIsLoding(true);
      // console.log("obj data========>", obj);
      addEducation(obj)
        .then((res) => {
          console.log("response==========+>", res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoding(false);
          navigation.goBack();
          console.log("ok===========");
          alert("Add Education successfuly")
        });
    };

  };


  const editEducationData = () => {
    if (validation()) {
      var obj = {
        education_type: eduValue,
        education_type: data,
        institution_name: institutionValue,
        year_of_passout: passoutValue,
        course: courseValue,
        marks: marksValue,

      };
      setIsLoding(true);
      console.log("obj data========>", obj);
      editEducation(obj)
        .then((res) => {

          console.log("response==========+>", res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoding(false);
          // navigation.goBack();
          console.log("ok===========");
          alert("User Education update successfuly")
        });
    }
  }

  // const getEducationTypeData = (item) => {
  //   const dataEducation = item.id
  //   setEduValue(dataEducation)
  //   // console.log("Data is Movable*********", eduValue);
  // }
  const SetDropDown =(data)=>{
    setEducationDown(data)
  }
  return (
    <>
      {
        isLoading ? <Loader/> :
          <CustomForm
            header={true}
            title={"Add Education"}
            onPress={id > 0 ? editEducationData : addEducationdata}
            marginBottom={50}
          >

            {/* <NewDropdown
              title="Education Type"
              data={dataEducationType}
              afterPressDropdown={getEducationTypeData}
              errors={errorMessage.eduValue}
              isError={isError.eduValue}
            /> */}

               <InputBox
                    editable={false}
                    inputLabel="Education Type"
                    value={data}
                    placeholder="Select Section Name"
                    rightElement={educationDown ? "chevron-up":"chevron-down"}
                    DropDown={SetDropDown}
                    errors={errorMessage.eduValue}
                    isError={isError.eduValue}
                />
               

            <InputBox
              inputLabel={"Enter institution name"}
              placeholder={"Enter institution name"}
              onChange={(val) => setInstitutionValue(val)}
              value={institutionValue}
              defaultValue={institutionValue != null ? institutionValue : null}
              isError={isError.institutionValue}
              errors={errorMessage.institutionValue}
              keyboardType={"default"}

            />
            <InputBox
              inputLabel={"Enter year of passout"}
              placeholder={"Enter year of passout"}
              onChange={(val) => setPassoutValue(val)}
              value={passoutValue}
              defaultValue={passoutValue != null ? passoutValue : null}
              isError={isError.passoutValue}
              errors={errorMessage.passoutValue}
              keyboardType={"numeric"}
              maxLength={4}
            />
            <InputBox
              inputLabel={"Enter course name"}
              placeholder={"Enter course name"}
              onChange={(val) => setCourseValue(val)}
              value={courseValue}
              defaultValue={courseValue != null ? courseValue : null}
              isError={isError.courseValue}
              errors={errorMessage.courseValue}
              keyboardType={"default"}

            />
            <InputBox
              inputLabel={"Enter your marks"}
              placeholder={"Enter marks in %"}
              onChange={(val) => setMarksValue(val)}
              value={marksValue}
              defaultValue={marksValue != null ? marksValue : null}
              isError={isError.marksValue}
              errors={errorMessage.marksValue}
              keyboardType={"numeric"}
              maxLength={3}
            />
          </CustomForm>
          
          
      }
 {educationDown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={dataEducationType}
                        onCatPress={catPressed}
                        heading={"Choose Education Type"}
                        
                        isMulti={false}
                    />
                </View>
            ) : null}


    </>
  )
}

export default CreateEducation;
