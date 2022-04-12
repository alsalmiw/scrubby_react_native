import React, { FC, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"
import ScheduleScreen from '../screens/Schedule/ScheduleScreen'
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import TaskFamilyScreen from '../screens/Tasking/TaskFamilyScreen'

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
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile" 
        component={MyProfileScreen}
        options={{
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
          tabBarLabel: 'Tasking',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const NavigationComponent: FC =()=> {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default NavigationComponent;