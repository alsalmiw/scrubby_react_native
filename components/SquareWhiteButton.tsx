import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import {ThemeContext} from "../context/ThemeContext"

interface Props {
    children: ReactNode,
    idx: number,
}

const SquareWhiteButton: FC<Props> =({children, idx}) => {
   

  useEffect(()=> {
 
    console.log(idx)
},[])

   

    return(
        <View style={[styles.container]}>
            {children}

        </View>
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

export default SquareWhiteButton