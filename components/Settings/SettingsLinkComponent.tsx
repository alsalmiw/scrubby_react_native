import React, { ReactNode } from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {ThemeContext} from "../../context/ThemeContext"
import {useNavigation} from "@react-navigation/native"

interface TitleType{
    linkName: string;
    linkTo: any;
    children: ReactNode
    onPress: Function;
}

const SettingsLinkComponent: FC<TitleType> =(props) => {
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)
    const navigation = useNavigation();

    const handleLink = () => {
        props.onPress()
        navigation.navigate(props.linkTo)
    }

    return(
        <Pressable style={styles.container} onPress={()=>handleLink()}>
       {props.children}
        <View style={[styles.headerContainer, {borderBottomColor: lightLilacColor} ]}>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{props.linkName}</Text>
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
        mainHeader: {
            fontSize:20,
            fontWeight: "bold", 
        }, 
        headerContainer:{
            width:'90%',
            flexDirection: "row",
            justifyContent: 'flex-start',
            borderBottomWidth:1,
        }, 
        container: {
            width:'100%',
            padding: 20,
            flexDirection: "row",
            justifyContent: 'flex-start',
        }
    })

export default SettingsLinkComponent