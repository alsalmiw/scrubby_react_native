import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"
import UserContext from "../context/UserContext";

interface TitleType{
    titleFirst: string;

}

const UnderlinedOneHeaderComponent: FC<TitleType> =({titleFirst}) => {
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)



    return(
        <View style={[styles.headerContainer, {borderBottomColor: lightLilacColor} ]}>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{titleFirst}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
        mainHeader: {
            fontSize:22,
            fontWeight: "bold", 
        }, 
        headerContainer:{
            width:'100%',
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth:1,
        
        }
    })

export default UnderlinedOneHeaderComponent 