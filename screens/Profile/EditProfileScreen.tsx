// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import {AddPhotoComponent} from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigation'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import {GetDependantByChildId, GetDependantDTOByChildId, GetUserByUsername, UpdateChildName, UpdateName} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import { ThemeContext } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';



type Props = NativeStackScreenProps <RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({navigation})=> {
  const {orangeColor, blueColor} = useContext(ThemeContext)
  const [newName, setNewName] = useState('')
  const [isSelected, setIsSelected]= useState<boolean>(false)
  const {username, isEditImage, setIsEditImage, memberInfo, userData, setUserData, setChildPage } = useContext(UserContext)


  const handleSave = async () => {
    if(!isEditImage) {
    changeName()
    }
    else{

    }
  }
//
  

  const changeName = async() => {
    let regi = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    let regiNums= /[0-9]/;

    if (newName.length == 0 || newName == null ||regi.test(newName) || regiNums.test(newName)) {
      Alert.alert("Error", 'Please Enter a Valid Name. Try Again.', [{ text: "Cancel", style: "cancel" }]);
      setIsSelected(false)
      setNewName('')
    }else{
    if(!memberInfo.isChild)
    {
      let data:INewName = {
      Username: userData.username,
      Name: newName
      }
      console.log(data)
      let result = await UpdateName(data)
      if(result) {
          alert("You have successfully updated your name")
          let userInfo = await GetUserByUsername(userData.username)
          if (userInfo!=null) {
              setUserData(userInfo)
             
          }
          navigation.navigate('MyProfile')
        }

    }
    else if (memberInfo.isChild)
    {
      let regi = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
      let regiNums= /[0-9]/;
  
      if (newName.length == 0 || newName == null ||regi.test(newName) || regiNums.test(newName)) {
        Alert.alert("Error", 'Please Enter a Valid Name. Try Again.', [{ text: "Cancel", style: "cancel" }]);
        setIsSelected(false)
        setNewName('')
      }
      else{
        let data:any = {
                ChildId: memberInfo.id,
                FullName: newName
                }
                console.log(data)
                let result = await UpdateChildName(data)
                if(result) {
                  let childInfo = await GetDependantByChildId(memberInfo.id)
                  if(childInfo!=null) {
                    setChildPage(childInfo)
                    console.log(childInfo)
                      
                  }
                alert("You have successfully updated your child's name")
                
                    navigation.navigate('ChildTasks')
                  }
          

      }
     
        }
    }
  }


  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   <View style={[styles.container,{backgroundColor:orangeColor}]}>
   <View></View>
     {
   !isEditImage?
   <>
        
        <View style={[{alignItems: 'center'}]}> 
        <TitleComponent title="Edit Full Name" />
        <Ionicons name="person" size={100} color="#FFF" />
        </View>
        <View>
        <WhiteSubTitleComponent title={!memberInfo.isChild?"New Name": "Child's New Name"} />
        <InputFieldComponent maxLength={20} value={newName} holder="enter new name" hide={false} onChangeText={(e: string)=>{setNewName(e), e.length>0?setIsSelected(true):setIsSelected(false)}} />
        </View>
        {
                !isSelected?
                <FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={blueColor}>
                <Text>Back</Text>
                </FullButtonComponent>

                    :  

                 <TwoFullButtonComponent text1={"Back"} text2={"Save"} onAcceptPress={handleSave} onBackPress={()=>navigation.goBack()} color={blueColor}/>
        }
       </> 
        
    :
    <AddPhotoComponent />
 
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
    marginTop: StatusBar.currentHeight
  },
});

export default EditProfileScreen