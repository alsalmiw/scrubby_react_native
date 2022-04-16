import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import MyProfileScreen from '../Profile/MyProfileScreen'
import AddedItemsScreen from '../Profile/AddedItemsScreen'
import ChildTasksScreen from '../Profile/ChildTasksScreen';
import RootStackParamList from '../../types/INavigateProfile'
import AddNewSpaceScreen from './AddNewSpaceScreen'


const Tab = createNativeStackNavigator<RootStackParamList>();

const SettingsNavigation: FC = ()=> {

  return (

        <Tab.Navigator>
          {/* <Tab.Screen name="MyProfile" component={MyProfileScreen} options={{ headerShown: false }}/> */}
          <Tab.Screen name="AddSpace" component={AddNewSpaceScreen} options={{ headerShown: false }}/>
           <Tab.Screen name="AddedItems" component={AddedItemsScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="ChildTasks" component={ChildTasksScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
  );
}



export default SettingsNavigation