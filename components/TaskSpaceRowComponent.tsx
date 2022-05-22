import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface Props {
    children: ReactNode,
    idx: number,
    onPress: Function | undefined
}

const TaskSpaceRowComponent: FC<Props> =(props) => {
    const {orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor} = useContext(ThemeContext)
    const [bgColor, setBgColor]= useState('')

  useEffect(()=> {
      selectColor()
    // console.log(props.idx)
},[])

    const selectColor = () => {
        //let r = Math.floor (Math.random()*7)
        let index =0
        let colors = [orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor]
        index = props.idx % colors.length
        // console.log(index)
        setBgColor(colors[index]) 
    }
    const handleOnPress = () => {
        if(props.onPress) 
        {props.onPress()}
    }

    return(
        <Pressable key ={props.idx} style={[styles.container, {backgroundColor:bgColor}]} onPress={()=>handleOnPress()}>
            
            {props.children}

        </Pressable>
    )
}

const styles = StyleSheet.create({
       container: {
            width:"95%",
            padding: 15,
            borderRadius:5,
            margin: 3,
        },
    })

export default TaskSpaceRowComponent