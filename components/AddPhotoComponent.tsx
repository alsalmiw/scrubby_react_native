import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {ThemeContext} from "../context/ThemeContext"

interface PhotoType{
    photo: string;
}

const AddPhotoComponent: FC<PhotoType> =({photo}) => {
    const {lilacColor} = useContext(ThemeContext)

    return(
        <TouchableHighlight style={[styles.container]}>
            
            <FontAwesome name="camera" color={lilacColor} size={25}  />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
             width:100,
             height:100,
            padding: 10,
            margin: 3,
            
        },
    })

export default AddPhotoComponent