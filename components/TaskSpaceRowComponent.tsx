import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface Props {
    children: ReactNode,
    idx: number,
}

const TaskSpaceRowComponent: FC<Props> =({children, idx}) => {
    const {orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor, bgColor, setBgColor} = useContext(ThemeContext)
    
  useEffect(()=> {
      selectColor()
    console.log(idx)
},[])

    const selectColor = () => {
        //let r = Math.floor (Math.random()*7)
        let index =0
        let colors = [orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor]
        index = idx % colors.length
        console.log(index)
        setBgColor(colors[index]) 
    }

    return(
        <View style={[styles.container, {backgroundColor:bgColor}]}>
            {children}

        </View>
    )
}

const styles = StyleSheet.create({
       container: {
            width:"95%",
            padding: 10,
            borderRadius:5,
            margin: 3,
        },
    })

export default TaskSpaceRowComponent