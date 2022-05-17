import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface Props {
   onPress:Function
    date: string,
    idx: number
   
}

const ScheduleDateBtnComponent: FC<Props> =(props) => {
    const {orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor} = useContext(ThemeContext)
    const [bgColor, setBgColor]= useState('')
    const [r, setR] = useState('')

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

    const setDateTasks = () => {
        //make color fill 
        props.onPress()
    }



    return(
        <Pressable style={[styles.dateBtn, {borderColor:bgColor}]} onPress={()=>setDateTasks()}>
   
      <Text style={[styles.dateText]}>{props.date.slice(0,3)}</Text> 
      <View style={[styles.dash]}></View>
      <Text style={[styles.dateText]}>{props.date.slice(8,10)}</Text> 

    </Pressable>

    )
}

const styles = StyleSheet.create({
    dateBtn: {
        width:80,
        height: 100,
        borderWidth: 2,
       // borderColor:"#000000",
        borderRadius:10,
        margin:10,
        marginRight:5,
        padding:10,
        justifyContent: "center",
        alignItems: "center",
      },
      dash:{
        width:"80%",
        borderWidth: 1,
        borderColor:"#000000",
        margin: 20,
      },
      dateText: {
        fontSize:20
      },
      datesContainer:{
      
        flexDirection: "row",
        
      }
    })

export default ScheduleDateBtnComponent