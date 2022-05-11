import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';
import ReactNativeCalendar from '../../components/ReactNativeCalendar';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UnderlinedTwoHeaderComponent from '../../components/UnderlinedTwoHeaderComponent';



const ScheduleScreen: FC = ()=> {
  const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn } = useContext(UserContext)
  const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)

  const [dayTasks, setDayTasks] = useState()
  
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
  useEffect(()=>{
    setSpinnerOn(false)
  }, [])
  
  return (
    
   
    
 
    <View style={styles.container}>
   <HeaderComponent title="My Schedule"/>
   <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>House</Text>
  <View style={styles.rowHeader}>
  <UnderlinedTwoHeaderComponent titleFirst={"This Week"} titleTwo={'Next Week'} />
</View>
  {/* <ReactNativeCalendar/> */}
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
  paddingTop:60
  },
  mainHeader: {
    fontSize:25,
    fontWeight: "bold", 
},
rowHeader:{
  
  flexDirection: 'row',
}

});


export default ScheduleScreen