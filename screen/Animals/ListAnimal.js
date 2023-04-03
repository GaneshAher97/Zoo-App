// whole component created by Ganesh 
// Date:- 3 April 2023

import { View, Text, StyleSheet,FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import moment from 'moment';
import AppContext from '../../context/AppContext';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import ListComponent from '../../components/ListComponent';
// import { deletetEducation,  } from '../../services/EducationService';
import { getAnimal } from '../../services/AnimalServices';

const ListAnimal = (props) => {
  const navigation = useNavigation()
  const context = useContext(AppContext);

  const [animalDetails, setAnimalDetails] = useState([])
  const [user_id, setuser_id] = useState(props.route.params?.item?.user_id ?? context.userDetails.user.user_id)
  const [isLoading, setIsLoding] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation])

  const getData = () => {
    setIsLoding(true)
    getAnimal({ user_id }).then((res) => {
      setAnimalDetails(res.data)
    }).finally(() => {
      setIsLoding(false)
      console.log("ok========++");
    })

  }


  const InnerList = ({ item }) => {

    const { 
      
      animal_id, local_id, taxonomy_id,enclosure_id,accession_type,
      birth_date, birth_type,birth_location, nest_location,sex,accession_status,
      clutch_id ,description,created_by,update_by,created_at, modified_at 
    } = item.item;

    return (
      <View style={{ flex: 1, }}>
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <Text>ID:</Text>
            <Text style={styles.idNumber}>{`#${animal_id}`}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>local_id :</Text>
          <Text style={styles.idNumber}>{local_id}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>taxonomy_id:</Text>
          <Text style={styles.idNumber}>{taxonomy_id}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>enclosure_id : </Text>
          <Text style={styles.idNumber}>{enclosure_id}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>accession_type:</Text>
          <Text style={styles.idNumber}>{accession_type}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>birth_date:</Text>
          <Text style={styles.idNumber}>{moment(birth_date).format("do MMM YY , LT")}</Text>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
          <Text>birth_type:</Text>
          <Text style={styles.idNumber}>{birth_type}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>birth_location :</Text>
          <Text style={styles.idNumber}>{birth_location}</Text>
          {/* <Text style={styles.idNumber}>{moment(birth_location).format("do MMM YY , LT")}</Text> */}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>nest_location:</Text>
          <Text style={styles.idNumber}>{nest_location}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>sex:</Text>
          <Text style={styles.idNumber}>{sex}</Text>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <Text>accession_status:</Text>
          <Text style={styles.idNumber}>{accession_status}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>clutch_id :</Text>
          <Text style={styles.idNumber}>{clutch_id}</Text>
          
          {/* <Text style={styles.idNumber}>{moment(clutch_id).format("do MMM YY , LT")}</Text> */}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>description:</Text>
          <Text style={styles.idNumber}>{description}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>created_by :</Text>
          <Text style={styles.idNumber}>{created_by}</Text>
          {/* <Text style={styles.idNumber}>{moment(created_by).format("do MMM YY , LT")}</Text> */}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>update_by:</Text>
          <Text style={styles.idNumber}>{update_by}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>created_at :</Text>
          <Text style={styles.idNumber}>{moment(created_at).format("do MMM YY , LT")}</Text>
        </View>



        <View style={{ flexDirection: 'row' }}>
          <Text>modified_at :</Text>
          <Text style={styles.idNumber}>{moment(modified_at).format("do MMM YY , LT")}</Text>
        </View>

        

      </View>
    )
  }




  return (
    <View style={{ flex: 1 }}>
      <Header noIcon={true} title={'Animals'} />
      <View style={{ flex: 1 }}>

        {
          isLoading ? <Loader /> :

            <View style={styles.container}>

              <FlatList
                data={animalDetails}
                renderItem={item => <ListComponent item={item}
               
                  onPressEdit={() => navigation.navigate('CreateEducation', { item: item })}
                >
                  <InnerList item={item} />
                </ListComponent>}
                keyExtractor={item => item.id}
              />

              <FloatingButton
                icon="plus"
                backgroundColor="#eeeeee"
                borderWidth={0}
                borderColor="#aaaaaa"
                borderRadius={50}
                linkTo=""
                floaterStyle={{ height: 60, width: 60 }}
                onPress={() => navigation.navigate("CreateEducation", { item: {user_id} })}
              />
            </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'


  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  idNumber: {
    marginLeft: 3,
    fontWeight: '500'
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }




})

export default ListAnimal;