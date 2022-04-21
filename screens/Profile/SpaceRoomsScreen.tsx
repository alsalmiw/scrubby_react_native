// import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Dimensions } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import RootStackParamList from '../../types/INavigateProfile'
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetUserByUsername, GetSpaceCollectionByUserId, GetDependantByUserId, GetSpacesByCollectionID} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import { Entypo } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import iconsMap from '../../types/IconsMap'



type Props = NativeStackScreenProps <RootStackParamList, 'Rooms'>

const SpaceRoomsScreen: FC<Props> = ({navigation})=> {
  const { bgColor, lilacColor } = useContext(ThemeContext)
  const { username, newSpace, setNewSpace, setUsername, password, setPassword, seeAll, setSeeAll, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms, mySpace, setMySpace} = useContext(UserContext)
  const windowWidth = Dimensions.get('window').width * 0.33;

  useEffect(() => {
   
    console.log(myRooms)
 
   }, [])
 
   let r = Math.floor(Math.random() * 7)


  
  return (
    <View style={styles.container}>
   <HeaderComponent title={'Smiths house'}/> 
   <UnderlinedOneHeaderComponent titleFirst={'My Rooms'} />

   <View>

   <AddItemButtonComponent onPress={() =>navigation.navigate('AddNewRoom')}>
    <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
    </AddItemButtonComponent> 

       
    {
    myRooms.length!=0?
      myRooms.map((room:any, idx:number) => {
        <SquareColoredButton key={idx} idx={r+idx} onPress={() =>navigation.navigate('AddedItems')}>
    
        <Text style={[{color:"#FFF"}]}>{room.spaceName}</Text>
    </SquareColoredButton>
      })
      :
      null
    }
       {/* map through all the rooms here */}
    

   </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding:10
  },
  iconSize:{
    width: 60,
    height: 60,
}
});

export default SpaceRoomsScreen