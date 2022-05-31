import { FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { AddPhotoComponent } from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigation'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import { GetDependantByChildId, GetDependantDTOByChildId, GetUserByUsername, UpdateChildName, UpdateName } from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import { ThemeContext } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';


type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({ navigation }) => {
  const { orangeColor, blueColor } = useContext(ThemeContext)
  const [newName, setNewName] = useState('')
  const { username, isEditImage, setIsEditImage, memberInfo, userData, setUserData, setChildPage } = useContext(UserContext)


  const handleSave = async () => {
    if (!isEditImage) {
      changeName()
    }
    else {

    }
  }



  const changeName = async () => {
    if (newName.length == 0) {
      alert("Please enter a new name")
    }
    else {

      if (!memberInfo.isChild) {
        let data: INewName = {
          Username: userData.username,
          Name: newName
        }
        
        let result = await UpdateName(data)
        if (result) {
          alert("You have successfully updated your name")
          let userInfo = await GetUserByUsername(userData.username)
          if (userInfo != null) {
            setUserData(userInfo)

          }
          navigation.navigate('MyProfile')
        }

      }
      else if (memberInfo.isChild) {
        let data: any = {
          ChildId: memberInfo.id,
          FullName: newName
        }
        
        let result = await UpdateChildName(data)
        if (result) {
          let childInfo = await GetDependantByChildId(memberInfo.id)
          if (childInfo != null) {
            setChildPage(childInfo)
            

          }
          alert("You have successfully updated your child's name")

          navigation.navigate('ChildTasks')
        }

      }
    }
  }



  return (

    <View style={[styles.container, { backgroundColor: orangeColor }]}>
      {
        !isEditImage ?
          <>
            <View></View>
            <View style={[{ alignItems: 'center' }]}>
              <TitleComponent title="Edit FullName" />
              <Ionicons name="person" size={100} color="#FFF" />
            </View>
            <View>
              <WhiteSubTitleComponent title={!memberInfo.isChild ? "New Name" : "Child's New Name"} />
              <InputFieldComponent maxLength={20} value={""} holder="enter new name" hide={false} onChangeText={(e: string) => setNewName(e)} />
            </View>
            <TwoFullButtonComponent text1={"Back"} text2={"Save"} onAcceptPress={handleSave} onBackPress={() => navigation.goBack()} color={blueColor} />
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
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight
  },
});

export default EditProfileScreen