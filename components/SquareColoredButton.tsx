import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"
import UserContext from "../context/UserContext";

interface Props {
    children: ReactNode,
    idx: number,
    onPress:Function
}

const SquareColoredButton: FC<Props> =(props) => {
    const {orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor} = useContext(ThemeContext)
  const { activeRoom, setActiveRoom } = useContext(UserContext)

    const [bgColor, setBgColor]= useState('')

  useEffect(()=> {
      selectColor()
},[])

    const selectColor = () => {
        //let r = Math.floor (Math.random()*7)
        let index =0
        let colors = [orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor]
        index = props.idx % colors.length
        setBgColor(colors[index]) 
    }

    return(
        <Pressable  style={[styles.container,  {backgroundColor:bgColor}]} onPress={()=>props.onPress()}>
            {props.children}

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width:80,
        height: 80,
        padding: 8,
        borderRadius:10,
        margin: 3,
        alignItems:"center",
    },
    })

export default SquareColoredButton