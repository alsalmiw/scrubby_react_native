import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, Dimensions, Pressable, Alert, ScrollView } from 'react-native';
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
import { DeleteInvite, GetSharedSpacesByUserId, GetSharedSpacesByInvitedAndInviterUsername, GetSpaceCollectionByUserId } from '../../services/dataService';
import { DeleteSharedSpacesById } from '../../services/dataService';
import { DeleteInvitationByInvitedAndInviterUsername, DeleteInvitation } from '../../services/dataService';
import TaskSpaceRowIconComponent from '../../components/TaskSpaceRowIconComponent';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import TaskSpaceRowTrash from '../../components/TaskSpaceRowTrash';
import TaskSpaceRowCheck from '../../components/TaskSpaceRowCheck';
import SquareColoredButton from '../../components/SquareColoredButton';
import SquareWhiteButton from '../../components/SquareWhiteButton';
import TaskSpaceRowPlus from '../../components/TaskSpaceRowPlus';
import ISharedSpace from '../../Interfaces/ISharedSpace';
import { CreateSharedSpaces } from '../../services/dataService';
import TaskSpaceRowMinus from '../../components/TaskSpaceRowMinus';
import { ISpace } from '../../Interfaces/ISpace';
import { ISpaceArr } from '../../Interfaces/ISpaceArr';



type Props = NativeStackScreenProps<RootStackParamList, 'AcceptedRequest'>

const AcceptedRequestScreen: FC<Props> = ({ navigation }) => {


    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
    const { userData, inviters, setInviters, invited, setInvited, refresh, setRefresh, acceptedInvitations, setAcceptedInvitations, rState, mySpaces, setMySpaces, sentAcceptedInvitations, setSentAcceptedInvitations, savedUsername, myHouse } = useContext(UserContext)

    const [sharedSpaces, setSharedSpaces] = useState<any>([]);
    const [refreshLocalUseEffect, setRefreshLocalUseEffect] = useState<boolean>(false);
    const [inviterInfo, setInviterInfo] = useState<any>("");
    const [inviterSpaceCollections, setInviterSpaceCollections] = useState<any>();
    const [r, set] = useState<number>(Math.floor(Math.random() * 7))





    const handleDisplaySharedSpaces = async () => {

        
        let inviterRequestResult = JSON.parse((await AsyncStorage.getItem("AcceptedInviterRequest"))!);

        setInviterInfo(inviterRequestResult);



        let result = await GetSharedSpacesByInvitedAndInviterUsername(savedUsername, inviterRequestResult.inviterUsername!);
        

        setSharedSpaces(result);

        let inviterSpaceCollectionResult = await GetSpaceCollectionByUserId(inviterRequestResult.inviterId);
        
        setInviterSpaceCollections(inviterSpaceCollectionResult)


    }



    

    const handleDeleteSharedSpace = async (sharedSpace: any) => {
        



        let result = await DeleteSharedSpacesById(sharedSpace);
        

        if (result) {
            
            setRefreshLocalUseEffect((prevState: boolean) => !prevState);
        }

    }

    const handleDeleteInvite = async () => {

        
        let result = await DeleteInvitation(inviterInfo.id);
        
        setRefresh((prevRefresh: boolean) => prevRefresh = true)
        navigation.navigate('ManageInvites');

    }

    

    const handleDeleteSharedAlert = async (sharedSpace: any) => {
        Alert.alert("Deleting a Shared Space", "You are about to delete a shared Space, would you like to delete?",
            [
                { text: "Cancel", onPress: undefined, style: "destructive" },
                { text: "Delete", onPress: handleDeleteSharedSpace.bind(this, sharedSpace), style: 'default' }
            ])

    }

    const handleDeleteUserAlert = async () => {
        Alert.alert("Deleting a user", "You are about to delete the user from your invitations, would you like to delete?",
            [
                { text: "Cancel", onPress: undefined, style: "destructive" },
                { text: "Delete", onPress: handleDeleteInvite, style: "default" }

            ])
    }



    const handleNavigateBack = () => {
        setRefresh(true);
        navigation.navigate('ManageInvites');

    }

    useEffect(() => {
        const useEffectFunction = async () => {
            await handleDisplaySharedSpaces();
        }

        useEffectFunction();

    }, [refreshLocalUseEffect])

    return (
        <View style={styles.container}>
            <View>
                <HeaderComponent title={'Add To My Space'}></HeaderComponent>
                <View style={styles.firstRowContainer}>
                    <AvatarComponent onPress={() => {}} imageSource={inviterInfo.inviterPhoto} />
                    <View style={styles.insideFirstRowContainer1}>
                        <UserNameComponent name={inviterInfo.inviterFullname}></UserNameComponent>
                        <View style={styles.insideFirstRowContainer2}>
                            
                            <Feather name="trash-2" size={30} color={lilacColor} onPress={handleDeleteUserAlert} />
                            <UserNameComponent name="Delete User"></UserNameComponent>
                        </View>
                    </View>
                </View>

                <View style={styles.secondRowContainer}>
                    <UnderlinedOneHeaderComponent titleFirst='Add To'></UnderlinedOneHeaderComponent>
                    <View style={styles.insideSecondRowContainer1}>

                        {
                            sharedSpaces.length > 0 ?
                                sharedSpaces.map((sharedSpace: any, idx: number) =>
                                    <TaskSpaceRowMinus
                                        idx={rState + idx}
                                        key={sharedSpace.id}
                                        onPress={handleDeleteSharedAlert.bind(this, sharedSpace)}
                                    >
                                        {inviterSpaceCollections !== undefined ?
                                            inviterSpaceCollections.find((inviterSpaceCollection: any) => inviterSpaceCollection.id == sharedSpace.collectionId).collectionName
                                            : null
                                        }

                                    </TaskSpaceRowMinus>)
                                :
                                <View style={[{ padding: 10 }]}>
                                    <UserNameComponent name="You have accepted to share responsibilities with this person. They have not added you to their spaces yet." />
                                </View>
                        }

                    </View>

                </View>
            </View>
            <FullButtonComponent onPress={handleNavigateBack} radius={0} color={purpleColor}>
                <Text>Back</Text>
            </FullButtonComponent>
        </View>
    )

}

export default AcceptedRequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: StatusBar.currentHeight,
    },
    firstRowContainer: {
        flexDirection: 'row',
    },
    insideFirstRowContainer1: {
        justifyContent: 'space-around',
        paddingLeft: '3%',
        flex: 1
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
    },

})
