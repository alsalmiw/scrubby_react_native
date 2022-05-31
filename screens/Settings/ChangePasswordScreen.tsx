import { FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import RootStackParamList from '../../types/INavigateSettings'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import { UpdatePassword } from '../../services/dataService'
import UserContext from '../../context/UserContext';
import IUserLogin from '../../Interfaces/IUserLogin';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>

const ChangePasswordScreen: FC<Props> = ({ navigation, route }) => {
  const { fuchsiaColor, yellowColor } = useContext(ThemeContext)
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const { userData } = useContext(UserContext)


  const changePassword = async () => {
    
    if (newPassword === repeatNewPassword) {
      let data: IUserLogin = {
        Username: userData.username,
        Password: newPassword
      }
      let result = await UpdatePassword(data)

      if (result) {
        alert("You have successfully updated your password")
        navigation.navigate('SettingsScreen')
      }
    }
    else {
      alert("Please make sure both passwords are correct")
    }
  }

  const handleSave = () => {
    changePassword()
  }

  return (

    <View style={[styles.container, { backgroundColor: fuchsiaColor }]}>
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <TitleComponent title="Change Password" />
        <FontAwesome name='lock' size={100} style={{ marginRight: 10, color: '#FFF', marginBottom: 10 }} />
        <View style={[{ justifyContent: 'center' }]}>
          <WhiteSubTitleComponent title="New Password" />

          <InputFieldComponent value={""} maxLength={20} holder="new password" hide={true} onChangeText={(e: string) => setNewPassword(e)} />
          <WhiteSubTitleComponent title="Repeat New Password" />
          <InputFieldComponent value={""} maxLength={20} holder="new password" hide={true} onChangeText={(e: string) => setRepeatNewPassword(e)} />
        </View>
      </View>

      <TwoFullButtonComponent color={yellowColor} text1={"Back"} text2={"Save"} onBackPress={() => { navigation.goBack() }} onAcceptPress={handleSave} />
      
    </View>
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