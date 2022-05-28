import React, { useState } from "react";
import { FC, useContext } from "react";
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import UseUser from '../../hooks/use-user';
import UserContext from '../../context/UserContext';






const InputFieldComponentLogin = () => {
    const { setPassword, password, username, setUsername, login, setLogin, fullName, setFullName, } = useContext(UserContext)
    const [hide, setHide] = useState(true);



    return (
        //userlogin input
        <>
            {login?
                <View style={styles.SectionStyle}>
                    <AntDesign name="user" size={28} color="#808080" style={styles.ImageStyle} />
                    <TextInput

                        autoComplete='off'
                        style={styles.inputUsername}
                        placeholder="Full Name"
                        mode='flat'
                        selectionColor='#808080'
                        onChangeText={e => setFullName(e)}
                        // onEndEditing={(e) => setFullName(e)}
                        value={fullName}


                    />

                </View>
                :null
            }
            <View style={styles.SectionStyle}>
                <AntDesign name="user" size={28} color="#808080" style={styles.ImageStyle} />
                <TextInput
                    value={username}
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder="username"
                    mode='flat'
                    selectionColor='#808080'
                    onChangeText={(e) => setUsername(e)}
                />

            </View>


            <View style={styles.SectionStyle}>
                <AntDesign name="lock" size={28} color="#808080" style={styles.ImageStyle} />

                <TextInput
                    value={password}
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder="password"
                    mode='flat'
                    selectionColor='#808080'
                    onChangeText={(e) => setPassword(e)}
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
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: "#FFF",
        height: 60,
        width: 300,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    ImageStyle: {
        paddingLeft: 10

    },
    inputUsername: {
        flex: 1,
        height: 60,
        width: 50,
        paddingEnd: 10,
        backgroundColor: '#FFF',
        textDecorationLine: "underline",
        overflow: 'hidden',
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,




    }
})


export default InputFieldComponentLogin;