import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, Dimensions, Pressable, Alert } from 'react-native';
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
import TaskSpaceRowIconComponent from '../../components/TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import TaskSpaceRowTrash from '../../components/TaskSpaceRowTrash';


type Props = NativeStackScreenProps<RootStackParamList, 'AcceptedInvitation'>

const AcceptedInvitationScreen: FC<Props> = ({ navigation }) => {

    const [fullName, setFullName] = useState<string>("");
    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
    const { userData, inviters, setInviters, invited, setInvited, refresh, setRefresh, acceptedInvitations, setAcceptedInvitations, rState, mySpaces, setMySpaces } = useContext(UserContext)
    const [bgColor, setBgColor]= useState('')

    let r = Math.floor(Math.random() * 7)

    const handleDisplayFullName = async () => {
       // console.log(acceptedInvitations);

        let inviterUserNameAsyncStorage = (await AsyncStorage.getItem('Inviter'))!;
        //This gives me peter
        //console.log(inviterUserNameAsyncStorage);

        for (let i = 0; i < acceptedInvitations.length; i++) {
            if (acceptedInvitations[i].inviterUsername === inviterUserNameAsyncStorage) {
                if (acceptedInvitations[i].inviterFullname) {
                    setFullName(acceptedInvitations[i].inviterFullname);
                } else {
                    setFullName(acceptedInvitations[i].inviterUsername);
                }
            }
        }

       // console.log(mySpaces);


    }

    const handleDisplayAlert = () => {
        //console.log('Hello There')
    }

    useEffect(() => {
        handleDisplayFullName();
    }, [])

    return (
        <View style={styles.container}>
            <HeaderComponent title={'Add To My Space'}></HeaderComponent>
            <View style={styles.firstRowContainer}>
                <AvatarComponent onPress={undefined} imageSource={undefined} />
                <View style={styles.insideFirstRowContainer1}>
                    <UserNameComponent name={fullName}></UserNameComponent>
                    <View style={styles.insideFirstRowContainer2}>
                        <Feather name="trash-2" size={40} color='black' onPress={handleDisplayAlert} />
                        <UserNameComponent name="Delete User"></UserNameComponent>
                    </View>
                </View>
            </View>

            <View style={styles.secondRowContainer}>
                <UnderlinedOneHeaderComponent titleFirst='Add To'></UnderlinedOneHeaderComponent>
                <View style={styles.insideSecondRowContainer1}>
                    
                </View>
                <UnderlinedOneHeaderComponent titleFirst='You Are Added To'></UnderlinedOneHeaderComponent>
            </View>
        </View>
    )

}

export default AcceptedInvitationScreen;

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
