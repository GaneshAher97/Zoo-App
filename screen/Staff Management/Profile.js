import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';

import LinkTab from '../../components/LinkTab';
import Header from '../../components/Header';

export default function Profile() {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.usernameAndGreeting}>
            <View>
              <Text style={styles.username}>Hi Raasa</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Welcome back!</Text>
            </View>
          </View>
          <View>
            <AntDesign name="search1" size={26} color="#999999" />
          </View>
        </View>

        <View style={styles.profileImageBar}>
          <View style={styles.profileImageSection}>
            <FontAwesome name="user-circle" size={60} color="#999999" />
          </View>
          <View style={styles.profileCreditSection}>
            <View style={styles.profileCredit}>
              <Text style={styles.number}>23</Text>
              <Text style={styles.text}>Weeks</Text>
            </View>
            <View style={styles.profileCredit}>
              <Text style={styles.number}>4.5</Text>
              <Text style={styles.text}>Rating</Text>
            </View>
            <View style={styles.profileCredit}>
              <Text style={styles.number}>614</Text>
              <Text style={styles.text}>Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileDetails}>
          <View>
            <Text style={styles.profileName}>Raasa Bharathi</Text>
          </View>
          <View>
            <Text style={styles.profileDesignation}>Caretaker</Text>
          </View>
        </View>

        <SafeAreaView>
          <ScrollView>
            <LinkTab
              tabIcon={<FontAwesome name="circle" size={50} color="#999999" />}
              tabText='Edit Profile'
              onPress={() => { console.log('Hi!'); }}
            />
            <LinkTab
              tabIcon={<FontAwesome name="circle" size={50} color="#999999" />}
              tabText='My Journal'
              onPress={() => { console.log('Hi!'); }}
            />
            <LinkTab
              tabIcon={<FontAwesome name="circle" size={50} color="#999999" />}
              tabText='My Settings'
              navigateIcon={<AntDesign name="right" size={30} color="#999999" />}
              onPress={() => { console.log('Hi!'); }}
            />
            <LinkTab
              tabIcon={<FontAwesome name="circle" size={50} color="#999999" />}
              tabText='My Rewards'
              navigateIcon={<AntDesign name="right" size={30} color="#999999" />}
              onPress={() => { console.log('Hi!'); }}
            />
            <LinkTab
              tabIcon={<FontAwesome name="circle" size={50} color="#999999" />}
              tabText='Logout'
              onPress={() => { console.log('Hi!'); }}
            />
          </ScrollView>
        </SafeAreaView>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // container
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: '5%',
    backgroundColor:"white"
  },

  // topBar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '4%',
  },
  username: {
    fontSize: 26,
    color: '#ff1a1a',
  },
  greeting: {
    fontSize: 16,
    color: 'ffffff'
  },

  // profileImageBar
  profileImageBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '4%',
  },
  profileImageSection: {
    flex: 3,
  },
  profileCreditSection: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  // profileDetails 
  profileDetails: {
    marginVertical: '4%',
  },
  profileName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  profileDesignation: {
    fontSize: 16,
    marginVertical: '1%',
  },
});
