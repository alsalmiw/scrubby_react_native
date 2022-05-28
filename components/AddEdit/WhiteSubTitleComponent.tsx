import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";


interface TitleType{
    title: string;
}

const WhiteSubTitleComponent: FC<TitleType> =({title}) => {
  

    return(
        <View style={styles.headerContainer}>
        <Text style={[styles.mainHeader]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        mainHeader: {
            fontSize:20,
            color: "#FFF",
            fontWeight: "bold"
        }, 
        headerContainer:{
            paddingRight: 10,
            width:'80%',
            flexDirection: "row",
            justifyContent: "flex-start",
            marginBottom:2,
            marginTop:15,
        }
    })

export default WhiteSubTitleComponent