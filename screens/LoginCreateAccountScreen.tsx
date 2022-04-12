import { FC } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"


import InputFieldComponentLogin from "../components/AddEdit/InputFieldComponentLogin"

const LoginAndCreateAccountScreen: FC = () => {

    return (

        <View style={styles.backgroundColor}>
            <View style={{ flex: 0.8, alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.title}>Sign up</Text>

                <View style={styles.inputPosition}>
                    <InputFieldComponentLogin />
                </View>

                <View>
                    <Text style={styles.loginTxt}>Already have an account. <Text onPress={() => console.log('go to login page')} style={{ color: 'blue' }}>Login here.</Text></Text>
                </View>
            </View>
            <View style={{ flex: 0.2, alignItems:'center'}}>
                <Button style={styles.loginBtn} mode="contained" onPress={() => console.log('Pressed')}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Create Account
                    </Text>
                </Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    backgroundColor: {
        flex: 1,
        backgroundColor: '#1699B1',
        minWidth: "100%",
        minHeight: '100%',
    },
    title: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center'
    },
    loginTxt: {
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    loginBtn: {
        backgroundColor: "#F8AA07",
        borderRadius:50,
        maxWidth:'85%'
    },
    inputPosition: {
        alignItems: 'center'
    },

})

export default LoginAndCreateAccountScreen;