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
import TaskSpaceRowCheck from '../../components/TaskSpaceRowCheck';
import SquareColoredButton from '../../components/SquareColoredButton';
import SquareWhiteButton from '../../components/SquareWhiteButton';
import TaskSpaceRowPlus from '../../components/TaskSpaceRowPlus';
import  ISharedSpace  from '../../Interfaces/ISharedSpace';
import { CreateSharedSpaces } from '../../services/dataService';
import { ISpace } from '../../Interfaces/ISpace';



type Props = NativeStackScreenProps<RootStackParamList, 'SentAcceptedInvitation'>

const SentAcceptedInvitation: FC<Props> = ({ navigation }) => {

    const [fullName, setFullName] = useState<string>("");
    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
    const { userData, inviters, setInviters, invited, setInvited, refresh, setRefresh, acceptedInvitations, setAcceptedInvitations, rState, mySpaces, setMySpaces, sentAcceptedInvitations, setSentAcceptedInvitations } = useContext(UserContext)
    
    let r = Math.floor(Math.random() * 7)

    const handleDisplayFullName = async () => {
        console.log(sentAcceptedInvitations);

        let invitedUserNameAsyncStorage = (await AsyncStorage.getItem('Invited'))!;
        //This gives me peter
        console.log(invitedUserNameAsyncStorage);

        for (let i = 0; i < sentAcceptedInvitations.length; i++) {
            if (sentAcceptedInvitations[i].invitedUsername === invitedUserNameAsyncStorage) {
                if (sentAcceptedInvitations[i].invitedFullname) {
                    setFullName(sentAcceptedInvitations[i].invitedFullname);
                } else {
                    setFullName(sentAcceptedInvitations[i].invitedUsername);
                }
            }
        }



    }

    const handleDisplayAlert = async (space: ISpace | string ) => {
        console.log('Hello There');
        console.log(space);
        console.log(await AsyncStorage.getItem('Invited'));

        //This will be how we add create shared Space
        /* 
            let newSharedSpace:ISharedSpace = {
                id:0, 
                invitedUsername: peter or get it from local storage or something,
                collectionId: space.id,
                isDeleted: false,
                isAccepted: true
            }
            console.log(newSharedSpace)

            let result = await CreateSharedSpaces(newSharedSpace)
            if (result)
            {
                Alert.alert("You have successfully added a new shared space")
               
                //dont know what to save it too, do it later
                
            }

            console.log(result);

        */

    }

    const handleNavigateBack = () => {
        navigation.navigate('ManageInvites');
        setRefresh(true);
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
                        {/* The hello there is just a test, i will remove later when done adding changes */}
                        <Feather name="trash-2" size={40} color='black' onPress={handleDisplayAlert.bind(this, "Hello There")} />
                        <UserNameComponent name="Delete User"></UserNameComponent>
                    </View>
                </View>
            </View>

            <View style={styles.secondRowContainer}>
                <UnderlinedOneHeaderComponent titleFirst='Add To'></UnderlinedOneHeaderComponent>
                <View style={styles.insideSecondRowContainer1}>
                    

                    {
                        mySpaces.map((space:ISpace, idx:number) =>
                        <TaskSpaceRowPlus
                          idx={rState+idx}
                          key={idx}
                          onPress={handleDisplayAlert.bind(this, space)}
                        >
                          {space.collectionName}
                        </TaskSpaceRowPlus>
              
                      )
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
