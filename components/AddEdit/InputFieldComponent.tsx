import React, { useState } from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import UseUser from '../../hooks/use-user';
import UserContext from '../../context/UserContext';



interface IInputType{
    onChangeText: Function;
    holder: string;
}


const InputFieldComponent: FC<IInputType> = (props) => {

    const handleOnChange = (e: string) => {
        props.onChangeText(e)
    }

    return (
        //userlogin input
        <>
            
            <View style={styles.SectionStyle}>
                <TextInput
                    value={""}
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder={props.holder}
                    mode='flat'
                    selectionColor='#808080'
                    onChangeText={(e)=>handleOnChange(e)}
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
        //change back to white for other pages
        borderColor: "white",
        height: 60,
        width: "80%",
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


export default InputFieldComponent;