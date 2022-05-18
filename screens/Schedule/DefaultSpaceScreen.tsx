import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';
import ReactNativeCalendar from '../../components/ReactNativeCalendar';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UnderlinedTwoHeaderComponent from '../../components/UnderlinedTwoHeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';


const ScheduleScreen: FC = ()=> {
    const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn, defaultSpace, setDefaultSpace } = useContext(UserContext)
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)



    return(
        <Text> Default Screen</Text>
    )

}

const styles = StyleSheet.create({
    container: {
    paddingTop:20
    },
})

export default ScheduleScreen