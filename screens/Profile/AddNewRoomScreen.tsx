// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, View, StatusBar, Image, Pressable, Alert, TouchableHighlight } from 'react-native';

import RootStackParamList from '../../types/INavigateProfile'
import { ThemeContext } from '../../context/ThemeContext';
import TitleComponent from '../../components/AddEdit/TitleComponent';
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';
import SquareWhiteButton from '../../components/SquareWhiteButton';
import icons from '../../types/Icons'
import UserContext from '../../context/UserContext';
import IRoom from '../../Interfaces/IRoom'
import {AddNewRoom, GetCollectionByUsername, GetCollectionsRoomsByUsername, GetSpaceCollectionByUsername, GetSpacesByCollectionID} from '../../services/dataService'

type Props = NativeStackScreenProps <RootStackParamList, 'AddNewSpace'>

const AddNewRoomScreen: FC<Props> = ({navigation, route})=> {
  
    const {yellowColor, fuchsiaColor} = useContext(ThemeContext)
    const { userData, setMySpaces, myRooms, setMyRooms, mySpace, setMyHouses, setMySpace, setSpacesRoom } = useContext(UserContext)

    const [category, setCategory] = useState('')
    const [roomName, setRoomName] = useState('')
    const [selectedRoom, setSelectedRoom]= useState<string>('')

    const handleAddRoom = async() => {
     console.log(mySpace.id)
      
      let newRoom:IRoom = {
        id:0, 
        spaceName: roomName,
        spaceCategory: category,
        collectionId: mySpace.id
      }
      console.log(newRoom)

      let result = await AddNewRoom(newRoom)
      if (result)
      {
        Alert.alert("You have successfully added a new room")
        navigation.goBack()

      let spaceRooms = await GetSpacesByCollectionID(mySpace.id)
        if(spaceRooms.length > 0){
          setMyRooms(spaceRooms)
          console.log(spaceRooms)
        }
        let spacesWRooms = await GetCollectionsRoomsByUsername(userData.username)
        if(spacesWRooms.length > 0){
          setSpacesRoom(spacesWRooms)
        }
      }
   

}

const handleCategory = (name: string) => {
    setCategory(name)
    console.log(name);
    setSelectedRoom(name)
   
}
  return (
 
    <View style={[styles.container, {backgroundColor:yellowColor}]}>
         <TitleComponent title="My New Room" />
         <View style={[styles.contentContainer]}>
         <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent value={''} maxLength={10} holder="enter new room" hide={false} onChangeText={(e: string)=>setRoomName(e)} />
        <WhiteSubTitleComponent title="Select Icon" />
        <View style={styles.iconsContainer}>
        {
            icons.map((icon, idx)=> {
                return (
            <Pressable  style={[styles.iconContainer,{borderWidth:3, borderColor: selectedRoom==icon.Name?  fuchsiaColor:yellowColor}  ]} key={idx} onPress={()=>handleCategory(icon.Name)} >
            <Image style={styles.iconSize} source={icon.Link} />
            </Pressable>
            )
            })
        }
   
        </View>
        </View>
       <TwoFullButtonComponent text1="Back" text2="Add" color={fuchsiaColor} onAcceptPress={()=>handleAddRoom()} onBackPress={()=>navigation.goBack()}/>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent:"space-between",
  
  },
  contentContainer:{
    padding: 10,
  },
  iconsContainer: {
      flexDirection:"row",
      flexWrap: "wrap",
      
      //justifyContent: "space-evenly"
  },
  iconContainer:{
    backgroundColor: "#FFF",
    borderRadius:10,
    margin: 1,
    padding:10
  },
  iconSize:{
      width: 60,
      height: 60,
  }
});

export default AddNewRoomScreen