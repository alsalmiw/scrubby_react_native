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

import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';



type Props = NativeStackScreenProps<RootStackParamList, 'ChildTasks'>

const ChildTasksScreen: FC<Props> = ({ navigation }) => {
  const { childPage, setChildPage, userData, rState, mySpace, setTasks, setMyRoom, modalVisible, setModalVisible, taskModal, setTaskModal } = useContext(UserContext)
  const [childRooms, setChildRooms] = useState<any>([])

  const [todayDate, setTodayDate] = useState<any>()

  const [space, setSpace] = useState<any>()
  const [location, setLocation] = useState<any>()
  const [coin, setCoin] = useState<any>()
  const [insturction, setInstruction] = useState<any>()
  const [title, setTitle] = useState<any>()



  const [childTasks, setChildTasks] = useState<any>([])
  let newArr = ['bed', 'bathroom', 'kitchen']
  let r = Math.floor(Math.random() * 7)

  const ChildRooms = () => {
    setChildRooms(childPage.scheduledTasks);
  }

  const getDate = () => {
    var isoDate = new Date().toISOString()
    console.log(isoDate)
    setTodayDate(isoDate)
  }

  const childLock = () => {


  }


  // const taskModal = (head:string, one:string, two:string, three:string, coin:string, point:string) =>{
  //   {console.log('work')}
  //   <TaskInfoModalComponent headerTitle={head} underLineOne={one} underLineTwo ={two} underLineThree={three} coins={coin} points={point} />

  // }

  useEffect(() => {
    console.log("________________________________________")
    console.log(childPage.scheduledTasks)
    console.log("________________________________________")
    getDate();
    ChildRooms();

  }, [])




  return (

    <View style={styles.container}>
      <View>
        <View>
          <HeaderComponent title='My Tasks'></HeaderComponent>
        </View>

        <View style={{ flexDirection: 'row' }}>
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
          <View style={styles.unlockIconView}>
            <Pressable onPress={() => { setModalVisible(true), console.log('ll') }}>
              <FontAwesome5 name="unlock" size={40} color="black" />
            </Pressable>

            {/* <TaskInfoModalComponent /> */}
          </View>



        </View>

        <View style={styles.underLineView}>
          <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {childRooms != null ?
            childRooms.map((room: any) => {
              // missing logic to display task not completed and today and future task.
              return (

                room.rooms.filter((roomName: any, x: number) => roomName.tasksAssigned.length != 0
                ).map((roomWithTask: any, x: number) => {

                  return (
                    <SquareColoredButton key={x} idx={x + rState + 1} onPress={() => { setChildTasks(roomWithTask.tasksAssigned), setSpace(room.collectionName), setLocation(roomWithTask.spaceName), console.log("-----------------------") }}>
                      <Text style={{ color: 'white' }}>{roomWithTask.spaceCategory}</Text>
                    </SquareColoredButton>
                  )
                })


              )
            })
            : null
          }

        </ScrollView>

        <View style={styles.underLineView}>
          <UnderlinedOneHeaderComponent titleFirst={'Tasks'}></UnderlinedOneHeaderComponent>
        </View>
        <ScrollView>
          {/* task */}
          {
            childTasks != null ?
              childTasks.map((taskName: any, x: number) => {
                console.log(taskName)

                return (
                  <TaskSpaceRowComponent key={x} idx={x} onPress={() => { setTaskModal(true), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name) }}>
                    <Text style={{ color: 'white' }}>{taskName.task.name}</Text>

                  </TaskSpaceRowComponent>




                )
              })
              : null
          }
        </ScrollView>

        {modalVisible == true ?
          <ChildLockModalComponent /> : taskModal == true ?
            <TaskInfoModalComponent headerTitle={title} Space={space} Location={location} Instruction={insturction} coins={coin} points={coin} />
            : null}



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
  underLineView: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  unlockIconView: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingRight: 10,
    marginTop: 10,
    height: 100
  },
});

export default ChildTasksScreen