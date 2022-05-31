import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";


interface TitleType {
    title: string;
}

const TitleComponent: FC<TitleType> = ({ title }) => {

    return (
        <View style={styles.headerContainer}>
            <Text style={[styles.mainHeader]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 30,
        color: "white",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
        marginTop: 50
    }
})

export default TitleComponent