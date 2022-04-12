import { FC } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"


import InputFieldComponentLogin from "../components/AddEdit/InputFieldComponentLogin"

const LoginAndCreateAccountScreen: FC = () => {

    return (
        <View style={styles.backgroundColor}>
            <ScrollView >
                <View>
                    <Text style={styles.title}>Sign up</Text>
                </View>

                <View style={styles.inputPosition}>
                <InputFieldComponentLogin />
                </View>
                


                <View>
                    <Text style={styles.loginTxt}>Already have an account. <Text onPress={() => console.log('go to login page')} style={{ color: 'blue' }}>Login here.</Text></Text>
                </View>

            </ScrollView>
            <View>
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
        backgroundColor: "#1699B1",
        flex: 1,
        minWidth: "100%",
        minHeight:'100%'
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
        minWidth: '100%',
        position: 'absolute',
        height: 70,
        left: 0,
        right: 0,
        bottom: 0
    },
    inputPosition:{
        flex:1,
        alignItems:'center'
    }
})

export default LoginAndCreateAccountScreen;