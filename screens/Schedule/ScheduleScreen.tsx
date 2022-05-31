import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAllTasksHistoryForMembers, GetAllTasksHistoryForMembersByUsername, GetCollectionByUsername, GetCollectionsRoomsByUsername, GetMyTaskedCollectionsByUsername, GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';
//import ReactNativeCalendar from '../../components/ReactNativeCalendar';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UnderlinedTwoHeaderComponent from '../../components/UnderlinedTwoHeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

///
import RootStackParamList from '../../types/INavigation'
import ScheduleDateBtnComponent from '../../components/ScheduleDateBtnComponent';
import ModalComponent from '../../components/ModalComponent';
import TaskInfoModalComponent from '../../components/Modal/TaskInfoModalComponent';




type Props = NativeStackScreenProps<RootStackParamList, 'ScheduleScreen'>



const ScheduleScreen: FC<Props> = ({ navigation }) => {
  const { savedUsername, setSavedUsername, setMySpaces, mySpaces, userData, setUserData, childData, setChildrenData, setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, defaultSpace, setDefaultSpace, setModalVisible, mySchedule, setMySchedule, setBlank, setTasksHistory, setIsChildFree, activeDate, setActiveDate, defaultCollection, runScheduleAgain, setRunScheduleAgain, defaultScheduleOptions, firstTime, setFirstTime, setSpacesRoom, setWaiting , waiting, defaultDeleted, setDefaultDeleted } = useContext(UserContext)
  const { secondaryTextColor, lightLilacColor, lilacColor } = useContext(ThemeContext)

  const [taskInfo, setTaskInfo] = useState() as any
  const [scheduledDates, setScheduledDates] = useState<any[]>([])
  const [scheduledRooms, setScheduledRooms] = useState<any[]>([])
  const [activeRoom, setActiveRoom] = useState<number>()


  const [scheduledTasks, setScheduledTasks] = useState<any[]>([])
  const [r, setR] = useState<number>(Math.floor(Math.random() * 7))
  const [selectedRoom, setSelectedRoom] = useState<any>()
  const [showBtn, setShowBtn] = useState<boolean>(true)







  useEffect(() => {
  
   if(defaultSpace.length!=0)
   {

    setBlank(false)
    GetTaskDates()
   
    if(firstTime){
      GetUserInfoByUsername()
    }
    if(defaultDeleted){
      GetTaskDates()
    }
   }
    

  }, [defaultSpace])

  const GetTaskDates = () => {
    let today = new Date();
    var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var nextDay = new Date(+todayDate);

    let nextFiftyDays = [] as any
    nextFiftyDays.push(todayDate.toISOString())


    for (let i = 1; i < 10; i++) {
      let endDate = nextDay.getDate() + 1;
      nextDay.setDate(endDate);
      nextFiftyDays.push(nextDay.toISOString());

    }
        let datesArr = [] as any

          
  
          let nextTasks = defaultSpace.rooms.map((room: any) => room.tasksAssigned.filter((task: any) => nextFiftyDays.includes(task.dateScheduled)))

        
    setScheduledTasks(nextTasks)

    nextTasks.map((task: any) => task.map((taskone: any) => datesArr.push(taskone.dateScheduled)))
    datesArr = Array.from(new Set(datesArr.sort()))
    setScheduledDates(datesArr.map((date: string) => {
      let dateF = new Date(date)
      return dateF.toString()
    }))


    

  


    
    if (datesArr.length > 0) {


    //     console.log(runScheduleAgain)
      if (runScheduleAgain==true) {
        //setActiveDate(activeDate)
        getRoomsbyDate(activeDate)

     } 
     else if(!runScheduleAgain) {
        getRoomsbyDate(datesArr[0])
        let day = new Date(datesArr[0])
        setActiveDate(day.toString())
        
      }
    }
    else {
      setScheduledRooms([])
      setSelectedRoom([])
    }

  }

  const getRoomsbyDate = (date: any) => {

    let taskedDate = new Date(date).toISOString()
    let roomArr = [] as any;
    let taskArr = [] as any;
    defaultSpace.rooms.map((room: any) => {
      let tempArr = [] as any;
      let tempRoomArr = [] as any;
      room.tasksAssigned.map((task: any) => {
        if (task.dateScheduled == taskedDate) {
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
    setScheduledRooms(rooms)

    if (runScheduleAgain==true) {
      //console.log("im running again setting selected and active room")
      //console.log(selectedRoom, activeRoom)
      let findRoom = rooms.filter((r:any) => r.id === selectedRoom.id);

    setSelectedRoom(findRoom[0])
    //setActiveRoom(activeRoom)
    

    } 
     else if(!runScheduleAgain){
      //console.log("im in room one when selecting date")
      setSelectedRoom(rooms[0])
      setActiveRoom(rooms[0].id)
    }

    setRunScheduleAgain(false)
  }

  const displayTaskModel = (task: any) => {

    setModalVisible(true)

  }



  const GetUserInfoByUsername = async () => {
    let username:any= await AsyncStorage.getItem("Username");
    
    //let spaces = await GetCollectionByUsername(username)
    let schedule = await GetMyTaskedCollectionsByUsername (username)
    let archives = await GetAllTasksHistoryForMembersByUsername (username)
    let spacesWRooms = await GetCollectionsRoomsByUsername(username)
    
    // if(spaces.length > 0){
    //     setMySpaces(spaces)
    //     setFirstTime(false)
    // }else{
    //     setMySpaces([])
    //     setFirstTime(false)
    // }
    if(schedule.length > 0){
      setMySchedule(schedule)
      }else{
      setMySchedule([])
      }
    
       if(archives.length!=0){
      setTasksHistory(archives)
      
    }

    if(spacesWRooms.length > 0){
      setSpacesRoom(spacesWRooms)
      setFirstTime(false)
    }else{setSpacesRoom([])
      setFirstTime(false)}

  //   let username: any = await AsyncStorage.getItem("Username");
  //   if (username) {
  //     setSavedUsername(username)
  //     let userInfo = await GetUserData(username)

  //     if (userInfo.length != 0) {
  //       //setChildrenData(userInfo.children)
  //       //setMySpaces(userInfo.spaces)
  //       // setUserData(userInfo.userInfo)
  //       //setScoreBoardList(userInfo.scoreBoard)
  //       // setInvited(userInfo.invitations.sentInvites.filter((Invited: any) => (Invited.isAccepted == false && Invited.isDeleted == false)))
  //       //setInviters(userInfo.invitations.recievedInvites.filter((Inviter: any) => (Inviter.isAccepted == false && Inviter.isDeleted == false)))
  //       // setAcceptedInvitations(userInfo.invitations.sentInvites.filter((Invited: any) => (Invited.isAccepted == true && Invited.isDeleted == false)))
  //       //setMySchedule(userInfo.mySchedule)
  //       setTasksHistory(userInfo.tasksHistory)
  //       //setIsChildFree(userInfo.userInfo.isChildFree)
  //     }

  //   }

  }



  return (


    <ScrollView>


      <View style={styles.container}>
        <HeaderComponent title="My Schedule" />
        {
          defaultSpace.length!=0?
        <>
        <View style={[styles.flexrow]}>
          <Text style={[styles.mainHeader, { color: secondaryTextColor }]}>{defaultSpace.collectionName}</Text>
          {
            defaultScheduleOptions.length > 1 ?

              < Pressable style={[styles.paddingL]} onPress={() => navigation.navigate("DefaultOptions")}>
                <MaterialCommunityIcons name="home-import-outline" size={30} color={secondaryTextColor} />
              </Pressable>
              : null
          }


        </View>

        <View style={styles.rowHeader}>
          <UnderlinedOneHeaderComponent titleFirst={"Tasked Dates"} />
        </View>
        {/* <ReactNativeCalendar/> */}

        <ScrollView horizontal style={styles.datesContainer} showsHorizontalScrollIndicator={false}>
          {scheduledDates.length > 0 ?
            scheduledDates.map((date: string, idx: number) => {

              return (
                //   <Pressable key={idx} style={[styles.dateBtn, {borderColor:"black"}]} onPress={()=>getRoomsbyDate(date)}>
                // <Text style={styles.dateText}>{date.slice(0,3)}</Text> 
                // <View style={styles.dash}></View>
                // <Text style={styles.dateText}>{date.slice(8,10)}</Text> 
                //  </Pressable>
                <ScheduleDateBtnComponent key={idx} idx={idx} date={date} onPress={() => { getRoomsbyDate(date), setActiveDate(date) }} />
              )
            })
            :
            <Text>Your Schedule is Empty.</Text>

          }

        </ScrollView>
        {
          scheduledDates.length > 0 ?
            <View>
              <UnderlinedOneHeaderComponent titleFirst={"My Rooms"} />
            </View>
            : null
        }

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            scheduledRooms.map((room: any, idx: number) => {

              return (
                <Pressable key={idx} onPress={() => { setSelectedRoom(room), setActiveRoom(room.id) }} >

                  <SquareColoredButton idx={r + idx} onPress={() => { setSelectedRoom(room), setActiveRoom(room.id) }}>
                    <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
                    <Text style={{ color: "rgb(255, 255, 255)" }}>{room.spaceName}</Text>
                  </SquareColoredButton>
                  <View style={[styles.fadedImage, { backgroundColor: "#FFF", opacity: activeRoom == room.id ? 0 : 0.5 }]}></View>
                </Pressable>
              )

            })
          }

        </ScrollView>
        {

          scheduledDates.length > 0 ?
            <View>
              <UnderlinedOneHeaderComponent titleFirst={"My Tasks"} />
            </View>
            : null


        }
        {/* <View>
    <UnderlinedOneHeaderComponent titleFirst={"My Tasks"}  />
      </View> */}
        <View>
          {
            selectedRoom != null ?
              selectedRoom.todaysTasks != null ?
                selectedRoom.todaysTasks.length > 0 ?
                  selectedRoom.todaysTasks.map((taskInfo: any, idx: number) => {
                    return (

                      //<Text key={idx}>{taskInfo.task.name}  {taskInfo.item.name}</Text>
                      //<TaskRowTaskInfoComponent r={r} key={idx} idx={idx} task={taskInfo} />
                      <TaskSpaceRowComponent key={idx} idx={r + idx} onPress={() => { displayTaskModel(taskInfo), setTaskInfo(taskInfo), setShowBtn(taskInfo.isCompleted) }}>
                        <View style={[styles.taskContainer, styles.flexrow]}>
                          <Text style={[styles.text, { color: "#FFF" }]}>{taskInfo.task.name} {taskInfo.item.name}</Text>
                          <View style={[styles.flexrow]}>
                            {
                              !taskInfo.isCompleted ?
                                null
                                // <>
                                // <FontAwesome5 name="coins" color={"#FFF"} size={20} /> 
                                // <Text style={[styles.text, ]}> {taskInfo.task.coins} coins</Text>
                                // </>
                                :
                                <AntDesign name="checksquare" size={30} color="#FFF" />
                            }

                          </View>
                        </View>
                      </TaskSpaceRowComponent>

                    )
                  })

                  : null
                : null
              : null
          }

          {
            taskInfo != null ?

              <TaskInfoModalComponent childInfo={''} Space={defaultSpace.collectionName} Location={selectedRoom.spaceName} task={taskInfo} isChild={false} taskedInfo={userData} isButton={!showBtn} />

              : null
          }
        </View>
    </>
            : 
            <View style={{paddingLeft:10}}>
            <Text>You have no schedule.</Text>
            </View>
}
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  taskContainer: {
    padding: 5,
    justifyContent: "space-between"
  },
  mainHeader: {
    fontSize: 25,
    fontWeight: "bold",
  },
  rowHeader: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  dateBtn: {
    width: 80,
    height: 100,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    margin: 10,
    marginRight: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dash: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000000",
    margin: 20,
  },
  // dateText: {
  //   fontSize: 20,
  // },
  datesContainer: {

    flexDirection: "row",

  },
  buttonSize: {
    width: 50, height: 50
  },
  flexrow: {
    flexDirection: "row"
  },
  text: {
    //color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    fontSize: 20,
  },
  // taskInfo: {
  //   fontSize: 20,
  // },
  paddingL: {
    paddingLeft: 10,
  },
  fadedImage: {
    borderRadius: 5,
    width: 80,
    height: 80,
    margin: 3,
    position: 'absolute'

  }

});


export default ScheduleScreen