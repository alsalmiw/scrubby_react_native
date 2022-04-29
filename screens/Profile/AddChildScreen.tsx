// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AddPhotoComponent from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigateProfile'
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent'
import TitleComponent from '../../components/AddEdit/TitleComponent'
import FullButtonComponent from '../../components/FullButtonComponent'
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import {AddChild} from '../../services/dataService'
import UserContext from '../../context/UserContext';
import INewName from '../../Interfaces/INewName'
import { ThemeContext } from '../../context/ThemeContext';
import IChild from '../../Interfaces/IChild';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';

type Props = NativeStackScreenProps <RootStackParamList, 'AddChild'>

const AddChildScreen: FC<Props> = ({navigation, route})=> {
  const {orangeColor, blueColor} = useContext(ThemeContext)
  const [newChildName, setNewChildName] = useState('')
  const [newChildAge, setNewChildAge] = useState(0)

  const {username, userData, setChildData, childData} = useContext(UserContext)


  const saveName = async () => {
    let newChildData:IChild = {
        Id:0,
        UserID: userData.id,
        DependentName: newChildName,
        DependentAge: newChildAge,
        DependentPhoto: "none",
        DependentCoins: 0,
        DependentPoints: 0,
        isDeleted: false,
    }
    console.log(newChildData);
    let result = await AddChild(newChildData)
    if(result) {
      alert("You have successfully add a new child")
      navigation.goBack()
         console.log(childData)
      setChildData([...childData, newChildData])
   
    }
  }

  const handleSave = () => {
    saveName()
  }
  
  return (
 
    <View style={[styles.container,{backgroundColor:orangeColor}]}>
        <TitleComponent title="Add New Child" />
        <AddPhotoComponent />
        <View>
        <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent value={''} maxLength={20} holder="enter your name" hide={false} onChangeText={(e: string)=>setNewChildName(e)} />
        </View>
        <View>
        <WhiteSubTitleComponent title="Age" />
        <InputFieldComponent value={''} maxLength={20} holder="enter your childs age" hide={false} onChangeText={(e: number)=>setNewChildAge(e)} />
        {/* <FullButtonComponent onPress={handleSave} color={blueColor}>
          <Text>Save</Text>
        </FullButtonComponent> */}
        </View>
        <TwoFullButtonComponent text1="Back" text2="Add" color={blueColor} onAcceptPress={()=>handleSave()} onBackPress={()=>navigation.goBack()}/>

        
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

export default AddChildScreen