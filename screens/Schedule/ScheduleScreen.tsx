import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';
import ReactNativeCalendar from '../../components/ReactNativeCalendar';



const ScheduleScreen: FC = ()=> {
  const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations } = useContext(UserContext)
  
  useEffect(() => {
    // console.log(savedUsername)
    GetUserInfoByUsername();


  }, [])

  const GetUserInfoByUsername = async() => {
  
    let username:any= await AsyncStorage.getItem("Username");
    if(username) {
      setSavedUsername(username)
      console.log(username)
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
    
   
    
 
    <View style={styles.container}>
   
        <ReactNativeCalendar/>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
  
  paddingTop:60
  },
});

export default ScheduleScreen