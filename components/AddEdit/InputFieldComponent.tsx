import {FC} from 'react'
import { StyleSheet, TextInput, View } from 'react-native'



const InputFieldComponent: FC =() =>{
    return(
        <View>
            <TextInput style={styles.inputBox} onChangeText={(e) => console.log(e)} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputBox:{
        borderRadius:10,
        color:'black'
    }
})

export default InputFieldComponent