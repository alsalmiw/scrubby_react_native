// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AddPhotoComponent from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigateSettings'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import {UpdateName} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'


type Props = NativeStackScreenProps <RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({navigation, route})=> {
  
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const {username, userData} = useContext(UserContext)


  const saveName = async () => {
    let data:INewName = {
      Username: "Walaa",
      Name: newName
    }
    console.log(data)
    let result = await UpdateName(data)
    if(result) {
        console.log (result)
    }

  }

  const handleSave = () => {
    saveName()
    console.log(newName, newPassword)
  }
  
  return (
 
    <View style={styles.container}>
        <TitleComponent title="Edit Profile" />
        <AddPhotoComponent />
        <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent holder="enter your name" onChangeText={(e: string)=>setNewName(e)} />
        <WhiteSubTitleComponent title="Password" />
        <InputFieldComponent holder="enter your new password" onChangeText={(e: string)=>setNewPassword(e)} />
        <Text style={{color:"white"}}>Leave empty to keep your old password</Text>
        <FullButtonComponent onPress={handleSave}>
          <Text>Save</Text>
        </FullButtonComponent>

        
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2683C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
});

export default EditProfileScreen