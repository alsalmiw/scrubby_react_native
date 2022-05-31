import { FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { AddPhotoComponent } from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigation'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import { UpdateName } from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import { ThemeContext } from '../../context/ThemeContext';


type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({ navigation, route }) => {
  const { orangeColor, blueColor } = useContext(ThemeContext)
  const [newName, setNewName] = useState('')
  const { username } = useContext(UserContext)


  const saveName = async () => {
    let data: INewName = {
      Username: username,
      Name: newName
    }

    let result = await UpdateName(data)
    if (result) {
      alert("You have successfully updated your name")
      navigation.navigate('SettingsScreen')
    }
  }

  const handleSave = () => {
    saveName()
  }

  return (

    <View style={[styles.container, { backgroundColor: orangeColor }]}>
      <TitleComponent title="Edit Profile" />
      <AddPhotoComponent />
      <WhiteSubTitleComponent title="Name" />
      <InputFieldComponent maxLength={20} value={""} holder="enter your name" hide={false} onChangeText={(e: string) => setNewName(e)} />
      <FullButtonComponent radius={0} onPress={handleSave} color={blueColor}>
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
    marginTop: StatusBar.currentHeight
  },
});

export default EditProfileScreen