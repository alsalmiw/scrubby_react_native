import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"
import UserContext from "../context/UserContext";

interface Props {
   onPress:Function
    date: string,
    idx: number
   
}

const ScheduleDateBtnComponent: FC<Props> =(props) => {
    const {orangeColor, purpleColor, fuchsiaColor, violetColor, greenColor, yellowColor, blueColor, primaryTextColor, primaryColor} = useContext(ThemeContext)
  const { activeDate, setActiveDate } = useContext(UserContext)

    const [bgColor, setBgColor]= useState('grey')
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
    // {color:activeDate == props.date?primaryColor:bgColor}


    return(
        <Pressable style={[styles.dateBtn, {borderColor:bgColor, backgroundColor:activeDate == props.date?bgColor:'rgb(255, 255, 255)' }]} onPress={()=>setDateTasks()}>
      <Text style={[ {fontSize:20, color:activeDate == props.date?'white':bgColor}]}>{props.date.slice(0,3)}</Text> 
      <View style={[styles.dash, {borderColor:activeDate == props.date?'white':bgColor}]}></View>
      <Text style={[{fontSize:20, color:activeDate == props.date?'white':bgColor}]}>{props.date.slice(8,10)}</Text> 
    </Pressable>


    )
}

const styles = StyleSheet.create({
    dateBtn: {
        width:70,
        height: 90,
        borderWidth: 2,
        borderRadius:10,
        margin:10,
        marginRight:5,
        padding:5,
        justifyContent: "center",
        alignItems: "center",
      },
      dash:{
        width:"80%",
        borderWidth: 1,
        margin: 10,
      },
      datesContainer:{
        flexDirection: "row",
      }
    })

export default ScheduleDateBtnComponent