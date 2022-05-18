import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';
import ReactNativeCalendar from '../../components/ReactNativeCalendar';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UnderlinedTwoHeaderComponent from '../../components/UnderlinedTwoHeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

///
import RootStackParamList from '../../types/INavigation'
import ScheduleDateBtnComponent from '../../components/ScheduleDateBtnComponent';
import ModalComponent from '../../components/ModalComponent';
import TaskInfoModalComponent from '../../components/Modal/TaskInfoModalComponent';




type Props = NativeStackScreenProps<RootStackParamList, 'ScheduleScreen'>



const ScheduleScreen: FC <Props> = ({navigation})=> {
  const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn, defaultSpace, setDefaultSpace, setModalVisible } = useContext(UserContext)
  const {secondaryTextColor, lightLilacColor, lilacColor} = useContext(ThemeContext)

  const [taskInfo, setTaskInfo] = useState() as any
  const [scheduledDates, setScheduledDates] =useState<any[]>([])
  const [scheduledRooms, setScheduledRooms] =useState<any[]>([])
  const [activeDate, setActiveDate] =useState<boolean>(false)
  const [scheduledTasks, setScheduledTasks] =useState<any[]>([])
  const [r, setR]= useState<number>(Math.floor(Math.random() * 7))
  const [selectedRoom, setSelectedRoom] = useState<any>()



  

  
  useEffect(() => {
    
    GetUserInfoByUsername();
    setSpinnerOn(false)
      GetTaskDates()
   

  }, [])

  const GetTaskDates = () => {
    let today = new Date();
    var todayDate = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    var nextDay = new Date(+todayDate);
    
    let nextFiftyDays = [] as any
    nextFiftyDays.push(todayDate.toISOString())

    
    for(let i =1; i < 10; i++)
    {
      let endDate = nextDay.getDate() + 1;
          nextDay.setDate(endDate);
          nextFiftyDays.push(nextDay.toISOString());

    }
    console.log(nextFiftyDays)
    let nextTasks = defaultSpace.rooms.map((room:any) => room.tasksAssigned.filter((task:any) => nextFiftyDays.includes(task.dateScheduled)))
    setScheduledTasks(nextTasks)
   console.log(nextTasks)
  let datesArr=[] as any
  

   nextTasks.map((task:any) =>task.map((taskone:any)=> datesArr.push(taskone.dateScheduled)))
   datesArr = Array.from(new Set(datesArr.sort()))
   setScheduledDates(datesArr.map((date:any)=> {
    let dateF = new Date(date)
    return dateF.toString()
   }))
   console.log(datesArr[0])
   getRoomsbyDate(datesArr[0])
  }

  const getRoomsbyDate = (date:any) =>{

    let taskedDate = new Date(date).toISOString()
  let roomArr = [] as any;
  let taskArr = [] as any;
  defaultSpace.rooms.map((room: any) => {
    let tempArr = []as any;
    let tempRoomArr = []as any;
    room.tasksAssigned.map((task:any) => {
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
  roomArr.map((room:any, idx:number) => {
    rooms.push({id:room.id, spaceName:room.spaceName, spaceCategory:room.spaceCategory, todaysTasks: taskArr[idx] });
  });
  setScheduledRooms(rooms)
  setSelectedRoom(rooms[0])

  }

  const displayTaskModel = (task:any) => {
    console.log("display model")
    setModalVisible(true)
   
  }

  
  
  const GetUserInfoByUsername = async() => {
  
    let username:any= await AsyncStorage.getItem("Username");
    if(username) {
      setSavedUsername(username)
      let userInfo = await GetUserData(username)

      if(userInfo.length!=0) {
        setChildrenData(userInfo.children)
        setMySpaces(userInfo.spaces)
        setUserData(userInfo.userInfo)
        setScoreBoardList(userInfo.scoreBoard)
        setInvited(userInfo.invitations.sentInvites.filter((Invited:any)=> (Invited.isAccepted == false && Invited.isDeleted == false)))
        setInviters( userInfo.invitations.recievedInvites.filter((Inviter:any)=> (Inviter.isAccepted == false  && Inviter.isDeleted == false)))
        setAcceptedInvitations(userInfo.invitations.sentInvites.filter((Invited:any)=> (Invited.isAccepted == true && Invited.isDeleted == false)))
      }

    }
 
  }
  

  
  return (
    
   
    <ScrollView>
  
    
   <View style={styles.container}>
   <HeaderComponent title="My Schedule"/>
   <View style={[styles.flexrow]}>
   <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{defaultSpace.collectionName}</Text>
  < Pressable style={[styles.paddingL]} onPress={()=> navigation.navigate("DefaultOptions")}>
   <MaterialCommunityIcons name="home-import-outline" size={30} color={secondaryTextColor}/>
  </Pressable>

   </View>

  <View style={styles.rowHeader}>
  <UnderlinedOneHeaderComponent titleFirst={"Tasked Dates"}  />
</View>
  {/* <ReactNativeCalendar/> */}
    
    <ScrollView horizontal style={styles.datesContainer} showsHorizontalScrollIndicator={false}>
     {  scheduledDates.length>0?
     scheduledDates.map((date:string, idx:number)=> {

        return(
      //   <Pressable key={idx} style={[styles.dateBtn, {borderColor:"black"}]} onPress={()=>getRoomsbyDate(date)}>
      // <Text style={styles.dateText}>{date.slice(0,3)}</Text> 
      // <View style={styles.dash}></View>
      // <Text style={styles.dateText}>{date.slice(8,10)}</Text> 
      //  </Pressable>
       <ScheduleDateBtnComponent key={idx} idx={idx} date={date} onPress={()=>getRoomsbyDate(date)}/>
        )
      })
      : 
      <Text>Your Schedule is Empty for the next ten days.</Text>
    
    }
       
 </ScrollView>
    <View>
    <UnderlinedOneHeaderComponent titleFirst={"My Rooms"}  />
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    {
      scheduledRooms.map((room:any, idx:number)=>{

        return(
          <SquareColoredButton key={idx} idx={r+idx} onPress={() => {setSelectedRoom(room)} }>
            <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
          <Text style={[{color:"#FFF"}]}>{room.spaceName}</Text>
          </SquareColoredButton>
          )

      })
    }

    </ScrollView>
    <View>
    <UnderlinedOneHeaderComponent titleFirst={"My Tasks"}  />
      </View>
      <View>
      {
        selectedRoom!=null?
        selectedRoom.todaysTasks.map((taskInfo:any, idx:number)=>{
          return(

          //<Text key={idx}>{taskInfo.task.name}  {taskInfo.item.name}</Text>
            //<TaskRowTaskInfoComponent r={r} key={idx} idx={idx} task={taskInfo} />
            <TaskSpaceRowComponent key={idx} idx={r+idx} onPress={()=>{displayTaskModel(taskInfo), setTaskInfo(taskInfo)}}>
            <View style={[styles.taskContainer, styles.flexrow]}>
              <Text style={[styles.text ]}>{taskInfo.task.name} {taskInfo.item.name}</Text>
              <View style={[styles.flexrow]}>
                
              <Text style={[styles.text, ]}>{taskInfo.task.coins} coins</Text>
              </View>
            </View>
          </TaskSpaceRowComponent>

          )
        })
        
        :null
      }
   
   {
     taskInfo!=null?
   
   <TaskInfoModalComponent Space={defaultSpace.collectionName} Location={selectedRoom.spaceName} task={taskInfo} isChild={false} taskedInfo={userData}/>

   : null
   }
      </View>

 {/* <Button
  onPress={() =>console.log(scheduledDates)}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}
    </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  paddingTop:20
  },
  taskContainer:{
    padding: 10,
  },
  mainHeader: {
    fontSize:25,
    fontWeight: "bold", 
},
rowHeader:{
  paddingTop:10,
  flexDirection: 'row',
}, 
dateBtn: {
  width:80,
  height: 100,
  borderWidth: 2,
  borderColor:"#000000",
  borderRadius:10,
  margin:10,
  marginRight:5,
  padding:10,
  justifyContent: "center",
  alignItems: "center",
},
dash:{
  width:"80%",
  borderWidth: 1,
  borderColor:"#000000",
  margin: 20,
},
dateText: {
  fontSize:20
},
datesContainer:{

  flexDirection: "row",
  
}, 
buttonSize: {
  width:50, height:50
},
flexrow: {
  flexDirection: "row"
},
text: {
  color:"#FFF", 
  fontWeight: 'bold', 
  fontSize: 20
}, 
taskInfo: {
  fontSize: 20,
},
paddingL:{
  paddingLeft:10,
}

});


export default ScheduleScreen