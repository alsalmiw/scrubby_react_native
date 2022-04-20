// import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import RootStackParamList from '../../types/INavigateProfile'
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetUserByUsername, GetSpaceCollectionByUserId, GetDependantByUserId, GetSpacesByCollectionID} from '../../services/dataService'
import UserContext from '../../context/UserContext';



type Props = NativeStackScreenProps <RootStackParamList, 'Rooms'>

const SpaceRoomsScreen: FC<Props> = ({navigation})=> {

  const { savedUsername, setSavedUsername, userData, setUserData, childData, setChildData, newSpace, setNewSpace, myRooms } = useContext(UserContext)


  useEffect(() => {
   
    
 
   }, [])
 
   


  
  return (
    <View style={styles.container}>
   <HeaderComponent title={'Smiths house'}/> 
   <UnderlinedOneHeaderComponent titleFirst={'My Rooms'} />

   <View>
       <AddItemButtonComponent onPress={() =>navigation.navigate('AddNewRoom')} />

       {/* map through all the rooms here */}
    <SquareColoredButton idx={5} onPress={() =>navigation.navigate('AddedItems')}>
    {/* <Image style={styles.iconSize}     /> */}
    </SquareColoredButton>

   </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  iconSize:{
    width: 60,
    height: 60,
}
});

export default SpaceRoomsScreen