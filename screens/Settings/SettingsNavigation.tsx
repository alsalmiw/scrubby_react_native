import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import EditProfileScreen from '../Settings/EditProfileScreen'
import SettingsScreen from '../Settings/SettingsScreen'
import ManageInvitesScreen from '../Settings/ManageInvitesScreen'
import RootStackParamList from '../../types/INavigation'
import ChangePasswordScreen from './ChangePasswordScreen';
import RedeemCoinsScreen from './RedeemCoinsScreen';
import ScoreBoardScreen from '../ScoreBoardScreen'
import AddNewSpaceScreen from '../Profile/AddNewSpaceScreen';
import InviteUserScreen from './InviteUserScreen';
import AcceptRequestScreen from './AcceptRequestScreen';
import InviteUserPendingScreen from './InviteUserPendingScreen';

import AcceptedInvitationScreen from './AcceptedInvitationScreen';
import SentAcceptedInvitation from './SentAcceptedInvitationScreen';
import AcceptedRequestScreen from './AcceptedRequestScreen';
import TasksHistoryScreen from './TasksHistoryScreen';



const Tab = createNativeStackNavigator<RootStackParamList>();

const SettingsNavigation: FC = ()=> {

  return (

        <Tab.Navigator  initialRouteName="SettingsScreen">
          <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="ManageInvites" component={ManageInvitesScreen} options={{ headerShown: false}}/>
          <Tab.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="ScoreBoard" component={ScoreBoardScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="RedeemCoins" component={RedeemCoinsScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="InviteUser" component={InviteUserScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="AcceptRequest" component={AcceptRequestScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="InviteUserPending" component={InviteUserPendingScreen} options={{headerShown: false}} />
          <Tab.Screen name="AcceptedInvitation" component={AcceptedInvitationScreen} options={{headerShown: false}} />
          <Tab.Screen name="SentAcceptedInvitation" component={SentAcceptedInvitation} options={{headerShown: false}} />
          <Tab.Screen name="AcceptedRequest" component={AcceptedRequestScreen} options={{headerShown: false}} />
          <Tab.Screen name="TasksHistory" component={TasksHistoryScreen} options={{headerShown: false}} />
        </Tab.Navigator>
  );
}



export default SettingsNavigation