import {  FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {  StyleSheet, Text, View, StatusBar, Dimensions, Pressable, Alert } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeleteInvite } from '../../services/dataService';





type Props = NativeStackScreenProps<RootStackParamList, 'InviteUserPending'>

const InviteUserPendingScreen:FC<Props> = ({navigation}) => {

    const { purpleColor } = useContext(ThemeContext)
    const {allInvites, setAllInvites,  allRequestName, setAllRequestName, userData} =useContext(UserContext)
    const [name, setName] = useState<string | null>("");

    const showName = async() => {
        let dumbName = await AsyncStorage.getItem('Invited');
        console.log(dumbName);
        setName(dumbName);
    }

    const handleNavigateBack = () => {
        navigation.navigate('ManageInvites');
    }

    const handleDeleteUser = async () => {
        


        //console.log(testArray.filter((element: any) => element.invitedFullname !== name));
        setAllInvites((prevInvited:any) => prevInvited.filter((person: any) => {

            if (person.invitedUsername) {
                
                const callDeleteUser = async () => {
                   await DeleteInvite(person.invitedId, person.invitedUsername);
                }
                callDeleteUser();

                return person.invitedFullname !== name
            } else {
                return person.invitedUsername !== name
            }


            
        }))

        

        navigation.navigate('ManageInvites');

        
    }

    const handleDisplayAlert = () => {
        console.log('This item is fake deleted');
        Alert.alert('Warning', 'This action will result in deleting the user and all of their chores will be saved as unassigned. Are you sure you want to delete user?',[ {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Delete", onPress: handleDeleteUser , style: "destructive" }
        ]);


        
        
    }

    

    useEffect(()=> {
        showName()
    }, [])

    


    

    

    return (
        <View style={styles.container}>
            <HeaderComponent title="Add To My Space" />
            <View style={styles.firstRowContainer}>
                <AvatarComponent onPress={undefined} imageSource={userData}/>
                <View style={styles.insideFirstRowContainer1}>
                    <UserNameComponent name={name}></UserNameComponent>
                    <View style={styles.insideFirstRowContainer2}>
                        <Feather name="trash-2" size={40} color='black' onPress={handleDisplayAlert}/>
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