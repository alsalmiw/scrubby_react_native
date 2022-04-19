import { FC } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"





const PhotoComponent:FC =(props) =>{

    return(
        <>
            <View >
                <Pressable>

                {props.children}

                </Pressable>


            </View>

        </>

    )
}


export default PhotoComponent