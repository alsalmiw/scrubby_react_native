// import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Pressable, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import UserContext from '../../context/UserContext';
import RootStackParamList from '../../types/INavigateProfile';
import AvatarComponent from '../../components/AvatarComponent';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
///
import { FontAwesome5 } from '@expo/vector-icons';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import ChildLockModalComponent from '../../components/Modal/ChildLockModalComponent';
import { GetTasksByRoomId } from '../../services/dataService';
import TaskInfoModalComponent from '../../components/Modal/TaskInfoModalComponent';



type Props = NativeStackScreenProps<RootStackParamList, 'ChildTasks'>

const ChildTasksScreen: FC<Props> = ({ navigation }) => {
  const { childPage, setChildPage, userData, rState, mySpace, setTasks, setMyRoom, setModalVisible } = useContext(UserContext)


  const [childTasks, setChildTasks] = useState<object>([])
  let newArr = ['bed', 'bathroom', 'kitchen']
  let r = Math.floor(Math.random() * 7)



  useEffect(() => {
    console.log(childPage)

  }, [])




  return (

    <View style={styles.container}>
      <View>
        <View>
          <HeaderComponent title='My Tasks'></HeaderComponent>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={styles.firstRow}>
            <AvatarComponent onPress={() => console.log('hi')} imageSource={userData.photo} />
          </View>


          <View style={styles.nameAndCoinContainer}>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-evenly', }}>
              <Text style={{ fontSize: 20 }}>{childPage.dependentName}</Text>
            </View>

            <Text>{childPage.dependentAge} years old</Text>


            <View style={styles.coinContainer}>
              <CoinsPointsDisplayContainer coins={childPage.dependentCoins} points={childPage.dependentPoints} ></CoinsPointsDisplayContainer>
            </View>


          </View>
          <View style={styles.unlockedIcon}>
            <Pressable onPress={() => { setModalVisible(true) }}>
              <FontAwesome5 name="unlock" size={40} color="black" />
            </Pressable>
            {/* <ChildLockModalComponent /> */}
            <TaskInfoModalComponent />
          </View>



        </View>

        <View style={styles.underlinedView}>
          <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/* <ShowRooms /> */}

        </ScrollView>

        <View style={styles.underlinedView}>
          <UnderlinedOneHeaderComponent titleFirst={'Tasks'}></UnderlinedOneHeaderComponent>
        </View>
        <ScrollView>
          {/* task */}
        </ScrollView>



      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight
  },
  coinContainer: {
    marginTop: '6%',
    alignItems: 'center',
    width: '100%'
  },
  nameAndCoinContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    paddingLeft: 0,
    marginLeft: 0

  },
  firstRow: {
    marginVertical: '0%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSize: {
    width: 50, height: 50
  },
  underlinedView: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  unlockedIcon: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    upaddingTop: 10,
    paddingRight: 10,
    marginTop: 10,
    height: 100
  }
});

export default ChildTasksScreen