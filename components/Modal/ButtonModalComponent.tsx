import { FC } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';


const ButtonModalComponent: FC<{onPress: () => void}> = (props) => {

    const pressHandler = () => {
        props.onPress();
    }
    
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={styles.buttonInnerContainer}
                onPress={pressHandler}
            >
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    )
};

export default ButtonModalComponent;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        borderRadius: 24
    },

    buttonInnerContainer: {
        backgroundColor: '#1699B1',
        paddingVertical: '4%',
        paddingHorizontal: '20%',
        borderRadius: 10
    },

    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 25
    }
})