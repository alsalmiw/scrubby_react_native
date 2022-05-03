import {  FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {  StyleSheet, Text, View, StatusBar, Dimensions, Pressable } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import UserContext from '../../context/UserContext';

import { Feather } from '@expo/vector-icons';


import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import AvatarComponent from '../../components/AvatarComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';



type Props = NativeStackScreenProps<RootStackParamList, 'InviteUserPending'>

const InviteUserPendingScreen:FC<Props> = ({navigation}) => {

    const { purpleColor } = useContext(ThemeContext)
    const {allInvites, setAllInvites,  allRequestName, setAllRequestName, userData} =useContext(UserContext)

    const handleNavigateBack = () => {
        navigation.navigate('ManageInvites');
    }

    const handleDeleteUser = () => {
        console.log('This item is fake deleted');
    }

    console.log(allInvites)

    return (
        <View style={styles.container}>
            <HeaderComponent title="Add To My Space" />
            <View style={styles.firstRowContainer}>
                <AvatarComponent onPress={undefined} imageSource={userData}/>
                <View style={styles.insideFirstRowContainer1}>
                    <UserNameComponent name="Obama McLean"></UserNameComponent>
                    <View style={styles.insideFirstRowContainer2}>
                        <Feather name="trash-2" size={40} color='black' onPress={handleDeleteUser}/>
                        <UserNameComponent name="Delete User"></UserNameComponent>
                    </View>
                </View>
            </View>
            
            <View style={styles.secondRowContainer}>
                <UnderlinedOneHeaderComponent titleFirst='Add To'></UnderlinedOneHeaderComponent>
                <View style={styles.insideSecondRowContainer1}>
                    <UserNameComponent name="This user has not accepted your invitation yet to share responsibilities."></UserNameComponent>
                </View>
            </View>

            <FullButtonComponent onPress={handleNavigateBack} color={purpleColor}>
                <Text>Back</Text>
            </FullButtonComponent>
            

        </View>
    )

}

export default InviteUserPendingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    firstRowContainer: {
        flexDirection: 'row',
    },
    insideFirstRowContainer1: {
        justifyContent: 'space-around',
        paddingLeft: '3%'
    },
    insideFirstRowContainer2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    secondRowContainer: {
        marginTop: '5%',
        paddingLeft: '3%',
        
    },
    insideSecondRowContainer1: {
        marginTop: '3%'
    }
    
})