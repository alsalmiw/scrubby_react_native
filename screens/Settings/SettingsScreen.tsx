// import { StatusBar } from 'expo-status-bar';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SettingsLinkComponent from '../../components/Settings/SettingsLinkComponent';
import { FontAwesome } from '@expo/vector-icons';
import HeaderComponent from "../../components/HeaderComponent"
import EditProfileScreen from '../Settings/EditProfileScreen'
import ManageInvitesScreen from '../Settings/ManageInvitesScreen'
import RootStackParamList from '../../types/INavigateSettings'



const Tab = createNativeStackNavigator<RootStackParamList>();

const SettingsScreen: FC = ()=> {

 

  return (

        <View style={styles.container}>
          <HeaderComponent title="Settings"/>
         <SettingsLinkComponent linkName='Edit Profile' linkTo='EditProfile' icon='edit'/>
        <SettingsLinkComponent linkName='change Password' linkTo='editProfile' icon='edit'/>
     </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    // justifyContent: 'center',
  },
});

export default SettingsScreen