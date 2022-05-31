// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar, Alert } from 'react-native';

import RootStackParamList from '../../types/INavigateProfile'
import { ThemeContext } from '../../context/ThemeContext';
import TitleComponent from '../../components/AddEdit/TitleComponent';
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';
import { ISpace } from '../../Interfaces/ISpace';
import UserContext from '../../context/UserContext';
import { AddNewSpace, GetCollectionByUsername, GetCollectionsRoomsByUsername, GetDefaultOptionsByUsername, GetSpaceCollectionByUsername, GetUserDefaultSchedule } from '../../services/dataService';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewSpace'>

const AddNewSpaceScreen: FC<Props> = ({ navigation, route }) => {

  const { purpleColor, greenColor } = useContext(ThemeContext)
  const { userData, setMySpaces, myHouses, setMyHouses, setSpacesRoom, setDefaultScheduleOptions, setDefaultSpace, defaultSpace, setRunScheduleAgain } = useContext(UserContext)

  const [newSpace, setNewSpace] = useState('')

  const handleAddSpace = async () => {

    let regi = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/g

    if (newSpace.length == 0 || newSpace == null) {
      Alert.alert("Error", 'Invalid Space Name. Try Again.', [{ text: "Cancel", style: "cancel" }]);
    }
    else if (regi.test(newSpace) ) {
      Alert.alert("Error", `Invalid Space Name. Try Again.`, [{ text: "Okay", style: "cancel" }]);
    }

    else {
      let space: ISpace = {
        id: 0,
        collectionName: newSpace,
        isDeleted: false,
        userId: userData.id,
      }

      console.log(space)
      let result = await AddNewSpace(space)
      if (result) {
        Alert.alert("You have successfully added a new space")
        navigation.goBack()
       // setMyHouses([...myHouses, space])
        let collections = await GetSpaceCollectionByUsername(userData.username)
        let spacesWRooms = await GetCollectionsRoomsByUsername(userData.username)
      
        if(spacesWRooms.length > 0){
          setSpacesRoom(spacesWRooms)
        }
        if(defaultSpace.length==0)
        {
          let defaultCollection = await GetUserDefaultSchedule(userData.username)
        if (defaultCollection.length != 0) {
                
          setDefaultSpace(defaultCollection)
          setRunScheduleAgain(true)
        }
        }
          
        let defaultOptions = await GetDefaultOptionsByUsername(userData.username)
        if(defaultOptions.length != 0){
          setDefaultScheduleOptions(defaultOptions)
      }


        if(collections.length > 0){
          setMyHouses(collections)
          console.log("they came")
          }
      }
    }
  }
  return (

    <View style={[styles.container, { backgroundColor: purpleColor }]}>
      <TitleComponent title="My New Space" />
      <View style={{paddingLeft:10}}>
        <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent value="" maxLength={20} holder="enter new space" hide={false} onChangeText={(e: string) => setNewSpace(e)} />
      </View>
      <TwoFullButtonComponent text1="Back" text2="Add" color={greenColor} onAcceptPress={() => handleAddSpace()} onBackPress={() => navigation.goBack()} />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight
  },
});

export default AddNewSpaceScreen