import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { View,Text } from "react-native";
import { getAnimal } from "../../services/DispositionService";
const [animalData,setAnimalData] = useState([])

const ListAnimal =()=>{
    const navigation = useNavigation();

    useEffect(() => {
        getAnimal().then((res) => {
            console.log(res, 'res............................')
            setAnimalData(res.data);
        })

    }, [])


    return(
        <View>
            <Text>
                {animalData}
            </Text>
        </View>
    )
}
export default ListAnimal;