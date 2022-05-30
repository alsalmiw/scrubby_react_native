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
import { DeleteInvite, GetSharedSpacesByUserId, GetSharedSpacesByInvitedAndInviterUsername } from '../../services/dataService';
import { DeleteSharedSpacesById } from '../../services/dataService';
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



type Props = NativeStackScreenProps<RootStackParamList, 'SentAcceptedInvitation'>

const SentAcceptedInvitation: FC<Props> = ({ navigation }) => {


    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
    const { userData, inviters, setInviters, invited, setInvited, refresh, setRefresh, acceptedInvitations, setAcceptedInvitations, rState, mySpaces, setMySpaces, sentAcceptedInvitations, setSentAcceptedInvitations, savedUsername, sharedSpacesInfo, myHouses } = useContext(UserContext)

    const [fullName, setFullName] = useState<string>("");
    const [invitedPhoto, setInvitedPhoto] = useState<any>();
    const [sharedSpaces, setSharedSpaces] = useState<any>([]);
    const [refreshLocalUseEffect, setRefreshLocalUseEffect] = useState<boolean>(false);

    let r = Math.floor(Math.random() * 7)

    const handleDisplayFullName = async () => {
        console.log(sentAcceptedInvitations);

        let invitedUserNameAsyncStorage = (await AsyncStorage.getItem('Invited'))!;

        for (let i = 0; i < sentAcceptedInvitations.length; i++) {
            if (sentAcceptedInvitations[i].invitedUsername === invitedUserNameAsyncStorage) {
                if (sentAcceptedInvitations[i].invitedFullname) {
                    setFullName(sentAcceptedInvitations[i].invitedFullname);
                } else {
                    setFullName(sentAcceptedInvitations[i].invitedUsername);
                }

                //This sets accepted user's invitation photo
                setInvitedPhoto(sentAcceptedInvitations[i].invitedPhoto)
            }
        }


    }

    const handleDisplaySharedSpaces = async () => {

        let invitedUsername = (await AsyncStorage.getItem('Invited'))!;

        //Gets shared spaces shared by both invited and inviter
       
        let result = await GetSharedSpacesByInvitedAndInviterUsername(invitedUsername, savedUsername);
        console.log(result);
        setSharedSpaces(result);
    }

    const handleAddSharedSpace = async (filteredMySpace: any) => {
        let invitedUsername = (await AsyncStorage.getItem('Invited'))!;

        //This will be how we add create shared Space

        console.log(filteredMySpace);
         
        let newSharedSpace:ISharedSpace = {
            id:0, 
            invitedUsername: invitedUsername,
            inviterUsername: savedUsername,
            collectionId: filteredMySpace.id,
            isDeleted: false,
            isAccepted: true
        }
        console.log(newSharedSpace)

        let result = await CreateSharedSpaces(newSharedSpace)
        
        if (result) {
            console.log("You added a new shared space")
            setRefreshLocalUseEffect((prevState: boolean) => !prevState);
        }

    }

    const handleDeleteSharedSpace = async (filteredSharedSpace: any) => {
        console.log("You deleted a shared space");
        console.log(filteredSharedSpace.id)
        console.log(sharedSpaces);

        let findSharedSpace = sharedSpaces.find((sharedSpace:any) => sharedSpace.collectionId === filteredSharedSpace.id);
        console.log(findSharedSpace);


        let result = await DeleteSharedSpacesById(findSharedSpace);
        console.log(result);
        
        if (result) {
            console.log("You deleted a shared Space")
            setRefreshLocalUseEffect((prevState: boolean) => !prevState);
        }
        
    }

    const handleDeleteInvite = async () => {

        let invitedUserToBeDeleted = await AsyncStorage.getItem('Invited')!;
        
        const DeleteInviteFetch = async() => {
            let result = await DeleteInvite(userData.id, invitedUserToBeDeleted!);
             console.log(result);
            // setRefresh((prevRefresh:boolean) => prevRefresh = true)
            // navigation.navigate('ManageInvites');
            console.log('scooby')
            console.log(userData.id)
            console.log(invitedUserToBeDeleted);
            
        }
        
        DeleteInviteFetch();

        
    }
    
    const handleAddSharedAlert = async (filteredMySpace: any) => {

        console.log('scooby')
        console.log(filteredMySpace)

        Alert.alert("Adding a Shared Space", "You are about to share a space, would you like to add?",
        [
            {text: "Cancel", onPress: undefined, style: "destructive"},
            {text: "Add", onPress: handleAddSharedSpace.bind(this, filteredMySpace), style: 'default'}

        ])



    }

    const handleDeleteSharedAlert = async (filteredSharedSpace: any) => {
        console.log(filteredSharedSpace);
        Alert.alert("Deleting a Shared Space", "You are about to delete a shared Space, would you like to delete?",
        
        [
            {text: "Cancel", onPress: undefined, style: "destructive"},
            {text: "Delete", onPress: handleDeleteSharedSpace.bind(this, filteredSharedSpace), style: 'default'}
        ])

    }

    const handleDeleteUserAlert = async () => {
        Alert.alert("Deleting a user", "You are about to delete the user from your invitations, would you like to delete?",
        [
            {text: "Cancel", onPress: undefined, style: "destructive"},
            {text: "Delete", onPress: handleDeleteInvite, style: "default"}

        ])
    }

    

    const handleNavigateBack = () => {
        navigation.navigate('ManageInvites');
        setRefresh(true);
    }

    useEffect(() => {
        handleDisplayFullName();
        handleDisplaySharedSpaces();
        console.log(sharedSpaces);

    }, [refreshLocalUseEffect])

    return (
        <View style={styles.container}>
            <HeaderComponent title={'Add To My Space'}></HeaderComponent>
            <View style={styles.firstRowContainer}>
                <AvatarComponent onPress={undefined} imageSource={invitedPhoto} />
                <View style={styles.insideFirstRowContainer1}>
                    <UserNameComponent name={fullName}></UserNameComponent>
                    <View style={styles.insideFirstRowContainer2}>
                        {/* The hello there is just a test, i will remove later when done adding changes */}
                        <Feather name="trash-2" size={40} color='black' onPress={handleDeleteUserAlert} />
                        <UserNameComponent name="Delete User"></UserNameComponent>
                    </View>
                </View>
            </View>

            <View style={styles.secondRowContainer}>
                <UnderlinedOneHeaderComponent titleFirst='Add To'></UnderlinedOneHeaderComponent>
                <View style={styles.insideSecondRowContainer1}>


                    {/* {
                        mySpaces.map((space: ISpace, idx: number) =>
                            <TaskSpaceRowPlus
                                idx={rState + idx}
                                key={idx}
                                onPress={() => { console.log(space); handleDisplayAlert(space) }}
                            >
                                {space.collectionName}
                            </TaskSpaceRowPlus>

                        )
                    } */}

                    {
                        myHouses.filter((myHouse: any) => !sharedSpaces.map((sharedSpace: any) => sharedSpace.collectionId).includes(myHouse.id)).map((filteredMySpaces: any, idx: number) => 
                        <TaskSpaceRowPlus
                            idx={rState + idx}
                            key={filteredMySpaces.collectionName}
                            onPress={handleAddSharedAlert.bind(this, filteredMySpaces)}>
                            {filteredMySpaces.collectionName}

                        </TaskSpaceRowPlus>)

                        

                       

                        
                    }



                    {
                        myHouses.filter((myHouse: any) => sharedSpaces.map((sharedSpace: any) => sharedSpace.collectionId).includes(myHouse.id)).map((filteredSharedSpace: any, idx: number) => 
                        <TaskSpaceRowMinus
                            idx={rState + idx + mySpaces.length + 1}
                            key={filteredSharedSpace.id + 100}
                            onPress={handleDeleteSharedAlert.bind(this, filteredSharedSpace)}>
                            {filteredSharedSpace.collectionName}

                        </TaskSpaceRowMinus>)

                        

                        

                    }



                </View>

            </View>

            <FullButtonComponent onPress={handleNavigateBack} radius={0} color={purpleColor}>
                <Text>Back</Text>
            </FullButtonComponent>
        </View>
    )

}

export default SentAcceptedInvitation;

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
    }

})
