import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import UserContext from "../../context/UserContext";
import { AllInvitesByInvitedUsername, InviteUser } from "../../services/dataService";

///

import RootStackParamList from '../../types/INavigateSettings'

import TwoFullButtonComponent from "../../components/TwoFullButtonComponent";
import InputFieldComponent from "../../components/AddEdit/InputFieldComponent";


import IInviteUser from '../../Interfaces/IInviteUser';
type Props = NativeStackScreenProps<RootStackParamList, 'InviteUser'>



const InviteUserScreen: FC<Props> = ({ navigation, route }) => {
    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
    const [searchUser, setSearchUser] = useState("");
    //  const [invitedUser, setInvitedUser] = useState(true);
    const { userData, allInvites, setAllInvites, } = useContext(UserContext)

    const handleGoBack = () => {
        navigation.navigate('ManageInvites')
    }
    const handleAdd = async (e: string) => {
        let inviteUser: IInviteUser = {
            Id: 0,
            InviterId: userData.id,
            InvitedUsername: e,
            IsAccepted: false,
            IsDeleted: false
        }
        console.log(inviteUser)
        console.log(userData);
        if (userData.username === e) {
            Alert.alert("Error", `You can't invite yourself`, [{ text: "Cancel", style: "cancel" }]);
        }
        else {
            let invitedUser: boolean = await InviteUser(inviteUser)

            if (invitedUser) {
                setAllInvites([...allInvites , inviteUser])
                Alert.alert("Congratulations", `Invite has been sent to ${e}`, [{ text: "Okay", style: "cancel", onPress: () => handleGoBack() }]);
            }
            else if (!invitedUser) {
                Alert.alert("Error", `User ${e} is not found or is already invited`, [{ text: "Cancel", style: "cancel" }]);
                console.log(invitedUser);
            }
        }



    }

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: greenColor }}>
                    <View style={{ flex: 0.6, flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>
                        <Text style={{ fontSize: 30, color: 'white', padding: 10, marginTop: 50 }}>Invite a User</Text>
                    </View>

                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: "flex-start" }}>
                        <Text style={{ fontSize: 20, color: 'white', paddingLeft: 40, fontWeight: 'bold' }} >Username</Text>
                    </View>

                    <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>
                        <InputFieldComponent maxLength={40} value={''} holder="Username" hide={false} onChangeText={(e: string) => setSearchUser(e)} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TwoFullButtonComponent text1="Back" text2="Add" color={purpleColor} onAcceptPress={() => handleAdd(searchUser)} onBackPress={() => handleGoBack()}></TwoFullButtonComponent>

        </>

    );
}

const styles = StyleSheet.create({

})
export default InviteUserScreen