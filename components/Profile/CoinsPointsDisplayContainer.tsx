import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext"
import { MaterialCommunityIcons, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

interface NameType {
    coins: string;
    points: string;
}

const CoinsPointsDisplayContainer: FC<NameType> = ({ coins, points }) => {
    const { secondaryTextColor, yellowColor, lilacColor } = useContext(ThemeContext)

    return (
        <View style={[styles.coinsDisplayContainer, { borderColor: yellowColor }]}>
            <Text style={[styles.fontStyle, { color: secondaryTextColor }]}> <FontAwesome name="star" color={yellowColor} />  {points}</Text>
            <Text style={[styles.fontStyle, { color: secondaryTextColor }]}> <FontAwesome5 name="coins" color={yellowColor} />  {coins}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    coinsDisplayContainer: {
        width: '40%',
        borderWidth: 2,
        borderRadius: 5,
    },
    fontStyle: {

    }
})

export default CoinsPointsDisplayContainer