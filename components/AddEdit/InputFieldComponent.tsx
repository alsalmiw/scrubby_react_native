import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';




const InputFieldComponent = () => {


  return (
    <View style={styles.SectionStyle}>
    <Image
        source={require('../../image/icon.png')}
        style={styles.ImageStyle}
    />
    <TextInput
        autoComplete='off'
        style={styles.inputUsername}
        placeholder="Username"
        underlineColorAndroid={'transparent'}
    />
    
</View>
    
  );
};

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000',
        height: 60,
        width:300,
        borderRadius: 5,
        margin: 10,
    },
    ImageStyle: {
        padding: 10,
        marginRight:20,
        marginLeft:20,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    inputUsername:{
        flex:1,
        height:25,
        width:200,
        backgroundColor:'white',
        borderWidth:0,
        borderBottomWidth:0
        
    }
})


export default InputFieldComponent;