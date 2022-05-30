import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import SettingsLinkComponent from '../../components/Settings/SettingsLinkComponent';
import { FontAwesome, FontAwesome5, Fontisto  } from '@expo/vector-icons';
import HeaderComponent from "../../components/HeaderComponent"
import RootStackParamList from '../../types/INavigation'
import { ThemeContext } from '../../context/ThemeContext';
import ChildFreeBoolComponent from '../../components/Settings/ChildFreeBoolComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocalStorageInfo} from '../../services/localStorage'
import UserContext from '../../context/UserContext';


type Props = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'>

const SettingsScreen: FC<Props> = ({navigation})=> {
  const {orangeColor, blueColor, fuchsiaColor, violetColor, greenColor, yellowColor, purpleColor} = useContext(ThemeContext)
  const { setUsername, setPassword, setSeeAll,setSavedUsername, setSavedPassword, isChildFree, setIsChildFree, setUserData, setChildData, setMySpaces,setMyRooms, setTask, setAllTask, setAddTask,  setMySpace, setRState, setInvited,  setInviters, setChildrenData, setNewSpace,  setUsersAddedTasks, setMyRoom, setTasksAPI, setRoomTasks, setFullUserInfo, setRefresh, setScoreBoardList,  setAcceptedInvitations, setTaskUser, setChildPage, setIsChild, setSelectedUser, setModalVisible, setScheduleTask, setChildPassCode, setCheckPassCode, setDefaultSpace, setTaskModal, setChildRooms, setChildDefaultSpace, setRunAgain, setRoomIDX, setCloseTasks, setCurrent, setMySchedule, setFullName, setLogin, setSelectedTask, setBlank, setTasksHistory, setActiveDate, setActiveRoom, setMemberInfo, setIsEditImage, setSentAcceptedInvitations, setChildrenInfo, setRunScheduleAgain, setMyHouses, setStoredAddedItems, setNoAddedItems, setDefaultScheduleOptions, setSharedSpacesInfo, setFirstTime, setSpacesRoom} = useContext(UserContext)

  //const navigation = useNavigation();

  useEffect(() => {
    // console.log(savedUsername)
   
    // getLocalStorageInfo()

  }, [])

  const localStorage =async()=>{
  await getLocalStorageInfo()
  }

const handleLogOut = () => {
  AsyncStorage.removeItem("Token");
  AsyncStorage.removeItem("username");
  resetData()
  navigation.navigate('login')
}

const resetData = () => {

   setUsername("")
  setPassword("")  ('')
  setSavedUsername('username')
  setSavedPassword  ('password')
setSeeAll  (true)
setIsChildFree (false)
 setIsChild (false)
  setUserData ([])
  setFullUserInfo  ([])
setChildData([])
  setChildPage('')
 setChildrenData([])
 setChildrenInfo([])
setMySpaces([])
 setMySpace([])
  setNewSpace([]);
   setInviters([])
  setInvited([])
  setAcceptedInvitations([]);
 setSentAcceptedInvitations([]);
setTask([]);
   setAllTask([])
 setAddTask([])
setTaskUser([])
setRState(Math.floor(Math.random() * 7));
  setUsersAddedTasks([])
   setActiveDate('') 
 setActiveRoom(0) 
    setMyRooms([])
   setTasksAPI([])
   setMyRoom([])
  setRoomTasks([]);
setScoreBoardList([]);
setRefresh(false)
    setRunScheduleAgain(false)
setMyHouses([])
setNoAddedItems(false)
setSelectedUser([])
setModalVisible(false);
setTaskModal(false);
setScheduleTask([])
setMySchedule([]);
setTasksHistory([]);
 setChildPassCode(0)
setCheckPassCode(true)
setDefaultSpace([])
setChildRooms([])
 setChildDefaultSpace([])
setRunAgain(false)
 setRoomIDX(0)
setCloseTasks(false)
setCurrent(0)
setFullName ("")
setLogin(true);
setSelectedTask([])
setBlank(false)
setMemberInfo([])
 setIsEditImage(false)
 setStoredAddedItems([])
 setDefaultScheduleOptions([])
setSharedSpacesInfo([])
 setFirstTime(true)
setSpacesRoom([])
}

  return (

        <View style={styles.container}>
          <HeaderComponent title="Settings"/>

                <SettingsLinkComponent linkName='Logout' onPress={() =>handleLogOut()}>
                  <FontAwesome name={'sign-out'} size={25} style={{marginRight: 10, color: greenColor}} />
                </SettingsLinkComponent>

                {/* <SettingsLinkComponent linkName='Edit Profile' onPress={()=>navigation.navigate('EditProfile')} >
                  <FontAwesome name={'edit'} size={25} style={{marginRight: 10, color: orangeColor}} />
                </SettingsLinkComponent> */}

                <SettingsLinkComponent linkName='Invites'  onPress={()=> navigation.navigate('ManageInvites')} >
                  <FontAwesome name={'group'} size={25} style={{marginRight: 10, color: fuchsiaColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName={!isChildFree?'Child Free?': 'Not Child Free?'} onPress={undefined} >
                 <ChildFreeBoolComponent/>
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Change Password' onPress={()=> navigation.navigate('ChangePassword')} >
                  <FontAwesome name={'lock'} size={25} style={{marginRight: 10, color: blueColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Score Board'  onPress={()=> navigation.navigate('ScoreBoard')} >
                  <FontAwesome name={'star'} size={25} style={{marginRight: 10, color: orangeColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Redeem Coins' onPress={()=>navigation.navigate('RedeemCoins')} >
                  <FontAwesome5 name={'coins'} size={25} style={{marginRight: 10, color: yellowColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Tasks History' onPress={()=>navigation.navigate('TasksHistory')} >
                  <Fontisto name={'archive'} size={25} style={{marginRight: 10, color: violetColor}} />
                </SettingsLinkComponent>
      
          
     </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    // justifyContent: 'center',
  },
});

export default SettingsScreen