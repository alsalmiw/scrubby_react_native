import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface TitleType{
    title: string;
}

const UnderlinedHeaderComponent: FC<TitleType> =({title}) => {
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)

    return(
        <View style={[styles.headerContainer, {borderBottomColor: lightLilacColor} ]}>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{title}</Text>
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
            justifyContent: "flex-start",
            borderBottomWidth:1,
        }
    })

export default UnderlinedHeaderComponent