import React from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"
import UserContext from "../context/UserContext";

interface TitleType{
    titleOne: string;
    titleTwo: any;
    titleThree: any;

}

const UnderlinedHeaderComponent: FC<TitleType> =({titleOne, titleTwo, titleThree}) => {
    const {secondaryTextColor, lightLilacColor} = useContext(ThemeContext)
    const {seeAll, setSeeAll} = useContext(UserContext)


    return(
        <View style={[styles.headerContainer, {borderBottomColor: lightLilacColor} ]}>
        <Text style={[styles.mainHeader, {color:secondaryTextColor}]}>{titleOne}</Text>
        {
            seeAll?
                    <Text style={[styles.mainHeader, {color:secondaryTextColor}, {textDecorationLine:'underline'}]} onPress={()=> setSeeAll(!seeAll)}>{titleTwo}</Text>
                    :
                    <Text style={[styles.mainHeader, {color:secondaryTextColor}, {textDecorationLine:'underline'}]}  onPress={()=> setSeeAll(!seeAll)}>{titleThree}</Text>
        }

        </View>
    )
}


const styles = StyleSheet.create({
        mainHeader: {
            
            fontSize:20,
            fontWeight: "bold", 
        }, 
        headerContainer:{
            flex:1,
            width:'95%',
            flexDirection: "row",
            justifyContent: "space-between",
           
            borderBottomWidth:1,
        }
    })

export default UnderlinedHeaderComponent