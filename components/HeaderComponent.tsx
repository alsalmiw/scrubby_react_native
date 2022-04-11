import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface TitleType{
    title: string;
}

const HeaderComponent: FC<TitleType> =({title}) => {
    const {secondaryTextColor} = useContext(ThemeContext)

    return(
        <View style={styles.headerContainer}>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        mainHeader: {
            fontSize:25,
            textTransform: "uppercase",
        }, 
        headerContainer:{
            paddingRight: 10,
            width:'100%',
            flexDirection: "row",
            justifyContent: "flex-end"
        }
    })

export default HeaderComponent