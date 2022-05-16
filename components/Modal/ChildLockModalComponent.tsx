import React, { FC, useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import CodeInput from 'react-native-confirmation-code-input';
import FullButtonComponent from "../FullButtonComponent";
import { ThemeContext } from "../../context/ThemeContext";
import ModalComponent from "../ModalComponent";
import UserContext from "../../context/UserContext";
//// need backend fetch to update passcode/
import { useNavigation } from '@react-navigation/native';
import IChildPassCode from "../../Interfaces/IChildPassCode";
import { UpdateChildPassCode } from "../../services/dataService";



const ChildLockModalComponent: FC = ({ }) => {

    const { setModalVisible, childPage, checkPassCode, setCheckPassCode, childPassCode, setChildPassCode } = useContext(UserContext)
    const { blueColor } = useContext(ThemeContext)
    const [newCode, setNewCode] = useState<number>()

    const navigation = useNavigation<any>();

    const navToChildLockScreen = () => {
        if (childPassCode != null) {
            setCheckPassCode(false);
            Alert.alert("Success", `Your passcode is ${childPassCode}`, [{ text: "Cancel", style: "cancel" }]);
            navigation.navigate("LockedChildTasks");
            setModalVisible(false)
        }
        else {
            Alert.alert("Error", 'Please fill in entry field', [{ text: "Cancel", style: "cancel" }]);
        }

    }
    const navToChildUnlockScreen = () => {
        if (newCode != null && newCode == childPassCode) setCheckPassCode(true), setChildPassCode(0), navigation.navigate("ChildTasks"), setModalVisible(false)
        else Alert.alert("Error", 'Passcode wrong. Try Again.', [{ text: "Cancel", style: "cancel" }]);
    }

    const updatePasscode = async () => {
        let childinfo: IChildPassCode = {
            Id: childPage.id,
            DependentPassCode: childPassCode,
        }
        console.log(childinfo)
        await UpdateChildPassCode(childinfo)
    }




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
                <ModalComponent>


                    <Text style={styles.modalText}>ACTIVATE CHILD LOCK</Text>

                    {
                        checkPassCode ?
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text>Create a 5 digit code</Text>
                                </View>

                                <View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }}>
                                    <CodeInput

                                        keyboardType="numeric"
                                        activeColor='grey'
                                        inactiveColor='grey'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={50}
                                        onFulfill={(e: number) => { setChildPassCode(Number(e)) }}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderWidth: 1.5 }}
                                    />
                                </View>
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', padding: 50 }}>
                                    <FullButtonComponent color={blueColor} radius={10} onPress={() => { updatePasscode(), navToChildLockScreen() }}> <Text>Lock</Text></FullButtonComponent>
                                </View>
                            </>
                            :
                            <>
                                {/* havent test out logic yet */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text>Enter your 5 digit code</Text>
                                </View>
                                <View style={{ flex: 0.8, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }}>
                                    <CodeInput

                                        keyboardType="numeric"
                                        activeColor='grey'
                                        inactiveColor='grey'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={50}
                                        onFulfill={(e: number) => { setNewCode(Number(e)) }}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderWidth: 1.5 }}
                                    />
                                </View>
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', padding: 50 }}>
                                    <FullButtonComponent color={blueColor} radius={10} onPress={() => { console.log(childPassCode), navToChildUnlockScreen() }}> <Text>Unlock</Text></FullButtonComponent>
                                </View>

                            </>
                    }






                </ModalComponent>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    }
});

export default ChildLockModalComponent;