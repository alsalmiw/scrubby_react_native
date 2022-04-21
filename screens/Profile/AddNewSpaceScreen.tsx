// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../../types/INavigateProfile'
import { ThemeContext } from '../../context/ThemeContext';
import TitleComponent from '../../components/AddEdit/TitleComponent';
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';

type Props = NativeStackScreenProps <RootStackParamList, 'AddNewSpace'>

const AddNewSpaceScreen: FC<Props> = ({navigation, route})=> {
  
    const {purpleColor, greenColor} = useContext(ThemeContext)
    const [newSpace, setNewSpace] = useState('')

    const handleAddSpace = () => {
    navigation.navigate('MyProfile')
}
  return (
 
    <View style={[styles.container, {backgroundColor:purpleColor}]}>
         <TitleComponent title="My New Space" />
         <View>
         <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent maxLength={15} holder="enter new space" hide={false} onChangeText={(e: string)=>setNewSpace(e)} />
        </View>
       <TwoFullButtonComponent text1="Back" text2="Add" color={greenColor} onAcceptPress={()=>handleAddSpace()} onBackPress={()=>navigation.goBack()}/>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"space-between",
    paddingTop: StatusBar.currentHeight
  },
});

export default AddNewSpaceScreen