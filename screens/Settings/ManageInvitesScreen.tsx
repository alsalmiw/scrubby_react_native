// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer'
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import AddPhotoComponent from '../../components/AddPhotoComponent';

type RootStackParamList = { 
  Settings: {title: string, location: string}
  EditProfile: {title: string}
}

type Props = NativeStackScreenProps <RootStackParamList, 'EditProfile'>

const ManageInvitesScreen: FC<Props> = ({navigation, route})=> {
  
  
  return (
 
    <View style={styles.container}>
        
      
        
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

export default ManageInvitesScreen