
import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import {ThemeContext} from "../context/ThemeContext"





const AddEditProfile: FC =() => {
    const {lilacColor} = useContext(ThemeContext)
  

    
    return(
       <Text>Hellow</Text>
    )
}

const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor:"white",
            justifyContent: 'center',
             width:200,
             height:200,
            padding: 10,
            borderRadius:5,
            margin: 3,
            
        },
    })

export default AddEditProfile
