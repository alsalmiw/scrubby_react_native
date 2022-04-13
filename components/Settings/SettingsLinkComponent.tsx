import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {ThemeContext} from "../../context/ThemeContext"
import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native"

interface TitleType{
    linkName: string;
    linkTo: any;
    icon: any;
}



const SettingsLinkComponent: FC<TitleType> =({linkName, linkTo, icon}) => {
    const {secondaryTextColor, lightLilacColor, orangeColor} = useContext(ThemeContext)
    const navigation = useNavigation();
    return(
        <Pressable style={styles.container} onPress={()=>navigation.navigate(linkTo)}>
          <FontAwesome name={icon} size={25} style={{marginRight: 10, color: orangeColor}} />
        <View style={[styles.headerContainer, {borderBottomColor: lightLilacColor} ]}>
      
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{linkName}</Text>
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