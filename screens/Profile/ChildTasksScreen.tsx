import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Pressable, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import UserContext from '../../context/UserContext';
import RootStackParamList from '../../types/INavigation';
import AvatarComponent from '../../components/AvatarComponent';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';

import { FontAwesome5 } from '@expo/vector-icons';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import ChildLockModalComponent from '../../components/Modal/ChildLockModalComponent';
import { DeleteChildByChildID, GetChildDefaultSchedule, GetDependantsDTOByUsername, GetTasksByRoomId } from '../../services/dataService';
import TaskInfoModalComponent from '../../components/Modal/TaskInfoModalComponent';
import SplashComponentFaded from '../../components/SplashComponentFaded';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import IchildCoinAndPoint from '../../Interfaces/IchildCoinAndPoint';
import UserNameComponent from '../../components/UserNameComponent';


type Props = NativeStackScreenProps<RootStackParamList, 'ChildTasks'>

const ChildTasksScreen: FC<Props> = ({ navigation }) => {
  const { childPage, userData, rState, mySpace, setTasks, setMyRoom, modalVisible, setModalVisible, taskModal, setTaskModal, childRooms, setChildDefaultSpace, childDefaultSpace, selectedTask, setSelectedTask, runAgain, setMemberInfo, setIsEditImage , setRunAgain, childPoints, setChildPoints, childCoins, setChildCoins, refreshChildTask, setRefreshChildTask, setBlank, setChildrenData, waiting, setWaiting, spacesRooms} = useContext(UserContext)


  const { secondaryTextColor, primaryTextColor, lilacColor } = useContext(ThemeContext)

  const [space, setSpace] = useState<String>("")
  const [location, setLocation] = useState<String>("")
  const [coin, setCoin] = useState<String>("")
  const [insturction, setInstruction] = useState<String>("")
  const [title, setTitle] = useState<String>("")
  
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false)


  const [childScheduleTasks, setChildScheduleTasks] = useState<any>([])


  const [childScheduleRooms, setChildScheduleRooms] = useState<any>()
  const [childSelectedRoom, setChildSelectedRoom] = useState<any>()

  const [childUpdateCoins, setChildUpdateCoins] = useState<IchildCoinAndPoint>()


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

    let nextTasks = childDefaultSpace.rooms.map((room: any) => room.tasksAssigned.filter((task: any) => sevenDays.includes(task.dateScheduled)))
    setChildScheduleTasks(nextTasks)

    let roomArr = [] as any;
    let taskArr = [] as any;
    childDefaultSpace.rooms.map((room: any) => {
      let tempArr = [] as any;
      let tempRoomArr = [] as any;
      
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

    setChildScheduleRooms(rooms != null || rooms.length != 0 ? rooms : 0)
    setChildSelectedRoom(rooms[0] != null || rooms[0] != 0 ? rooms[0] : 0)
    {
      rooms != 0 && rooms[0] != 0 ?
        setSpace(rooms[0].spaceName)
        : null
    }
    setRunAgain(false)
    
  }

  const ChildDefault = async () => {
    let childDefault = await GetChildDefaultSchedule(childPage.id)
    if(childDefault.length > 0)
    {
    setChildDefaultSpace(childDefault)   
    }
  }

   






  useEffect(() => {
    
    if(childDefaultSpace.length!=0){

      setBlank(false)
   
    if(runAgain)
    {
     ChildDefault()
     childTaskDate()
    }

    }
  
  }, [runAgain])


const handleChangeInfo = (isChangeName:boolean) => {

  let newDetails= {
    id: childPage.id,
    isChild: true,
  }
  setMemberInfo(newDetails)
  navigation.navigate('EditProfile')
  if(isChangeName)
  {
    setIsEditImage(false)
  }
  else{
     setIsEditImage(true)
  }
 
}

const handleDeleteChild= async()=> {

setWaiting(true)
let deleted = await DeleteChildByChildID(childPage.id)
if(deleted)
{
 
  let dependents = await GetDependantsDTOByUsername(userData.username)
  if(dependents!=null){
    setChildrenData(dependents)
    navigation.navigate('MyProfile')
    setWaiting(false)
  }
}else{
  setWaiting(false)
}
}

  return (
    <SplashComponentFaded>
    <ScrollView style={styles.container}>
      <View>
        <View>
          <HeaderComponent title='Child Tasks'></HeaderComponent>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.firstRow}>
            <View>
            <View>
            <AvatarComponent onPress={() => {undefined}} imageSource={childPage.dependentPhoto} />
              <Pressable  style={styles.deleteChild} onPress={() =>handleDeleteChild()}>
              <FontAwesome5 name="user-times" size={20} color={lilacColor} />
              </Pressable>
             </View>
            <View style={{flexDirection:"row", justifyContent: "center"}}>
            <MaterialCommunityIcons name="image-edit-outline" size={20} color={lilacColor} />
            <Text style={{color:"blue"}} onPress={() =>handleChangeInfo(false)}>Edit image?</Text>
            </View>
            </View>
          </View>


          <View style={styles.nameAndCoinContainer}>
            <View style={styles.childName}>
              
            <Pressable style={{flexDirection: 'row'}} onPress={()=>handleChangeInfo(true)}>
            <UserNameComponent name={childPage.dependentName} />
              <View style={{marginLeft:5}}>
          <FontAwesome5 name="edit" size={20} color={lilacColor} />
          </View>
        </Pressable>
            </View>

            <Text style={{ color: primaryTextColor}}>{childPage.dependentAge} years old</Text>


            <View style={styles.coinContainer}>
              <CoinsPointsDisplayContainer coins={childCoins} points={childPoints} ></CoinsPointsDisplayContainer>
            </View>


          </View>
          {childDefaultSpace.length!=0?
          
          <View style={styles.unlockIconView}>
            <Pressable onPress={() =>  setModalVisible(true) }>
              <FontAwesome5 name="unlock" size={40} color={lilacColor} />
            </Pressable>
          </View>
          :null
 

          }

        </View>
        
        
        <View>
        {
          childDefaultSpace.length!=0? 
        <View style={[styles.flexrow, {padding:10}]}>
          <Text style={[styles.mainHeader, { color: secondaryTextColor }]}>{childDefaultSpace.collectionName}</Text>
          {
            spacesRooms.length > 1 ?

              < Pressable style={[styles.paddingL]} onPress={() => navigation.navigate("DefaultChildOptions")}>
                <MaterialCommunityIcons name="home-import-outline" size={30} color={secondaryTextColor} />
              </Pressable>
              : null
          }
        </View>:null
        }

          {
             childSelectedRoom != null ?
          <View style={styles.underLineView}>
                  <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
                </View>

                :null

          }

     
        {
          childDefaultSpace != null ?
            <>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
                {childScheduleRooms!=null ?
                  childScheduleRooms.map((room: any, x: number) => {
                    
                    return (
                      <View key={x} style={styles.sqrBtn}>
                        <SquareColoredButton idx={x + rState + 1} onPress={() => {setChildSelectedRoom(room), setSpace(room.spaceName) }}>
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
                  
                  :null
                }

              </ScrollView>

              <View style={styles.underLineView}>
                <UnderlinedOneHeaderComponent titleFirst={'Seven Day Tasks'}></UnderlinedOneHeaderComponent>
              </View>
              <View style={styles.taskStyle}>

                {
                  childSelectedRoom != null ?
                    childSelectedRoom.todaysTasks.map((taskName: any, x: number) => {


                      return (

                        <TaskSpaceRowComponent key={x} idx={x} onPress={() => {
                        setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name), setLocation(childDefaultSpace.collectionName), setRequestedApproval(taskName.isRequestedApproval && !taskName.isCompleted ? true : false)
                          {
                            let childInfoCoin: IchildCoinAndPoint = {
                              Id: childPage.id,
                              DependentCoins:taskName.task.coins,
                              DependentPoints:taskName.task.coins
                            }
                            setChildUpdateCoins(childInfoCoin)
                          }
                          
                        }}>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{ color: '#FFF', fontSize: 20 }}>{taskName.task.name + " " + taskName.item.name} 

                    </Text>
                    {
                      taskName.isCompleted?
                      <AntDesign name="checksquare" size={30} color="#FFF" />
                      :
                      taskName.isRequestedApproval && !taskName.isCompleted?
                      <Ionicons name="time-sharp" size={30} color="#FFF" />
                      :
                      null
                    }
                    </View>

                        </TaskSpaceRowComponent>

                      )
                    })
                    :
                    <Text style={[{color:primaryTextColor}]}>Child has no upcoming tasks</Text>
                  
                }
              </View>
            </>
            :
            <Text style={[{color:primaryTextColor}]}>There are no rooms or tasks</Text>
        }

        {modalVisible === true ?
          <ChildLockModalComponent /> : taskModal === true ?
            <TaskInfoModalComponent Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} isButton={requestedApproval} childInfo={ childUpdateCoins}  />
            : null}

          </View>

      </View>

    </ScrollView>
    </SplashComponentFaded>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight
  },
  deleteChild:{
    position: 'absolute',
    top:0,
    right:-5,
    backgroundColor:"white",
    padding:5,
    borderRadius: 30,
    
   
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
    fontSize: 25,
    fontWeight: "bold",
  },
  paddingL: {
    paddingLeft: 10,
  }
});

export default ChildTasksScreen