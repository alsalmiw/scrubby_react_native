import { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Comp {
    text1: string,
    text2: string,
    onBackPress: () => void,
    onAcceptPress: () => void,

}

const TwoFullButtonComponent: FC<Comp> = (props) => {

    const backButtonHandler = () => {
        props.onBackPress()
    }

    const acceptButtonHandler = () => {
        props.onAcceptPress()
    }
    return (
        <View style={styles.buttonOuterContainer}>
                <Pressable
                    style={styles.buttonInnerContainer}
                    onPress={backButtonHandler}
                >
                    <Text style={styles.buttonText}>{props.text1}</Text>
                </Pressable>
                <View style={styles.verticalLine}></View>
                <Pressable
                    style={styles.buttonInnerContainer}
                    onPress={acceptButtonHandler}
                >
                    <Text style={styles.buttonText}>{props.text2}</Text>
                </Pressable>
                
            
        </View>
    )
};

export default TwoFullButtonComponent;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#6455B5',
        paddingVertical: '2%',
        flexDirection: 'row',
    },
    buttonInnerContainer: {
        justifyContent: 'center',
        width: '49%'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    verticalLine: {
        height: '100%',
        paddingVertical: '7%',
        width: 2,
        backgroundColor: '#fff',

    }

})