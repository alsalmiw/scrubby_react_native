import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface Props {
    children: ReactNode,
    idx: number,
    onPress:Function
}

const SquareColoredButton: FC<Props> =(props) => {
    const {orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor} = useContext(ThemeContext)
    const [bgColor, setBgColor]= useState('')

  useEffect(()=> {
      selectColor()
    console.log(props.idx)
},[])

    const selectColor = () => {
        //let r = Math.floor (Math.random()*7)
        let index =0
        let colors = [orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor]
        index = props.idx % colors.length
        console.log(index)
        setBgColor(colors[index]) 
    }

    return(
        <Pressable style={[styles.container, {backgroundColor:bgColor}]} onPress={()=>props.onPress()}>
            {props.children}

        </Pressable>
    )
}

const styles = StyleSheet.create({
       container: {
            width:"100px",
            height: '100px',
            padding: 10,
            borderRadius:5,
            margin: 3,
        },
    })

export default SquareColoredButton