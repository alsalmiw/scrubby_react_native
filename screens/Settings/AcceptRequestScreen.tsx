import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, StatusBar, View, Alert, Pressable } from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import TwoFullButtonComponent from "../../components/TwoFullButtonComponent";
import UnderlinedHeaderComponent from "../../components/UnderlinedHeaderComponent";
import UnderlinedOneHeaderComponent from "../../components/UnderlinedOneHeaderComponent";
import { ThemeContext } from "../../context/ThemeContext";
import RootStackParamList from "../../types/INavigateSettings";

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from "../../context/UserContext";
import { AcceptInvite, DeleteInvite, GetUserByUsername } from "../../services/dataService";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AvatarComponent from "../../components/AvatarComponent";
import UserNameComponent from "../../components/UserNameComponent";


type Props = NativeStackScreenProps<RootStackParamList, 'AcceptRequest'>

const AcceptRequestScreen: FC<Props> = ({ navigation, route, }) => {

    interface IPerson {
        coins: number,
        id: number,
        isDeleted: boolean,
        name: string,
        photo: string,
        points: number,
        username: string,
    }


    const { purpleColor, lilacColor, primaryTextColor, secondaryTextColor } = useContext(ThemeContext)
    const { inviters, setInviters, userData, refresh, setRefresh } = useContext(UserContext)
    const [fullName, setFullName] = useState("")
    const [Name, setName] = useState("")
    const [person, setPerson] = useState<any>({})
    const [inviterPhoto, setInviterPhoto] = useState<any>();


    const handleAcceptBtn = async () => {
        await handleGetLocalNameInfo()
        let accept = await AcceptInvite(person.id, userData.username)
        setRefresh(true)
        Alert.alert("Congratulation", `${person.name} can now share a space with you`, [{ text: "Cancel", style: "cancel", onPress: () => { setRefresh(true); navigation.navigate("ManageInvites") } }])
    }

    const handleGetLocalNameInfo = async () => {
        let displayFullName: any = await AsyncStorage.getItem('InviterFullName')
        
        if (displayFullName.length != 0) {
            setFullName(displayFullName)
        }
        let displayPersonName: any = await AsyncStorage.getItem('Inviter')
        let displayPerson = await GetUserByUsername(displayPersonName);
        if (displayPerson != null) {
            
            setName(displayPersonName)
            setPerson(displayPerson);
        }



    }

    const handleGetInviterPhoto = async () => {
        let photo = await AsyncStorage.getItem('InviterPhoto')!;
        setInviterPhoto(photo);

    }



    const handleDisplayAlert = () => {
        Alert.alert("Deleting request", "You are about to delete a request, would you like to delete this?",
            [
                { text: "Cancel", onPress: () => {}, style: "destructive" },
                { text: "Delete", onPress: removeInvitee, style: "default" }
            ])
    }



    const removeInvitee = async () => {
        
        let result = await DeleteInvite(person.id, userData.username)
        
        setRefresh(true)
        navigation.navigate("ManageInvites");

    }
    const handleGetName = async () => {

        await handleGetLocalNameInfo()
    }
    useEffect(() => {
        handleGetName()
        handleGetInviterPhoto();
        

    }, [])

    return (
        <>
            <View style={styles.container}>
                <View>
                    <HeaderComponent title={"Pending Request"}></HeaderComponent>
                </View>
                <View style={styles.firstRowContainer}>

                    <AvatarComponent onPress={() => {}} imageSource={inviterPhoto} />

                    <View style={styles.insideFirstRowContainer1}>
                        <UserNameComponent name={fullName}></UserNameComponent>
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleDisplayAlert}>
                            <Feather name="trash-2" size={30} color={lilacColor} />
                            <UserNameComponent name="Delete User"></UserNameComponent>
                        </Pressable>
                    </View>

                </View>

                <View style={styles.underlineContainer}>
                    <UnderlinedOneHeaderComponent titleFirst="Action" />
                </View>
                <View style={[styles.underlineContainer, { paddingTop: 10 }]}>
                    <UserNameComponent name="This user has invited you to share responsibilities." />
                </View>

            </View>
            <TwoFullButtonComponent text1="Back" text2="Accept" color={purpleColor} onBackPress={() => { navigation.navigate("ManageInvites") }} onAcceptPress={() => { handleAcceptBtn() }} />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    underlineContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 10,
    },
    insideFirstRowContainer1: {
        justifyContent: 'space-around',
        paddingLeft: '3%',
        flex: 1
    },
    firstRowContainer: {
        flexDirection: 'row',
    },
    insideFirstRowContainer2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default AcceptRequestScreen