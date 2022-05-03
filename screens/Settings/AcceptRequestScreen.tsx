import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, StatusBar, View, Alert, Pressable } from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import TwoFullButtonComponent from "../../components/TwoFullButtonComponent";
import UnderlinedHeaderComponent from "../../components/UnderlinedHeaderComponent";
import UnderlinedOneHeaderComponent from "../../components/UnderlinedOneHeaderComponent";
import { ThemeContext } from "../../context/ThemeContext";
import RootStackParamList from "../../types/INavigateSettings";
/////
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from "../../context/UserContext";
import { AcceptInvite, GetUserByUsername } from "../../services/dataService";

import { FontAwesome } from '@expo/vector-icons';


type Props = NativeStackScreenProps<RootStackParamList, 'AcceptRequest'>

const AcceptRequestScreen: FC<Props> = ({ navigation, route }) => {

    interface IPerson {
        coins: number,
        id: number,
        isDeleted: boolean,
        name: string,
        photo: string,
        points: number,
        username: string,
    }

    const { purpleColor } = useContext(ThemeContext)
    const { allInvites, setAllInvites, allRequestName, setAllRequestName, userData } = useContext(UserContext)
    const [Name, setName] = useState("")
    const [person, setPerson] = useState<any>({})


    const handleAcceptBtn = async () => {
        await handleGetLocalNameInfo()
        let accept = await AcceptInvite(person.id, userData.username)
        console.log(accept)
        removeInvitee()
        console.log(allRequestName)

        Alert.alert("Congratulation", `${person.username} can now share a space with you`, [{ text: "Cancel", style: "cancel", onPress: () => navigation.navigate("ManageInvites") }])
    }

    const handleGetLocalNameInfo = async () => {
        let displayFullName: any = await AsyncStorage.getItem('InviterFullName')
        //console.log(displayFullName)
        if (displayFullName.length != 0) {
            setName(displayFullName)
        }
        let displayPersonName: any = await AsyncStorage.getItem('Inviter')
        let displayPerson = await GetUserByUsername(displayPersonName);
        if (displayPerson != null) {
            setPerson(displayPerson);
        }

    }
    const removeInvitee = () => {
        //call delete fetch here 
        setAllRequestName(allRequestName.filter((person: IPerson) => person.username != Name))

    }
    const handleGetName = async () => {

        await handleGetLocalNameInfo()
    }
    useEffect(() => {
        handleGetName()
        console.log(userData)

    }, [])

    return (
        <>
            <View style={styles.container}>
                <View>
                    <HeaderComponent title={"ADD TO MY SPACE"}></HeaderComponent>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                    <Text>{Name}</Text>
                    <Pressable>
                        <FontAwesome name="trash-o" size={24} style={{ paddingLeft: 20 }} color="gray" />
                        <Text>Delete User</Text>
                    </Pressable>

                </View>
                <View style={styles.underlineContainer}>
                    <UnderlinedOneHeaderComponent titleFirst="Action" />
                </View>
                <View style={styles.underlineContainer}>
                    <Text style={{ fontSize: 20, paddingTop: 10 }}>This user has invited you to share responsibilities.</Text>
                </View>

            </View>
            <TwoFullButtonComponent text1="Back" text2="Accept" color={purpleColor} onBackPress={() => navigation.navigate("ManageInvites")} onAcceptPress={() => { handleAcceptBtn() }} />
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
});

export default AcceptRequestScreen