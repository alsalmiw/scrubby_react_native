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
  const { childPage, setChildPage, userData, rState, mySpace, setTasks, setMyRoom, modalVisible, setModalVisible, taskModal, setTaskModal, childRooms, setChildRooms } = useContext(UserContext)


  // const [todayDate, setTodayDate] = useState<any>()

  const [space, setSpace] = useState<String>("")
  const [location, setLocation] = useState<String>("")
  const [coin, setCoin] = useState<String>("")
  const [insturction, setInstruction] = useState<String>("")
  const [title, setTitle] = useState<String>("")
  const [selectedTask, setSelectedTask]=useState<any[]>([])



  const [childTasks, setChildTasks] = useState<any>([])
  let newArr = ['bed', 'bathroom', 'kitchen']
  let r = Math.floor(Math.random() * 7)

  const ChildRooms = () => {
    setChildRooms(childPage.scheduledTasks);
  }

  useEffect(() => {
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
            <View style={styles.childName}>
              <Text style={{ fontSize: 20 }}>{childPage.dependentName}</Text>
            </View>

            <Text>{childPage.dependentAge} years old</Text>


            <View style={styles.coinContainer}>
              <CoinsPointsDisplayContainer coins={childPage.dependentCoins} points={childPage.dependentPoints} ></CoinsPointsDisplayContainer>
            </View>


          </View>
          <View style={styles.unlockIconView}>
            <Pressable onPress={() => { setModalVisible(true) }}>
              <FontAwesome5 name="unlock" size={40} color="grey" />
            </Pressable>
          </View>



        </View>

        <View style={styles.underLineView}>
          <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
          {childRooms != null ?
            childRooms.map((room: any) => {
              // missing logic to display task not completed and today and future task.
              return (

                room.rooms.filter((roomName: any, x: number) => roomName.tasksAssigned.length != 0
                ).map((roomWithTask: any, x: number) => {

                  return (<View key={x} style={styles.sqrBtn}>
                    <SquareColoredButton idx={x + rState + 1} onPress={() => { console.log(roomWithTask), setChildTasks(roomWithTask.tasksAssigned), setSpace(room.collectionName), setLocation(roomWithTask.spaceName) }}>
                      <View style={styles.sqrBtn}>
                        <Image style={styles.buttonSize} source={iconsMap.get(roomWithTask.spaceCategory)} />
                      </View>
                      <View style={styles.sqrBtn}>
                        <Text style={styles.sqrTxt}>{roomWithTask.spaceCategory}</Text>
                      </View>
                    </SquareColoredButton>
                  </View>
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
        <ScrollView style={styles.taskStyle}>

          {
            childTasks != null ?
              childTasks.map((taskName: any, x: number) => {


                return (
                  <TaskSpaceRowComponent key={x} idx={x} onPress={() => { setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name) }}>

                    <Text style={{ color: 'white', fontSize: 20 }}>{taskName.task.name + " " + taskName.item.name}</Text>

                  </TaskSpaceRowComponent>




                )
              })
              : null
          }
        </ScrollView>

        {modalVisible == true ?
          <ChildLockModalComponent /> : taskModal == true ?
            <TaskInfoModalComponent  Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} />
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
  myRoomScrollView: {
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    marginTop: "2%",
    marginBottom: "2%"
  },
  childName: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sqrBtn: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  taskStyle: {
    paddingLeft: "2.5%",
    marginTop: 5,
    marginBottom: 5
  },
  sqrTxt:{
    color: 'white', 
    flexShrink: 1, 
    fontSize: 13 
  }
});

export default ChildTasksScreen