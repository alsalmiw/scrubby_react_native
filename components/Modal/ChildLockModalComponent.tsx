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



const ChildLockModalComponent: FC = ({}) => {
    const [childPassCode, setChildPassCode] = useState<any>()
    const [checkPassCode, setCheckPassCode] = useState<boolean>()
    const { setModalVisible, childPage } = useContext(UserContext)
    const { blueColor } = useContext(ThemeContext)
    
    const navigation = useNavigation<any>();

    const navToChildLockScreen = () => {
        if (childPassCode != null) navigation.navigate("MyProfile"), console.log('navigate'), setModalVisible(false)
        else Alert.alert("Error", 'Please fill in entry field', [{ text: "Cancel", style: "cancel" }]);

    }
    const navToChildUnlockScreen = () =>{
        if (childPassCode != null) navigation.navigate("ChildTasks"), setModalVisible(false)
        else Alert.alert("Error", 'Please fill in entry field', [{ text: "Cancel", style: "cancel" }]);
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
                {/* check if pass code is zero or is going to be updated. */}
                <ModalComponent>


                    <Text style={styles.modalText}>ACTIVATE CHILD LOCK</Text>

                    {
                        childPage.dependentPassCode == 0 ?
                            <>
                                <Text>Enter a 5 digit code</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }}>
                                    <CodeInput
                                        secureTextEntry
                                        keyboardType="numeric"
                                        activeColor='grey'
                                        inactiveColor='grey'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={50}
                                        onFulfill={(e: any) => { console.log('nothing'), console.log(e), setChildPassCode(e) }}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderWidth: 1.5 }}
                                    />
                                </View>
                                <FullButtonComponent color={blueColor} radius={10} onPress={() => { console.log(childPassCode), navToChildLockScreen() }}> <Text>Lock</Text></FullButtonComponent>
                            </>
                            :
                            <>
                                <Text>Enter your 5 digit number</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }}>
                                    <CodeInput
                                        value={childPassCode}
                                        secureTextEntry
                                        keyboardType="numeric"
                                        compareWithCode={childPassCode}
                                        activeColor='grey'
                                        inactiveColor='grey'
                                        autoFocus={false}
                                        ignoreCase={true}
                                        inputPosition='center'
                                        size={50}
                                        onFulfill={(e: any) => { console.log('something'), console.log(e), setChildPassCode(e), setCheckPassCode(e) }}
                                        containerStyle={{ marginTop: 30 }}
                                        codeInputStyle={{ borderWidth: 1.5 }}
                                    />
                                </View>
                                <FullButtonComponent color={blueColor} radius={10} onPress={() => { console.log(childPassCode), navToChildUnlockScreen() }}> <Text>Lock</Text></FullButtonComponent>
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