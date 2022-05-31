// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, View, StatusBar, Image, Pressable, Alert, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';

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
import {AddNewRoom, GetCollectionByUsername, GetCollectionsRoomsByUsername, GetDefaultOptionsByUsername, GetSpaceCollectionByUsername, GetSpacesByCollectionID} from '../../services/dataService'
import FullButtonComponent from '../../components/FullButtonComponent';

type Props = NativeStackScreenProps <RootStackParamList, 'AddNewSpace'>

const AddNewRoomScreen: FC<Props> = ({navigation, route})=> {
  
    const {yellowColor, fuchsiaColor} = useContext(ThemeContext)
    const { userData, setMySpaces, myRooms, setMyRooms, mySpace, setMyHouses, setMySpace, setSpacesRoom, setDefaultScheduleOptions } = useContext(UserContext)

    const [category, setCategory] = useState('')
    const [roomName, setRoomName] = useState('')
    const [selectedRoom, setSelectedRoom]= useState<string>('')
  const [isSelected, setIsSelected]= useState<boolean>(false)

  useEffect(() => {
   console.log(mySpace.id) 
  },[])

    const handleAddRoom = async() => {

      let regi = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g

    if (roomName.length == 0 || roomName == null || regi.test(roomName)) {
      Alert.alert("Error", 'Invalid Room Name. Try Again.', [{ text: "Cancel", style: "cancel" }]);
      setIsSelected(false)

    }
    else if (category.length == 0 || category == null) {
      Alert.alert("Error", `Category not Selected. Try Again.`, [{ text: "Okay", style: "cancel" }]);
    

    }

    else {
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

        let defaultOptions = await GetDefaultOptionsByUsername(userData.username)
        if(defaultOptions.length != 0){
          setDefaultScheduleOptions(defaultOptions)
      }
      }
    }
   

}

const handleCategory = (name: string) => {
    setCategory(name)
    console.log(name);
    setSelectedRoom(name)
   
}
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.container, {backgroundColor:yellowColor}]}>
         <TitleComponent title="My New Room" />
         <View style={[styles.contentContainer]}>
         <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent value={roomName} maxLength={8} holder="enter new room" hide={false} onChangeText={(e: string)=>{setRoomName(e), e.length>0?setIsSelected(true): setIsSelected(false)}} />
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
       { !isSelected?
          <FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={fuchsiaColor}>
                <Text>Back</Text>
                </FullButtonComponent>
          :
       <TwoFullButtonComponent text1="Back" text2="Add" color={fuchsiaColor} onAcceptPress={()=>handleAddRoom()} onBackPress={()=>navigation.goBack()}/>
       }
    </View>
    </TouchableWithoutFeedback>
    
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
      //paddingLeft:"2.5%"
      
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