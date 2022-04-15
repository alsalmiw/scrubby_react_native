// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AddPhotoComponent from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigateSettings'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';


type Props = NativeStackScreenProps <RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({navigation, route})=> {
  
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSave = () => {
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