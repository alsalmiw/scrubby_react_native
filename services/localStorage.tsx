import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import {GetUserByUsername} from './dataService'


async function getLocalStorageInfo() {
    const { username, setUsername, userData, setUserData } = useContext(UserContext)
   let token = AsyncStorage.getItem("Token");
   let userInfo:any= AsyncStorage.getItem("Username");

   if(userInfo!=null)
   {
    let data = await GetUserByUsername(userInfo)
    if (data.length!=0)
    {
        setUserData(data)
        console.log(data)
    }    
   }
    setUsername(userInfo)

}

export {getLocalStorageInfo}