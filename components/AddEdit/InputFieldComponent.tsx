import React from "react";
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';







const InputFieldComponent = () => {
    return (
        <>
            
            <View style={styles.SectionStyle}>
                <TextInput
                    value={""}
                    autoComplete='off'
                    style={styles.inputUsername}
                    placeholder="something"
                    mode='flat'
                    selectionColor='#808080'
                    onChangeText={(e)=>console.log(e)}
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


export default InputFieldComponent;