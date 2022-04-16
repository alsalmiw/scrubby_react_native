// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, View, StatusBar, Image, Pressable } from 'react-native';

import RootStackParamList from '../../types/INavigateProfile'
import { ThemeContext } from '../../context/ThemeContext';
import TitleComponent from '../../components/AddEdit/TitleComponent';
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';
import SquareWhiteButton from '../../components/SquareWhiteButton';
import icons from '../../types/Icons'

type Props = NativeStackScreenProps <RootStackParamList, 'AddNewSpace'>

const AddNewRoomScreen: FC<Props> = ({navigation, route})=> {
  
    const {yellowColor, fuchsiaColor} = useContext(ThemeContext)
    const [newSpace, setNewSpace] = useState('')
    const [category, setCategory] = useState('')

    const handleAddRoom = () => {
    navigation.navigate('MyProfile')
}

const handleCategory = (name: string) => {
    setCategory(name)
    console.log(name);
}
  return (
 
    <View style={[styles.container, {backgroundColor:yellowColor}]}>
         <TitleComponent title="My New Room" />
         <View style={[styles.contentContainer]}>
         <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent holder="enter new room" hide={false} onChangeText={(e: string)=>setNewSpace(e)} />
        <WhiteSubTitleComponent title="Select Icon" />
        <View style={styles.iconsContainer}>
        {
            icons.map((icon, idx)=> {
                return (
            <Pressable style={styles.iconContainer} key={idx} onPress={()=>handleCategory(icon.Name)} >
            <Image style={styles.iconSize} source={icon.Link} />
            </Pressable>
            )
            })
        }
   
        </View>
        </View>
       <TwoFullButtonComponent text1="Back" text2="Add" color={fuchsiaColor} onAcceptPress={()=>handleAddRoom()} onBackPress={()=>navigation.goBack()}/>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"space-between",
  
  },
  contentContainer:{
    padding: 10,
  },
  iconsContainer: {
      flexDirection:"row",
      flexWrap: "wrap",
      justifyContent: "space-evenly"
  },
  iconContainer:{
    backgroundColor: "#FFF",
    borderRadius:10,
    margin: 5,
    padding:10
  },
  iconSize:{
      width: 60,
      height: 60,
  }
});

export default AddNewRoomScreen