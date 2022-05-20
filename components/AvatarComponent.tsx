import { FC, useEffect } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import IAvatar from '../types/IAvatars'


interface IAvatar {
    onPress: Function| undefined
    imageSource:any
}



const AvatarComponent:FC<IAvatar> =(props) =>{


    const handleViewProfile =()=> {
    if(props.onPress)
    {
        console.log('pressed Image')
        props.onPress()
    }
}

    return(
                <Pressable style={[styles.container]} onPress={() => handleViewProfile()}>
                <Image source={{uri: props.imageSource}} style={{ width: 100, height: 100, borderRadius:10 }} />
                </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius:10, 
        width: 100,
        height: 100, 
        margin: 5
    }
})

export default AvatarComponent