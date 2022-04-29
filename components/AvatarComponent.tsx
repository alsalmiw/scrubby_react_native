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
                <Image source={require('../image/avatars/av1.png')} style={{ width: 150, height: 150, borderRadius:10 }} />
                </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius:10, 
        width: 150,
        height: 150, 
        paddingLeft: 10,
    }
})

export default AvatarComponent