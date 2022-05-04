import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';



const ScheduleScreen: FC = ()=> {
  const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildData , setScoreBoardList, setInviters, setInvited } = useContext(UserContext)
  
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
        setChildData(userInfo.children)
        setMySpaces(userInfo.spaces)
        setUserData(userInfo.userInfo)
        setScoreBoardList(userInfo.scoreBoard)
        setInvited(userInfo.invitations.sentInvites.filter((Invited:any)=> (Invited.isAccepted == false && Invited.isDeleted == false)))
        setInviters( userInfo.invitations.recievedInvites.filter((Inviter:any)=> (Inviter.isAccepted == false  && Inviter.isDeleted == false)))




      }


    }
    
  }
  
  return (
    
   
    
 
    <View style={styles.container}>
        <Text>My Schedule Page</Text>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScheduleScreen