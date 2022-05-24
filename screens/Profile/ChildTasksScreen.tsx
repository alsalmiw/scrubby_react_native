// import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Pressable, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import UserContext from '../../context/UserContext';
import RootStackParamList from '../../types/INavigation';
import AvatarComponent from '../../components/AvatarComponent';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
////
import { FontAwesome5 } from '@expo/vector-icons';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import ChildLockModalComponent from '../../components/Modal/ChildLockModalComponent';
import { GetTasksByRoomId } from '../../services/dataService';
import TaskInfoModalComponent from '../../components/Modal/TaskInfoModalComponent';

import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';


type Props = NativeStackScreenProps<RootStackParamList, 'ChildTasks'>

const ChildTasksScreen: FC<Props> = ({ navigation }) => {
  const { childPage, userData, rState, mySpace, setTasks, setMyRoom, modalVisible, setModalVisible, taskModal, setTaskModal, childRooms, childDefaultSpace, selectedTask, setSelectedTask, runAgain} = useContext(UserContext)
  const {secondaryTextColor, lightLilacColor, lilacColor} = useContext(ThemeContext)
  // const [childDefaultSpace, setChildDefaultSpace] = useState<any>()

  // const [todayDate, setTodayDate] = useState<any>()

  const [space, setSpace] = useState<String>("")
  const [location, setLocation] = useState<String>("")
  const [coin, setCoin] = useState<String>("")
  const [insturction, setInstruction] = useState<String>("")
  const [title, setTitle] = useState<String>("")
  // const [selectedTask, setSelectedTask]=useState<any[]>([])
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false)


  const [childScheduleTasks, setChildScheduleTasks] = useState<any>([])
 

  const [childScheduleRooms, setChildScheduleRooms] = useState<any>()
  const [childSelectedRoom, setChildSelectedRoom] = useState<any>()




  let newArr = ['bed', 'bathroom', 'kitchen']
  let r = Math.floor(Math.random() * 7)


  const childTaskDate = () => {
    let today = new Date();
    var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var nextDay = new Date(+todayDate);

    let sevenDays = [] as any
    sevenDays.push(todayDate.toISOString())


    for (let i = 1; i < 7; i++) {
      let endDate = nextDay.getDate() + 1;
      nextDay.setDate(endDate);
      sevenDays.push(nextDay.toISOString());

    }

    //need to re fetch child default space for new data to map room.

    let nextTasks = childDefaultSpace.rooms.map((room: any) => room.tasksAssigned.filter((task: any) => sevenDays.includes(task.dateScheduled)))
    setChildScheduleTasks(nextTasks)

    let roomArr = [] as any;
    let taskArr = [] as any;
    childDefaultSpace.rooms.map((room: any) => {
      let tempArr = [] as any;
      let tempRoomArr = [] as any;
      console.log("Task:",childDefaultSpace)
      room.tasksAssigned.map((task: any) => {
        if (sevenDays.includes(task.dateScheduled)) {
          tempArr.push(task);

          if (tempRoomArr.length == 0) {
            tempRoomArr.push(room);
          }
        }
      });
      if (tempArr.length != 0) {
        taskArr.push(tempArr);
      }
      roomArr.push(...tempRoomArr);
    });
    let rooms = [] as any;
    roomArr.map((room: any, idx: number) => {
      rooms.push({ id: room.id, spaceName: room.spaceName, spaceCategory: room.spaceCategory, todaysTasks: taskArr[idx] });
    });

    setChildScheduleRooms(rooms != null || rooms.length !=0 ? rooms : 0)
    setChildSelectedRoom(rooms[0] != null || rooms[0] !=0 ? rooms[0] : 0)
    {
      rooms != 0 && rooms[0] != 0 ?
      setSpace(rooms[0].spaceName)
      :console.log('yess')
    }

    //setSpace(rooms[0].spaceName);
  }


  useEffect(() => {
    //repeat
    navigation.addListener('focus', () =>{
     childTaskDate()
    })
    // console.log("=======================================================================++")
    // console.log("hi")
    //  console.log("Stuff:",childDefaultSpace)
      // console.log("ChildPage:",childPage)
    console.log("=====================+===================================================")

  
    


    

  }, [runAgain])




  return (

    <ScrollView style={styles.container}>
      <View>
        <View>
          <HeaderComponent title='My Tasks'></HeaderComponent>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.firstRow}>
            <AvatarComponent onPress={() => {console.log(childScheduleRooms)}} imageSource={childPage.dependentPhoto} />
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
            <Pressable onPress={() =>  setModalVisible(true) }>
              <FontAwesome5 name="unlock" size={40} color="grey" />
            </Pressable>
          </View>



        </View>
        {/* Add GERE */}
        <View style={[styles.flexrow]}>
   <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{childDefaultSpace.collectionName}</Text>
   {
     childPage.scheduledTasks.length>1?

      < Pressable style={[styles.paddingL]} onPress={()=> navigation.navigate("DefaultChildOptions")}>
   <MaterialCommunityIcons name="home-import-outline" size={30} color={secondaryTextColor}/>
  </Pressable>
  :null
   }
   </View>
 

        <View style={styles.underLineView}>
          <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
        </View>
        {
          childDefaultSpace!=null?
          <>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
          {childScheduleRooms != null ?
            childScheduleRooms.map((room: any, x: number) => {
              // missing logic to display task not completed and today and future task.

              //fix space name and location
              return (
                <View key={x} style={styles.sqrBtn}>
                  <SquareColoredButton idx={x + rState + 1} onPress={() => { console.log(childScheduleRooms.length),     console.log("=======================================================================++"), setChildSelectedRoom(room), setSpace(room.spaceName) }}>
                    <View style={styles.sqrBtn}>
                      <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
                    </View>
                    <View style={styles.sqrBtn}>
                      <Text style={styles.sqrTxt}>{room.spaceCategory}</Text>
                    </View>
                  </SquareColoredButton>
                </View>


              )
            })
            // does not display even if they have nothing 
            : <Text>You Have No Rooms</Text>
          }

        </ScrollView>

        <View style={styles.underLineView}>
          <UnderlinedOneHeaderComponent titleFirst={'Tasks'}></UnderlinedOneHeaderComponent>
        </View>
        <View style={styles.taskStyle}>

          {
            childSelectedRoom != null ?
            childSelectedRoom.todaysTasks.map((taskName: any, x: number) => {


                return (

                  <TaskSpaceRowComponent key={x} idx={x} onPress={() => {console.log("=======================================================================++"), console.log(taskName),  setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name),  setLocation(childDefaultSpace.collectionName), setRequestedApproval(taskName.isRequestedApproval && !taskName.isCompleted?true:false)  }}>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{taskName.task.name + " " + taskName.item.name} 

                    </Text>
                    {
                      taskName.isCompleted?
                      <AntDesign name="checksquare" size={30} color="white" />
                      :
                      taskName.isRequestedApproval && !taskName.isCompleted?
                      <Ionicons name="time-sharp" size={30} color="white" />
                      :
                      null
                    }
                    </View>

                  </TaskSpaceRowComponent>




                )
              })
              :
              <Text>Child has no upcoming tasks</Text>
              // {Alert.alert("Error", 'You have no Task', [{ text: "Ok", style: "cancel" }])}
          }
        </View>
        </>
        :
        <Text>There are no rooms or tasks</Text>
        }
       

        {modalVisible === true ?
          <ChildLockModalComponent /> : taskModal === true ?
            <TaskInfoModalComponent  Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} isButton={requestedApproval}/>
            : null}



      </View>

    </ScrollView>
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
  sqrTxt: {
    color: 'white',
    flexShrink: 1,
    fontSize: 13
  },
  flexrow: {
    flexDirection: "row"
  },
  mainHeader: {
    fontSize:25,
    fontWeight: "bold", 
},
paddingL:{
  paddingLeft:10,
}
});

export default ChildTasksScreen