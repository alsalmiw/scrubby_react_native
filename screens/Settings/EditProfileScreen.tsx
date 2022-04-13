// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AddPhotoComponent from '../../components/AddPhotoComponent';

type RootStackParamList = { 
  Settings: {title: string, location: string}
  EditProfile: {title: string}
}

type Props = NativeStackScreenProps <RootStackParamList, 'EditProfile'>

const EditProfileScreen: FC<Props> = ({navigation, route})=> {
  
  
  return (
 
    <View style={styles.container}>
        
        <AddPhotoComponent />
        
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2683C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
});

export default EditProfileScreen