import { FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import avatars from '../../types/IAvatars'
import RootStackParamList from '../../types/INavigateProfile'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import { AddChild, GetDependantsDTOByUsername } from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import { ThemeContext } from '../../context/ThemeContext';
import IChild from '../../Interfaces/IChild';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';
import { AddPhotoComponent } from '../../components/AddPhotoComponent';
import SplashComponentFaded from '../../components/SplashComponentFaded';

type Props = NativeStackScreenProps<RootStackParamList, 'AddChild'>

const AddChildScreen: FC<Props> = ({ navigation, route }) => {
  const { orangeColor, blueColor } = useContext(ThemeContext)
  const [newChildName, setNewChildName] = useState('')
  const [newChildAge, setNewChildAge] = useState<string>('')
  let avR = Math.floor(Math.random() * 46)

  const { username, userData, setChildData, childData, setChildrenData, setWaiting } = useContext(UserContext)

  const saveName = async () => {
    let regi = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    let regiLetters = /[a-zA-Z]/;
    let regiNums = /[0-9]/;

    if (newChildName.length == 0 || newChildName == null || Number(newChildAge) <= 0 || newChildAge == null || regi.test(newChildName) || regiLetters.test(newChildAge) || regi.test(newChildAge) || regiNums.test(newChildName)) {
      Alert.alert("Error", 'Please Enter a Valid Name or Age. Try Again.', [{ text: "Cancel", style: "cancel" }]);
    }

    else {

      let newChildData: IChild = {
        Id: 0,
        UserID: userData.id,
        DependentName: newChildName,
        DependentAge: Number(newChildAge),
        DependentPhoto: avatars[avR],
        DependentCoins: 0,
        DependentPoints: 0,
        IsDeleted: false,
      }
      
      let result = await AddChild(newChildData)
      if (result) {
        alert("You have successfully add a new child")
        setWaiting(true)
        let dependents = await GetDependantsDTOByUsername(userData.username)
        if (dependents.length > 0) {
          setChildrenData(dependents)
          setWaiting(false)
          navigation.goBack()

        }

      }
    }
  }

  const handleSave = () => {
    saveName()
  }

  return (
    <SplashComponentFaded>
      <View style={[styles.container, { backgroundColor: orangeColor }]}>
        <View></View>
        <View style={[{ alignItems: 'center' }]}>
          <TitleComponent title="Add New Child" />

          <View>
            <WhiteSubTitleComponent title="Name" />
            <InputFieldComponent value={''} maxLength={20} holder="enter your name" hide={false} onChangeText={(e: string) => setNewChildName(e)} />
          </View>
          <View>
            <WhiteSubTitleComponent title="Age" />
            <InputFieldComponent value={''} maxLength={20} holder="enter your childs age" hide={false} onChangeText={(e: string) => setNewChildAge(e)} />
          </View>
        </View>
        <TwoFullButtonComponent text1="Back" text2="Add" color={blueColor} onAcceptPress={() => handleSave()} onBackPress={() => navigation.goBack()} />
      </View>
    </SplashComponentFaded>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight
  },
});

export default AddChildScreen