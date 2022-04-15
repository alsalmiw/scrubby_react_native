import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface TitleType {
    title: string;
}

const HeaderComponent: FC<TitleType> = ({ title }) => {
    const { secondaryTextColor } = useContext(ThemeContext)

    return (
        <View style={styles.headerContainer}>
            <Text style={[styles.mainHeader, { color: secondaryTextColor }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        mainHeader: {
            fontSize:25,
            textTransform: "uppercase",
            fontWeight: "bold",
        }, 
        headerContainer:{
            paddingTop: StatusBar.currentHeight,
            paddingRight: 10,
            width:'100%',
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom:30,
        }
    })

export default HeaderComponent