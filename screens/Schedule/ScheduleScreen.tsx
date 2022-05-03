import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';



const ScheduleScreen: FC = ()=> {
  const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildData , setScoreBoardList} = useContext(UserContext)
  
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