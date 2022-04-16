// import { StatusBar } from 'expo-status-bar';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FC, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SettingsLinkComponent from '../../components/Settings/SettingsLinkComponent';
import { FontAwesome, FontAwesome5  } from '@expo/vector-icons';
import HeaderComponent from "../../components/HeaderComponent"
import ManageInvitesScreen from '../Settings/ManageInvitesScreen'
import RootStackParamList from '../../types/INavigateSettings'
import { ThemeContext } from '../../context/ThemeContext';
import ChildFreeBoolComponent from '../../components/Settings/ChildFreeBoolComponent'



const Tab = createNativeStackNavigator<RootStackParamList>();

const SettingsScreen: FC = ()=> {
  const {orangeColor, blueColor, fuchsiaColor, violetColor, greenColor, yellowColor, purpleColor} = useContext(ThemeContext)

 let settingsLinks =[
   {
    Name:'Logout',
    To:'login',
    Icon:'sign-out',
  },
  {
    Name:'Edit Profile',
    To:'EditProfile',
    Icon:'edit',
  },
  {
    Name:'Invites',
    To:'invite',
    Icon:'group',
  },
  {
    Name:'Change Password',
    To:'ChangePassword',
    Icon:'lock',
  },
  {
    Name:'Child Free',
    To:'',
    Icon: <ChildFreeBoolComponent/>,
  },
  {
    Name:'Score Board',
    To:'scoreBoard',
    Icon:<FontAwesome name={'star'} size={25} style={{marginRight: 10, color: orangeColor}} />,
  },
  {
    Name:'Redeem Coins',
    To:'redeemCoins',
    Icon: <FontAwesome5 name={'coins'} size={25} style={{marginRight: 10, color: yellowColor}} />,
  },

 ]
const handleLogOut = () => {

}

  return (

        <View style={styles.container}>
          <HeaderComponent title="Settings"/>

         
                <SettingsLinkComponent linkName='Logout' linkTo='login' onPress={() =>handleLogOut()}>
                  <FontAwesome name={'sign-out'} size={25} style={{marginRight: 10, color: greenColor}} />
                  </SettingsLinkComponent>
      
          
          {/* <SettingsLinkComponent linkName='Logout' linkTo='login' icon='sign-out'/>
         <SettingsLinkComponent linkName='Edit Profile' linkTo='EditProfile' icon='edit'/>
        <SettingsLinkComponent linkName='Change Password' linkTo='ChangePassword' icon='lock'/> */}
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