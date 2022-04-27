import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import UserContext from "../../context/UserContext";
import { AllInvitesByInvitedUsername, InviteUser } from "../../services/dataService";



import RootStackParamList from '../../types/INavigateSettings'

import TwoFullButtonComponent from "../TwoFullButtonComponent";
import InputFieldComponent from "./InputFieldComponent";


import IInviteUser from '../../Interfaces/IInviteUser';
type Props = NativeStackScreenProps<RootStackParamList, 'RedeemCoins'>



const InviteUserComponent: FC<Props> = ({ navigation, route }) => {
    const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor, greenColor } = useContext(ThemeContext);
    // const [searchUser, setSearchUser] = useState("");
    const {searchUser, setSearchUser, userData} = useContext(UserContext)

    const handleGoBack = () => {
        navigation.navigate('ManageInvites')
    }
    const handleAdd = async(e: string) => {
        let inviteUser:IInviteUser = {
            Id:0,
            UserId: userData.id,
            InvitedUsername:e,
            IsAccepted:false,
            IsDeleted:false
        }
        console.log(inviteUser);
        console.log(userData.id);
        let invitedUser:any = await InviteUser(inviteUser)
        
        if(invitedUser === true)
        {
            console.log(invitedUser);
        }
        else if(!inviteUser){
            Alert.alert("Error", `User ${e} does not exist`, [{ text: "Cancel", style: "cancel" }]);
        }
        

        setSearchUser("")
        // console.log(searchUser)
        // handleGoBack();
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
                        <InputFieldComponent value={searchUser}  holder="Username" hide={false} onChangeText={(e:string) => setSearchUser(e)} />
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <TwoFullButtonComponent text1="Back" text2="Add" color={purpleColor} onAcceptPress={() => handleAdd(searchUser)} onBackPress={() => handleGoBack()}></TwoFullButtonComponent>
            
        </>

    );
}

const styles = StyleSheet.create({

})
export default InviteUserComponent