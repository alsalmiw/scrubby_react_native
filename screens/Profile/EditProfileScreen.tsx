// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {AddPhotoComponent} from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigation'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import {UpdateChildName, UpdateName} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import { ThemeContext } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';



type Props = NativeStackScreenProps <RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({navigation})=> {
  const {orangeColor, blueColor} = useContext(ThemeContext)
  const [newName, setNewName] = useState('')
  const {username, isEditImage, setIsEditImage, memberInfo } = useContext(UserContext)


  const handleSave = async () => {
    if(!isEditImage) {
    changeName()
    }
    else{

    }
  }

  

  const changeName = async() => {
    if(newName.length==0)
    {
      alert ("Please enter a new name")
    }
    else{
    
    if(!memberInfo.isChild)
    {
      let data:INewName = {
      Username: username,
      Name: newName
      }
      console.log(data)
      let result = await UpdateName(data)
      if(result) {
          alert("You have successfully updated your name")
          navigation.navigate('SettingsScreen')
        }

    }
    else if (memberInfo.isChild)
    {
      let data:any = {
        ChildId: memberInfo.Id,
        Name: newName
        }
        console.log(data)
        let result = await UpdateChildName(data)
        if(result) {
            alert("You have successfully updated your child's name")
            navigation.navigate('ChildTasks')
          }
  
    }
    }
  }


  
  return (
 
   <View style={[styles.container,{backgroundColor:orangeColor}]}>
     {
   !isEditImage?
   <>
        <TitleComponent title="Edit FullName" />
        <Ionicons name="person" size={100} color="#FFF" />
        <WhiteSubTitleComponent title={!memberInfo.isChild?"New Name": "Child's New Name"} />
        <InputFieldComponent maxLength={20} value={""} holder="enter new name" hide={false} onChangeText={(e: string)=>setNewName(e)} />
 
           <FullButtonComponent radius={0} onPress={handleSave} color={blueColor}>
          <Text>Save</Text>
        </FullButtonComponent>
       </> 

    :
    <AddPhotoComponent />
 
 }

 </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight
  },
});

export default EditProfileScreen