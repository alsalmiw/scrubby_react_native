// import { StatusBar } from 'expo-status-bar';//
import { FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, StatusBar, Alert, Text } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import RootStackParamList from '../../types/INavigateProfile'
import { ThemeContext } from '../../context/ThemeContext';
import TitleComponent from '../../components/AddEdit/TitleComponent';
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';
import { ISpace } from '../../Interfaces/ISpace';
import UserContext from '../../context/UserContext';
import { AddNewSpace, GetCollectionByUsername, GetCollectionsRoomsByUsername, GetDefaultOptionsByUsername, GetSpaceCollectionByUsername, GetUserDefaultSchedule } from '../../services/dataService';
import FullButtonComponent from '../../components/FullButtonComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewSpace'>

const AddNewSpaceScreen: FC<Props> = ({ navigation, route }) => {

  const { purpleColor, greenColor } = useContext(ThemeContext)
  const { userData, setMySpaces, myHouses, setMyHouses, setSpacesRoom, setDefaultScheduleOptions, setDefaultSpace, defaultSpace, setRunScheduleAgain } = useContext(UserContext)

  const [newSpace, setNewSpace] = useState('')
  const [isSelected, setIsSelected]= useState<boolean>(false)


  const handleAddSpace = async () => {

    let regi = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/g

    if (newSpace.length == 0 || newSpace == null) {
      Alert.alert("Error", 'Invalid Space Name. Try Again.', [{ text: "Cancel", style: "cancel" }]);
      setNewSpace("")
      setIsSelected(false)
    }
    else if (regi.test(newSpace)) {
      Alert.alert("Error", `Invalid Space Name. Try Again.`, [{ text: "Okay", style: "cancel" }]);
      setNewSpace("")
      setIsSelected(false)
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

        if (spacesWRooms.length > 0) {
          setSpacesRoom(spacesWRooms)
        }
        if (defaultSpace.length == 0) {
          let defaultCollection = await GetUserDefaultSchedule(userData.username)
          if (defaultCollection.length != 0) {

            setDefaultSpace(defaultCollection)
            setRunScheduleAgain(true)
          }
        }

        let defaultOptions = await GetDefaultOptionsByUsername(userData.username)
        if (defaultOptions.length != 0) {
          setDefaultScheduleOptions(defaultOptions)
        }


        if (collections.length > 0) {
          setMyHouses(collections)
          }
      }
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: purpleColor }]}>
        <View></View>
        <TitleComponent title="My New Space" />
        <View style={{ paddingLeft: '5%' }}>
          <View style={{}}>
            <WhiteSubTitleComponent title="Name" />
          </View>
        
        <InputFieldComponent value={newSpace} maxLength={20} holder="enter new space" hide={false} onChangeText={(e: string) => {setNewSpace(e), e.length>0? setIsSelected(true): setIsSelected(false)}} />

      </View>

      {
          !isSelected?
          <FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={greenColor}>
                <Text>Back</Text>
                </FullButtonComponent>
          :
      <TwoFullButtonComponent text1="Back" text2="Add" color={greenColor} onAcceptPress={() => handleAddSpace()} onBackPress={() => navigation.goBack()} />
      }
    </View>
     
    </TouchableWithoutFeedback>


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