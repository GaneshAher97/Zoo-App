
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import CustomForm from '../../../components/CustomForm'
import Loader from '../../../components/Loader'
import { EditSite, getZooSite, PostSite } from '../../../services/AddSiteService'
import NewDropdown from '../../../components/Dropdown'
import { View } from 'react-native'
import InputBox from '../../../components/InputBox'
import Category from '../../../components/DropDownBox'
import AppContext from '../../../context/AppContext'


const items = [
  {
    category_id: 1,
    category_name: "FullAccess",
    category_type: 1,
    isExpanded: true,
    subcategory: [
      {
        id: 0,
        val: "No",
      },
      {
        id: 1,
        val: "Yes",
      },

    ],
  },
]

const activeitem = [{
  category_id: 1,
  category_name: "Active",
  category_type: 1,
  isExpanded: true,
  subcategory: [
    {
      id: 0,
      val: "No",
    },
    {
      id: 1,
      val: "Yes",
    },

  ],
},
]


const CreateSite = (props) => {
  const navigation = useNavigation();
  const context =useContext(AppContext);
  const [fullAccess, setFullAccess] = useState(props.route.params?.item.full_access ?? "");
  const [getSite, setSite] = useState([]);
  const [siteDropDown, setSiteDropDown] = useState("");
  const [data, setData] = useState("");
  const [id, setId] = useState(0);
  const [active, setActive] = useState(props.route.params?.item.active ?? "");
  const [loading, setLoding] = useState("");
  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const catPressed = (item) => {
    setData(item.map((u) => u.name).join(", "));
    setId(item.map((id) => id.id).join(','));
    setSiteDropDown(!siteDropDown)
  }

  useEffect(() => {
    getZooSite(context.userDetails.user.zoos[0].zoo_id).then((res) => {
      let getdata = res.data.map((item) => {
        return {
          id: item.site_id,
          name: item.site_name
        }
      })
      setSite(getdata);
      // console.log("****************ZooSite",getSite)
    })
  }, [])

  const validation = () => {
    if (fullAccess.length === 0) {
      setIsError({ fullAccess: true })
      setErrorMessage({ fullAccess: "Select Full Access Options" })
      return false;
    } else if (data.length === 0) {
      setIsError({ data: true })
      setErrorMessage({ data: "Select Site Options" })
      return false;
    } else if (active.length === 0) {
      setIsError({ active: true })
      setErrorMessage({ active: "Select Active Options" })
      return false;
    }
    return true;
  };

  const PostSiteData = () => {
    if (validation()) {
      let obj = {
        full_access: fullAccess,
        site_id: id,
        active: active,
      }
      setLoding(true);
      PostSite(obj).then((res) => {
        setLoding(false);
        console.log("response by gaurav--->>>>", res)
        if (res.success) {
          navigation.goBack();
          alert("Added Successfully");
        } else (
          alert("Something Went Wrong !")
        )
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  const EditOnSubmit = () => {
    if (validation()) {
      let obj = {
        id: id,
        full_access: fullAccess,
        site_id: id,
        active: active,
      }
      setLoding(true);
      EditSite(obj).then((res) => {
        setLoding(false);
        console.log("hello this is response edit--->>>>", res)
        if (res.success) {
          navigation.goBack();
          alert("Added Successfully");
        } else (
          alert("Something Went Wrong !")
        )
      }).catch((err) => {
        console.log(err, "Validation Edit error");
      });
    }
  }

  const getFullAccessData = (item) => {
    const accessdata = item.id
    setFullAccess(accessdata)
  }

  const getActiveData = (item) => {
    const activeData = item.id
    setActive(activeData)
  }

  const SetDropDown = (data) => {
    setSiteDropDown(data)
}
  return (
    <>
      {loading ? <Loader /> : <CustomForm header={true} title={"Add Site"}
        onPress={PostSiteData}>
        <NewDropdown
          title="FullAccess"
          data={items}
          afterPressDropdown={getFullAccessData}
          errors={errorMessage.fullAccess}
          isError={isError.fullAccess}
        />

        <View style={{ marginTop: 20 }}>
          <InputBox
            editable={false}
            inputLabel="Section Name"
            value={data}
            placeholder="Select Section Name"
            rightElement="chevron-down"
            DropDown={SetDropDown}
            errors={errorMessage.data}
            isError={isError.data}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <NewDropdown
            title="Active"
            data={activeitem}
            afterPressDropdown={getActiveData}
            errors={errorMessage.active}
            isError={isError.active}
          />
        </View>
      </CustomForm>}
      {siteDropDown ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Category
                        categoryData={getSite}
                        onCatPress={catPressed}
                        heading={"Choose Section"}
                        userType={"admin"}
                        navigation={props.navigation}
                        permission={"Yes"}
                        screen={"AddCategory"}
                        isMulti={false}
                    />
                </View>
            ) : null}
    </>

  )
}
export default CreateSite;


