import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface TitleType{
    titleOne: string;
    titleTwo: string;
}

const UnderlinedHeaderComponent: FC<TitleType> =({titleOne, titleTwo}) => {
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)

    return(
        <View style={[styles.headerContainer, {borderBottomColor: lightLilacColor} ]}>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{titleOne}</Text>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{titleTwo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        mainHeader: {
            fontSize:20,
            fontWeight: "bold", 
        }, 
        headerContainer:{
            width:'95%',
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth:1,
        }
    })

export default UnderlinedHeaderComponent