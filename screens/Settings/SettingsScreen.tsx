import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FC, useContext, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import SettingsLinkComponent from '../../components/Settings/SettingsLinkComponent';
import { FontAwesome, FontAwesome5  } from '@expo/vector-icons';
import HeaderComponent from "../../components/HeaderComponent"
import RootStackParamList from '../../types/INavigateSettings'
import { ThemeContext } from '../../context/ThemeContext';
import ChildFreeBoolComponent from '../../components/Settings/ChildFreeBoolComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocalStorageInfo} from '../../services/localStorage'


type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

const SettingsScreen: FC<Props> = ({navigation})=> {
  const {orangeColor, blueColor, fuchsiaColor, violetColor, greenColor, yellowColor, purpleColor} = useContext(ThemeContext)
  //const navigation = useNavigation();

  useEffect(() => {
    // console.log(savedUsername)
   
    // getLocalStorageInfo()

  }, [])

  const localStorage =async()=>{
  await getLocalStorageInfo()
  }

const handleLogOut = () => {
  AsyncStorage.removeItem("Token");
  navigation.navigate('login')
}



  return (

        <View style={styles.container}>
          <HeaderComponent title="Settings"/>

                <SettingsLinkComponent linkName='Logout' onPress={() =>handleLogOut()}>
                  <FontAwesome name={'sign-out'} size={25} style={{marginRight: 10, color: greenColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Edit Profile' onPress={()=>navigation.navigate('EditProfile')} >
                  <FontAwesome name={'edit'} size={25} style={{marginRight: 10, color: orangeColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Invites'  onPress={()=> navigation.navigate('ManageInvites')} >
                  <FontAwesome name={'group'} size={25} style={{marginRight: 10, color: fuchsiaColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Child Free' onPress={undefined} >
                 <ChildFreeBoolComponent/>
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Change Password' onPress={()=> navigation.navigate('ChangePassword')} >
                  <FontAwesome name={'lock'} size={25} style={{marginRight: 10, color: blueColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Score Board'  onPress={()=> navigation.navigate('ScoreBoard')} >
                  <FontAwesome name={'star'} size={25} style={{marginRight: 10, color: orangeColor}} />
                </SettingsLinkComponent>

                <SettingsLinkComponent linkName='Redeem Coins' onPress={()=>navigation.navigate('RedeemCoins')} >
                  <FontAwesome5 name={'coins'} size={25} style={{marginRight: 10, color: yellowColor}} />
                </SettingsLinkComponent>
      
          
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