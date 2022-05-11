import React, { FC, useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import CodeInput from 'react-native-confirmation-code-input';
import FullButtonComponent from "../FullButtonComponent";
import { ThemeContext } from "../../context/ThemeContext";
import ModalComponent from "../ModalComponent";



const ChildLockModalComponent: FC = () => {
    const [childPassCode, setChildPassCode] = useState<any>()
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
                <ModalComponent>

                            <Text style={styles.modalText}>ACTIVATE CHILD LOCK</Text>
                            <Text>Enter your 5 digit number</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, }}>
                                <CodeInput
                                    secureTextEntry
                                    keyboardType="numeric"
                                    compareWithCode={childPassCode}
                                    activeColor='grey'
                                    inactiveColor='grey'
                                    autoFocus={false}
                                    ignoreCase={true}
                                    inputPosition='center'
                                    size={50}
                                    onFulfill={(e: any) => console.log(e)}
                                    containerStyle={{ marginTop: 30 }}
                                    codeInputStyle={{ borderWidth: 1.5 }}
                                />

                            </View>


                            {/* <FullButtonComponent color={blueColor} radius={10} onPress={() => { console.log('hi'), setModalVisible(!modalVisible) }}> <Text>Lock</Text></FullButtonComponent> */}

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