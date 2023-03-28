//Create by: Gaurav Shukla
//Create on :21/02/2023
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import Header from '../components/Header';
import styles from '../configs/Styles';
import { useNavigation } from '@react-navigation/native';

const data = [{
    id: 1,
    fullName: "User",
    avatarUrl: "https://www.admitek.com/wp-content/uploads/2017/04/User.png",
    screen: "ListStaff"
}, {
    id: 2,
    fullName: "Sites",
    avatarUrl: "https://printablefreecoloring.com/drawing/animals/coloring-zoo-12643.jpg",
    screen: "ListSite"
}, {
    id: 3,
    fullName: "Sections",
    avatarUrl: "https://img.freepik.com/free-vector/different-kinds-bird-cartoon-illustration-set-tomtit-robin-starling-woodpecker-sparrow-sitting-tree-branch-isolated-white-background-winter-birds-concept_74855-24087.jpg?w=2000",
    screen: "ListSection"
}, {
    id: 4,
    fullName: "Enclosures",
    avatarUrl: "https://a-z-animals.com/media/2022/06/Lovebirds-on-fence.jpg",
    screen: "EnclosureList"
},];

const Module = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <Header noIcon={true} title={"Module"} />
            <View style={styles.flatListBox}>
                <FlatList
                    data={data}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <View>
                        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                            <View style={styles.imageBox}>
                                <Image
                                    size={40}
                                    source={{
                                        uri: item.avatarUrl
                                    }}
                                    style={{ height: 170, width: 170, borderRadius: 15 }}
                                    alt={item.fullName}
                                />
                                <View>
                                    <Text style={styles.imageName}>
                                        {item.fullName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>} keyExtractor={item => item.id} />
            </View>
        </View>
    )
}
export default Module;
