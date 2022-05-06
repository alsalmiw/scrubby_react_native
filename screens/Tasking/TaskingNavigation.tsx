import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import RootStackParamList from '../../types/INavigateTasking'
import TaskFamilyScreen from './TaskFamilyScreen';
import ApproveTasksScreen from './ApproveTasksScreen'
import TaskMemberScreen from './TaskMemberScreen';

const Tab = createNativeStackNavigator<RootStackParamList>();

const TaskingNavigation: FC = ()=> {

  return (

        <Tab.Navigator  initialRouteName="TaskFamily">
          <Tab.Screen name="TaskFamily" component={TaskFamilyScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="ApproveTasks" component={ApproveTasksScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="TaskMember" component={TaskMemberScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
  );
}



export default TaskingNavigation