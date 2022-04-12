import { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const FullButtonComponent: FC<{ onPress: () => void }> = (props) => {

    const buttonHandler = () => {
        props.onPress()
    }

    return (
        <View style={styles.buttonOuterContainer}>
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
        width: '100%'
    },
    buttonInnerContainer: {
        backgroundColor: '#1699B1',
        paddingVertical: '4%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    }
});