import { useState } from "react";
import {StyleSheet} from "react-native"

export default function UseTheme(){

    const styles = StyleSheet.create({
        inputBox:{
            borderBottomColor: 'red',
            backgroundColor: 'white',
            padding: 20,
            borderBottomWidth: 1
        },
        loginBtn: {
            backgroundColor: 'blue',
        }
    })

return{styles}
}

