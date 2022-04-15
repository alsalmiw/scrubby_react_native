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
import {UpdateName, UpdatePassword} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import IUserLogin from '../../Interfaces/IUserLogin';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';

type Props = NativeStackScreenProps <RootStackParamList, 'ChangePassword'>

const ChangePasswordScreen: FC<Props> = ({navigation, route})=> {
const {fuchsiaColor, yellowColor} = useContext(ThemeContext)
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const {username, userData} = useContext(UserContext)


 

  const changePassword = async () => {
      if(newPassword===repeatNewPassword)
      {
         let data:IUserLogin = {
         Username: "Walaa",
        Password: newPassword
        }
    let result = await UpdatePassword(data)
    if(result) {
        console.log (result)
        alert("You have successfully updated your password")
        navigation.navigate('Settings')
    }
      }
      else{
          alert("Please make sure both passwords are correct")
      }
  }

  const handleSave = () => {
    changePassword()
  }
  
  return (
 
    <View style={[styles.container, {backgroundColor:fuchsiaColor}]}>
        <TitleComponent title="Change Password" />
        <FontAwesome name='lock' size={100} style={{marginRight: 10, color: 'white'}} />
        <WhiteSubTitleComponent title="New Password" />
        <InputFieldComponent holder="enter your new password" onChangeText={(e: string)=>setNewPassword(e)} />
        <WhiteSubTitleComponent title="Repeat New Password" />
        <InputFieldComponent holder="repeat your new password" onChangeText={(e: string)=>setRepeatNewPassword(e)} />
        <FullButtonComponent onPress={handleSave} color={yellowColor}>
          <Text>Save</Text>
        </FullButtonComponent>
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
});

export default ChangePasswordScreen