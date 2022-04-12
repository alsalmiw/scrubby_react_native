import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';




const InputFieldComponentLogin = () => {


    return (
        //userlogin input
        <>
            <View style={styles.SectionStyle}>
                <Image
                    source={require('../../image/icon.png')}
                    style={styles.ImageStyle}
                />
                <TextInput
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder="username"
                    mode='flat'
                    selectionColor='#808080'
                />

            </View>

            <View style={styles.SectionStyle}>
                <Image
                    source={require('../../image/lock.png')}
                    style={[styles.ImageStyle, { width: 25, height: 30 }]}
                />
                <TextInput
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder="password"
                    mode='flat'
                    selectionColor='#808080'
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
        borderColor: '#808080',
        height: 60,
        width: 300,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden'
    },
    ImageStyle: {
        padding: 10,
        marginRight: 20,
        marginLeft: 20,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
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