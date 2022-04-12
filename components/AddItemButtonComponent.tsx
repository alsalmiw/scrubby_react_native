import { FC } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';


const AddItemButtonComponent:FC<{onPress: () => void}> = (props) => {

    const addButtonHandler = () => {
        props.onPress()
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={styles.buttonInnerContainer}
                onPress={addButtonHandler}
            >
                <View>{props.children}</View>
            </Pressable>
        </View>
    )
};

export default AddItemButtonComponent;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 24
    },

    buttonInnerContainer: {
        // paddingVertical: '9%',
        // paddingHorizontal: '12%',
        borderRadius: 10
    },

    


})