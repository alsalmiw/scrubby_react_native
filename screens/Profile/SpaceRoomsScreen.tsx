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
import {GetUserByUsername, GetSpaceCollectionByUserId, GetDependantByUserId, GetSpacesByCollectionID, GetSpacesDTOByID, GetTasksByRoomId} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import { Entypo } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import iconsMap from '../../types/IconsMap'
import {GetSelectedTasksByUserID, GetAllTasks} from '../../services/dataService'
import FullButtonComponent from '../../components/FullButtonComponent';



type Props = NativeStackScreenProps <RootStackParamList, 'Rooms'>

const SpaceRoomsScreen: FC<Props> = ({navigation})=> {
  const { bgColor, lilacColor, purpleColor } = useContext(ThemeContext)
  const { setUsersAddedTasks, usersAddedTasks, userData,  myRooms, setMyRooms, mySpace, setMySpace, myRoom, setMyRoom, tasksAPI, setTasksAPI, setRoomTasks} = useContext(UserContext)

  const windowWidth = Dimensions.get('window').width * 0.25;
  const [r, setR] = useState<number>(Math.floor(Math.random() * 7))
  useEffect(() => {
   
    //console.log(myRooms)
    //GetAllTasksByUserID()
 
   }, [mySpace])
 


  //  const GetAllTasksByUserID =async () => {
        
  //   let usersTasks = await GetSelectedTasksByUserID(userData.id)
  //   if(usersTasks.length!= 0)
  //   {     
  //     //console.log(usersTasks)
  //     setUsersAddedTasks (usersTasks)
  //   }
   
  // }
  const goToRoomsTasks = async (room:any) =>{

    //get tasks by room id
    // let roomDTO = await GetSpacesDTOByID(room.id)
    // if(roomDTO.length!= 0){
    //   setMyRoom(roomDTO)
    //   navigation.navigate('AddedTasks')
    // }
    // else{
    //   setMyRoom(room)
    //   navigation.navigate('AddedTasks')
    // }
    console.log(room.id)
    let tasks = await GetTasksByRoomId(room.id)
    if(tasks.length!= 0){
      setMyRoom(room)
      setRoomTasks(tasks)
      navigation.navigate('AddedTasks')
      //console.log(tasks)
    }
    else{
      setRoomTasks([])
      navigation.navigate('AddedTasks')
    }
  
   
    
  }


  return (
    <View style={styles.container}>
   <HeaderComponent title={mySpace.collectionName}/> 
   <UnderlinedOneHeaderComponent titleFirst={'My Rooms'} />

   <View style={styles.roomsContainer}>

   <AddItemButtonComponent onPress={() =>navigation.navigate('AddNewRoom')}>
    <Entypo  name="squared-plus" size={100} color={lilacColor} />
    </AddItemButtonComponent> 

       
    {
    myRooms.length!=0?
      myRooms.map((room:any, idx:number) => {
        return(
       
        <SquareColoredButton key={idx} idx={r+idx} onPress={() => {goToRoomsTasks(room)}}>
          <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
        <Text style={[{color:"#FFF"}]}>{room.spaceName}</Text>
        </SquareColoredButton>
      
        )
      })
      :
      null
    }
    </View>
       {/* map through all the rooms here */}
    

       <FullButtonComponent color={purpleColor} onPress={() =>navigation.goBack()} radius={0}>
        <Text>Back</Text>
       </FullButtonComponent>
    
    </View>
  );
}
const windowWidth = Dimensions.get('window').width * 0.33;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    // padding:10
  },
  roomsContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
    
  },
  iconSize:{
    width: 60,
    height: 60,
},
buttonSize: {
   width:50, height:50
},
roomsContainerIn:{

  marginTop:8,
  
},

});

export default SpaceRoomsScreen