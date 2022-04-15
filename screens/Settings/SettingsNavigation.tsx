import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import EditProfileScreen from '../Settings/EditProfileScreen'
import SettingsScreen from '../Settings/SettingsScreen'
import ManageInvitesScreen from '../Settings/ManageInvitesScreen'
import RootStackParamList from '../../types/INavigateSettings'


const Tab = createNativeStackNavigator<RootStackParamList>();

const SettingsNavigation: FC = ()=> {

  return (

        <Tab.Navigator  initialRouteName="Settings">
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
           <Tab.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="ManageInvites" component={ManageInvitesScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
  );
}



export default SettingsNavigation