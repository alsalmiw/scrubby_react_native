import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import MyProfileScreen from '../Profile/MyProfileScreen'
import AddedItemsScreen from '../Profile/AddedItemsScreen'
import ChildTasksScreen from '../Profile/ChildTasksScreen';
//import RootStackParamList from '../../types/INavigateProfile'
import RootStackParamList from '../../types/INavigation'

import AddNewSpaceScreen from '../Profile/AddNewSpaceScreen'
import AddNewRoomScreen from '../Profile/AddNewRoomScreen';
import AddItemsScreen from '../Profile/AddItemsScreen'
import AddedTasksScreen from '../Profile/AddedtasksScreen';
import SpaceRoomsScreen from '../Profile/SpaceRoomsScreen'
import AddChildScreen from './AddChildScreen';
import DefaultSpaceChildScreen from './DefaultSpaceChildScreen';


const Tab = createNativeStackNavigator<RootStackParamList>();

const ProfileNavigation: FC = ()=> {

  return (

        <Tab.Navigator initialRouteName="MyProfile">
          <Tab.Screen name="MyProfile" component={MyProfileScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="AddNewSpace" component={AddNewSpaceScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="AddNewRoom" component={AddNewRoomScreen} options={{ headerShown: false }}/>
           <Tab.Screen name="AddedItems" component={AddedItemsScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="ChildTasks" component={ChildTasksScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="AddItems" component={AddItemsScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="AddedTasks" component={AddedTasksScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Rooms" component={SpaceRoomsScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="AddChild" component={AddChildScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="DefaultChildOptions" component={DefaultSpaceChildScreen} options={{ headerShown: false }}/>


        </Tab.Navigator>
  );
}



export default ProfileNavigation