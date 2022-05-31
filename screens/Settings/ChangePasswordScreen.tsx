// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import RootStackParamList from '../../types/INavigateSettings'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import {UpdatePassword} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import IUserLogin from '../../Interfaces/IUserLogin';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';

type Props = NativeStackScreenProps <RootStackParamList, 'ChangePassword'>

const ChangePasswordScreen: FC<Props> = ({navigation, route})=> {
    const {fuchsiaColor, yellowColor} = useContext(ThemeContext)
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const {userData} = useContext(UserContext)
  const [isSelected, setIsSelected]= useState<boolean>(false)



  const changePassword = async () => {
    console.log("came in")
      if(newPassword===repeatNewPassword)
      {
         let data:IUserLogin = {
         Username: userData.username,
        Password: newPassword
        }
    let result = await UpdatePassword(data)
 
    if(result) {
        alert("You have successfully updated your password")
        navigation.navigate('SettingsScreen')
    }
      }
      else{
          alert("Please make sure both passwords are correct")
          setRepeatNewPassword('')
          setNewPassword('')
      }
  }

  const handleSave = () => {
    changePassword()
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.container, {backgroundColor:fuchsiaColor}]}>
      <View style={[{ flex:1, justifyContent: 'center', alignItems: 'center'}]}>
        <TitleComponent title="Change Password" />
        <FontAwesome name='lock' size={100} style={{marginRight: 10, color: '#FFF', marginBottom:10}} />
        <View style={[{justifyContent: 'center'}]}>
        <WhiteSubTitleComponent title="New Password" />
        
        <InputFieldComponent value={newPassword} maxLength={20} holder="new password" hide={true} onChangeText={(e: string)=>setNewPassword(e)} />
        <WhiteSubTitleComponent title="Repeat New Password" />
        <InputFieldComponent  value={repeatNewPassword} maxLength={20} holder="new password" hide={true} onChangeText={(e: string)=>{setRepeatNewPassword(e), e.length>0? setIsSelected(true):setIsSelected(false)}} />
        </View>
        </View>
        {
                isSelected?
        <TwoFullButtonComponent color={yellowColor} text1={"Back"} text2={"Save"} onBackPress={()=>{navigation.goBack()}} onAcceptPress={handleSave} />
        :
        <FullButtonComponent radius={0} onPress={handleSave} color={yellowColor}>
          <Text>Save</Text>
        </FullButtonComponent>
        }
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight
  },
});

export default ChangePasswordScreen