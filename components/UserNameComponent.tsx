import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface NameType{
    name: string | null;
}

const UserNameComponent: FC<NameType> =({name}) => {
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)

    return(
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{name}</Text>
    )
}

const styles = StyleSheet.create({
        mainHeader: {
            fontSize:15,
            fontWeight: "bold", 
        },
    })

export default UserNameComponent