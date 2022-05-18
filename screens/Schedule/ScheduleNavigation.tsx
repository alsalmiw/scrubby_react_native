import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FC } from 'react';
import RootStackParamList from '../../types/INavigationSchedule'
import ScheduleScreen from './ScheduleScreen'
import DefaultSpaceScreen from './DefaultSpaceScreen'


const Tab = createNativeStackNavigator<RootStackParamList>();

const ScheduleNavigation: FC = ()=> {

  return (

        <Tab.Navigator  initialRouteName="ScheduleScreen">
          <Tab.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="DefaultOptions" component={DefaultSpaceScreen} options={{ headerShown: false }}/>
         
        </Tab.Navigator>
  );
}



export default ScheduleNavigation