import { FC, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import IButtonStandard from '../Interfaces/IButtonStandard'

const FullButtonComponent: FC<IButtonStandard> = (props) => {

    const buttonHandler = () => {
        props.onPress()
    }

    return (
        <View style={[styles.buttonOuterContainer, {backgroundColor:props.color}, {borderRadius:props.radius}]}>
            <Pressable
                style={styles.buttonInnerContainer}
                onPress={buttonHandler}
            >
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    )
};

export default FullButtonComponent;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        overflow: 'hidden',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    buttonInnerContainer: {
        paddingVertical: '5%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    }
});