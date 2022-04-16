import React, { FC, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import ScheduleScreen from '../screens/Schedule/ScheduleScreen'
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import AddNewSpaceScreen from '../screens/Profile/AddNewSpaceScreen'
import SettingsNavigation from '../screens/Settings/SettingsNavigation';
import TaskFamilyScreen from '../screens/Tasking/TaskFamilyScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList ={
  Nav: undefined,
}
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
        component={ScheduleScreen}
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
        component={AddNewSpaceScreen}
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
        component={TaskFamilyScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Tasking',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsNavigation"
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