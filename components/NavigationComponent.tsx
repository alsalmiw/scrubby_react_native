import React, { FC, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import ScheduleScreen from '../screens/Schedule/ScheduleScreen'
import SettingsNavigation from '../screens/Settings/SettingsNavigation';
import TaskFamilyScreen from '../screens/Tasking/TaskFamilyScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProfileNavigation from '../screens/Profile/ProfileNavigation';
import TaskingNavigation from '../screens/Tasking/TaskingNavigation';
import ScheduleNavigation from '../screens/Schedule/ScheduleNavigation';
import RootStackParamList from '../types/INavigation'


// type RootStackParamList ={
//   Nav: undefined,
// }
type Props = NativeStackScreenProps<RootStackParamList, 'Nav'>

const Tab = createBottomTabNavigator();

const MyTabs: FC = () =>{
  const {lilacColor, lightLilacColor} = useContext(ThemeContext)
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: lilacColor,
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile" 
        component={ProfileNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasking"
        component={TaskingNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Tasking',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const NavigationComponent: FC <Props> =()=> {
  return (
    
      <MyTabs />
  );
}

export default NavigationComponent;