import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, useContext } from 'react';
import UserContext from '../context/UserContext';
import {GetUserByUsername, GetSpaceCollectionByUserId, GetDependantByUserId} from './dataService'


async function getLocalStorageInfo () {
    const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildData } = useContext(UserContext)
  
    let userInfo:any= await AsyncStorage.getItem("Username");
    if(userInfo) {
      setSavedUsername(userInfo)
      console.log(userInfo)
    }
    
    let data = await GetUserByUsername(savedUsername)
    // console.log(data)
    if (data.length!=0)
    {
      setUserData(data)
    let result = await GetSpaceCollectionByUserId(data.id);
    let children = await GetDependantByUserId(data.id);
    console.log(children)
    if(result.length!=0){
        setMySpaces([result])
    }
    if(children.length!=0){
      setChildData(children)
    }

    }


}

export {getLocalStorageInfo}