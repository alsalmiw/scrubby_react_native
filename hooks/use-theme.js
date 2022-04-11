import { useState } from "react";
import {StyleSheet} from "react-native"

export default function UseTheme(){

    const primaryColor='#5D5D5D'
    const secondaryColor='#5D5D5D'

    const theme = StyleSheet.create({
        inputBox:{
            borderBottomColor: 'red',
            backgroundColor: 'white',
            padding: 20,
            borderBottomWidth: 1
        },
        loginBtn: {
            backgroundColor: 'blue',
        },
        mainHeader: {
            Color: primaryColor,
            fontSize:25,
            textTransform: "uppercase",
        }
    })

return{theme}
}

