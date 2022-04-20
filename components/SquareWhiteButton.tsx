import React, { ReactNode, useEffect, useState } from "react";
import { FC, useContext } from "react";
import { Pressable, StyleSheet,} from "react-native";

interface Props {
    children: ReactNode,
    onPress: Function
}

const SquareWhiteButton: FC<Props> =(props) => {
   

  useEffect(()=> {
 
   
},[])

  

    return(
        <Pressable style={[styles.container]} onPress={props.onPress()}>
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

export default SquareWhiteButton