import { StyleSheet, View } from "react-native";


export default function Line() {
    return (
        <View style={styles.lineParent}>
            <View style={styles.lineChild}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    lineParent: {
        flexDirection: 'row'
        , justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    lineChild: {
        height: 1,
        alignSelf: 'stretch',
        backgroundColor: 'black',
        width: '95%',
    }
})