// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../../types/INavigateProfile'
import { ThemeContext } from '../../context/ThemeContext';
import TitleComponent from '../../components/AddEdit/TitleComponent';
import WhiteSubTitleComponent from '../../components/AddEdit/WhiteSubTitleComponent';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';

type Props = NativeStackScreenProps <RootStackParamList, 'AddSpace'>

const ScoreBoardScreen: FC<Props> = ({navigation, route})=> {
  
    const {purpleColor, greenColor} = useContext(ThemeContext)
    const [newSpace, setNewSpace] = useState('')

  return (
 
    <View style={[styles.container, {backgroundColor:purpleColor}]}>
         <TitleComponent title="My New Space" />
         <View>
         <WhiteSubTitleComponent title="Name" />
        <InputFieldComponent holder="enter new space" hide={false} onChangeText={(e: string)=>setNewSpace(e)} />
        </View>
       
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: "10%",
    justifyContent:"space-between",
    paddingTop: StatusBar.currentHeight
  },
});

export default ScoreBoardScreen