import { FC, useContext, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"





import InputFieldComponentLogin from "../components/AddEdit/InputFieldComponentLogin"

import { CreateAccount, UserLogin } from "../services/dataService"

const LoginAndCreateAccountScreen: FC = () => {
    const [login, setLogin] = useState(true);


    return (

        <>
            {
                login
                    ?
                    <View style={styles.backgroundColor}>
                        <View style={styles.loginContent}>
                            <Text style={styles.title}>Sign up</Text>

                            <View style={styles.inputPosition}>
                                <InputFieldComponentLogin />
                            </View>

                            <View>
                                <Text style={styles.loginTxt}>Already have an account. <Text onPress={() => setLogin(!login)} style={{ color: 'blue' }}>Login here.</Text></Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'center' }}>
                            <Pressable style={styles.loginBtn} onPress={() => console.log('clicked')}>

                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', padding: 10 }}>
                                    Create Account
                                </Text>

                            </Pressable>

                        </View>
                    </View>
                    :
                    <View style={styles.backgroundColor}>
                        <View style={styles.loginContent}>
                            <Text style={styles.title}>Login</Text>

                            <View style={styles.inputPosition}>
                                <InputFieldComponentLogin />
                            </View>

                            <View>
                                <Text style={styles.loginTxt}>New here? <Text onPress={() => setLogin(!login)} style={{ color: 'blue' }}>Create an Account</Text></Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'center' }}>
                            <Pressable style={styles.loginBtn} onPress={() => console.log('clicked')}>

                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', padding: 10 }}>
                                    Login
                                </Text>

                            </Pressable>
                        </View>
                    </View>
            }
        </>

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
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: "#F8AA07",
        borderRadius: 20,
        width: "80%",


    },
    inputPosition: {
        alignItems: 'center'
    },
    loginContent: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center"
    }

})

export default LoginAndCreateAccountScreen;