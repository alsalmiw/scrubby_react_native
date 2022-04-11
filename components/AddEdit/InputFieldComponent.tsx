import {FC} from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'

import loginIcon from '.../image/Iconfether.png'

const InputFieldComponent: FC =() =>{
    return(
        <View style={styles.searchSection}>
            <Image source={loginIcon} style={styles.iconPad} />
            <TextInput style={styles.inputBox} onChangeText={(e) => console.log(e)} placeholder='username' />
        </View>
    );
}

const styles = StyleSheet.create({
    inputBox:{
        borderRadius:15,
        borderColor:'black',
        borderWidth:1,
        width:300,
        height:50,
        textAlign:'center',
        fontSize:25,
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0
    },
    iconPad:{
        padding: 10
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },


})

export default InputFieldComponent