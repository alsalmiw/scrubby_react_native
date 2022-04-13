import React, { useState } from "react";
import { FC, useContext } from "react";
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import UseUser from '../../hooks/use-user';
import UserContext from '../../context/UserContext';




const InputFieldComponentLogin = () => {
    const {setPassword, setUsername } = useContext(UserContext)
    const [hide, setHide] = useState(true);
    const [eye, setEye] = useState(true);


    return (
        //userlogin input
        <>
            <View style={styles.SectionStyle}>
            <AntDesign name="user" size={28} color="#808080" style={styles.ImageStyle} />
                <TextInput
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder="username"
                    mode='flat'
                    selectionColor='#808080'
                    onChangeText={(e)=>setUsername(e)}
                />

            </View>


            <View style={styles.SectionStyle}>
            <AntDesign name="lock" size={28} color="#808080" style={styles.ImageStyle}/>
            
                <TextInput
                        autoComplete='off'
                        style={styles.inputUsername}
                        placeholder="password"
                        mode='flat'
                        selectionColor='#808080'
                        onChangeText={(e)=>setPassword(e)}
                        secureTextEntry={hide}  
                    />
            

            </View>


        </>

    );
};

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: "white",
        height: 60,
        width: 300,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        

    },
    ImageStyle: {
        paddingLeft:10

    },
    inputUsername: {
        flex: 1,
        height: 60,
        width: 50,
        paddingEnd: 10,
        backgroundColor: 'white',
        textDecorationLine: "underline",
        overflow: 'hidden',
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    



    }
})


export default InputFieldComponentLogin;