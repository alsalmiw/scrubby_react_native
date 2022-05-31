import React, { FC, useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import CodeInput from 'react-native-confirmation-code-input';
import FullButtonComponent from "../FullButtonComponent";
import { ThemeContext } from "../../context/ThemeContext";
import ModalComponent from "../ModalComponent";
import UserContext from "../../context/UserContext";
import { useNavigation } from '@react-navigation/native';
import IChildPassCode from "../../Interfaces/IChildPassCode";
import { UpdateChildPassCode } from "../../services/dataService";


const ChildLockModalComponent: FC = ({ }) => {

    const { setModalVisible, childPage, checkPassCode, setCheckPassCode, childPassCode, setChildPassCode, setTaskModal, setRunAgain, setRefreshChildTask, refreshChildTask } = useContext(UserContext)
    const { blueColor, primaryTextColor } = useContext(ThemeContext)
    const [newCode, setNewCode] = useState<number>()

    const navigation = useNavigation<any>();

    const navToChildLockScreen = () => {
        if (childPassCode != null && String(childPassCode).length == 5) {
            setCheckPassCode(false);
            Alert.alert("Success", `Your passcode is ${childPassCode}`, [{ text: "Ok", style: "cancel" }]);
            setModalVisible(false)
            setTaskModal(false)
            navigation.navigate("LockedChildTasks");
            setRunAgain(true);

        }
        else {
            Alert.alert("Error", 'Please fill in entry field', [{ text: "Cancel", style: "cancel" }]);
        }

    }
    const navToChildUnlockScreen = () => {
        if (newCode != null && newCode == childPassCode) {
            setCheckPassCode(true);

            setChildPassCode(0);
            setTaskModal(false)
            setModalVisible(false);
            navigation.navigate("ChildTasks");
            setRunAgain(true);

        }
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
                    <Text style={[styles.modalText, { color: primaryTextColor, fontWeight: "bold" }]}>ACTIVATE CHILD LOCK</Text>
                    {
                        checkPassCode ?
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={[styles.modalText, { color: primaryTextColor }]}>Create a 5 digit code</Text>
                                </View>

                                <View style={styles.codeInput}>
                                    <CodeInput
                                        keyboardType="numeric"
                                        activeColor='grey'
                                        inactiveColor='grey'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={50}
                                        onFulfill={(e: number) => setChildPassCode((e))}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderWidth: 1.5 }}
                                    />
                                </View>
                                <View style={styles.codeInputBtn}>
                                    <FullButtonComponent color={blueColor} radius={10} onPress={() => { updatePasscode(), navToChildLockScreen() }}> <Text>Lock</Text></FullButtonComponent>
                                </View>
                            </>
                            :
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={[styles.modalText, { color: primaryTextColor }]}>Enter your 5 digit code</Text>
                                </View>
                                <View style={styles.codeInput}>
                                    <CodeInput
                                        keyboardType="numeric"
                                        activeColor='grey'
                                        inactiveColor='grey'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={50}
                                        onFulfill={(e: number) => setNewCode(Number(e))}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderWidth: 1.5 }}
                                    />
                                </View>
                                <View style={styles.codeInputBtn}>
                                    <FullButtonComponent color={blueColor} radius={10} onPress={() => navToChildUnlockScreen()}> <Text>Unlock</Text></FullButtonComponent>
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
    },

    codeInput: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    
    codeInputBtn: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 50
    }
});

export default ChildLockModalComponent;