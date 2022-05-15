import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
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
  const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn, defaultSpace, setDefaultSpace } = useContext(UserContext)
  const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)

  const [dayTasks, setDayTasks] = useState()
  
  useEffect(() => {
    // console.log(savedUsername)
    GetUserInfoByUsername();
    setSpinnerOn(false)


  }, [])

  const GetUserInfoByUsername = async() => {
  
    let username:any= await AsyncStorage.getItem("Username");
    if(username) {
      setSavedUsername(username)
      //console.log(username)
      let userInfo = await GetUserData(username)

      if(userInfo.length!=0) {
        setChildrenData(userInfo.children)
        setMySpaces(userInfo.spaces)
        setUserData(userInfo.userInfo)
        setScoreBoardList(userInfo.scoreBoard)
        setInvited(userInfo.invitations.sentInvites.filter((Invited:any)=> (Invited.isAccepted == false && Invited.isDeleted == false)))
        setInviters( userInfo.invitations.recievedInvites.filter((Inviter:any)=> (Inviter.isAccepted == false  && Inviter.isDeleted == false)))
        setAcceptedInvitations(userInfo.invitations.sentInvites.filter((Invited:any)=> (Invited.isAccepted == true && Invited.isDeleted == false)))
        //setDefaultSpace(userInfo.mySchedule[1])
  
      
      }

    }
    
  }
  
  
  return (
    
   
    
 
    <View style={styles.container}>
   <HeaderComponent title="My Schedule"/>
   <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{defaultSpace.collectionName}</Text>
  <View style={styles.rowHeader}>
  <UnderlinedTwoHeaderComponent titleFirst={"This Week"} titleTwo={'Next'} />
</View>
  {/* <ReactNativeCalendar/> */}
    
    <ScrollView horizontal style={styles.datesContainer}>
    <Pressable style={styles.dateBtn}>
   
      <Text style={styles.dateText}>Day</Text> 
      <View style={styles.dash}></View>
      <Text style={styles.dateText}>Date</Text> 

    </Pressable>

 </ScrollView>

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
  paddingTop:20
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
  
}

});


export default ScheduleScreen