import { FC, useContext, useState } from "react"
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import {Keyboard, TouchableWithoutFeedback} from 'react-native'
import InputFieldComponentLogin from "../components/AddEdit/InputFieldComponentLogin"
import UserContext from "../context/UserContext"
import INewUser from "../Interfaces/INewUser"
import IUserLogin from "../Interfaces/IUserLogin"
import { CreateAccount, UserLogin } from "../services/dataService"
import InputFieldComponent from "../components/AddEdit/InputFieldComponent"
import ChildFreeBoolComponent from "../components/Settings/ChildFreeBoolComponent"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import PhotoComponent from "../components/PhotoComponent"
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatars from '../types/IAvatars'

type RootStackParamList ={
    login:undefined,
    Nav: undefined,
  }

  type Props = NativeStackScreenProps<RootStackParamList, 'login'>

const LoginAndCreateAccountScreen: FC<Props> = ({navigation, route}) => {

    const [login, setLogin] = useState(true);
    const { username, setUsername, password, setPassword, savedUsername, setSavedUsername, savedPassword, setSavedPassword } = useContext(UserContext)
    let avR = Math.floor(Math.random() * 9)

    const addUser = async () => {
        let userData: INewUser = {
            Id: 0,
            Username: username,
            Password: password, 
           

        }
        console.log(userData)
        setSavedUsername(username);
        setSavedPassword(password);

        let result = await CreateAccount(userData);
        if (result) {
            AsyncStorage.setItem("Token", result.token);
            AsyncStorage.setItem("Username", username);
            navigation.navigate('Nav')
            console.log(result)
            
        }

        else Alert.alert("Error", 'Invalid Username or Password', [{ text: "Cancel", style: "cancel" }])

    }

    const userLogin = async () => {
        let userLoginData: IUserLogin = {
            Username: username,
            Password: password
        }
        console.log(userLoginData)
        setSavedUsername(username);
        setSavedPassword(password);

        let result = await UserLogin(userLoginData);
        if (result.token != null) {
            AsyncStorage.setItem("Token", result.token);
            AsyncStorage.setItem("Username", username);
            console.log(result)
            navigation.navigate('Nav')
        }
        else{
            Alert.alert("Error", 'Incorrect Username or Password', [{ text: "Cancel", style: "cancel" }])
            console.log('fail')
        }

        
    }
    // check if username/ password is filled out
    const checkTextInput = () => {
        if (login) {
            if (!username.trim()) {
                Alert.alert("Error", 'Please Enter username', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            if (!password.trim()) {
                Alert.alert("Error", 'Please Enter password', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            else {
                addUser();
                //console.log(savedUsername);
                setPassword("");
                setUsername("");
            }
        }
        //need to display error if password is wrong 
        else if (!login) {
            if (!username.trim()) {
                Alert.alert("Error", 'Please Enter username login', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            if (!password.trim()) {
                Alert.alert("Error", 'Please Enter password login', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            else {
                userLogin();
                //console.log(savedUsername);
                setPassword("");
                setUsername("");
            }
        }

    };

    // send to edit profile page when creating account
    //send to home page when login 



    return (

        <>
            {
                login
                    ?
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.backgroundColor}>
                            <View style={styles.loginContent}>
                                <Text style={styles.title}>Sign up</Text>

                                <View style={styles.inputPosition}>
                                    <InputFieldComponentLogin />
                                </View>

                                <View>
                                    <Text style={styles.loginTxt}>Already have an account. <Text onPress={() => { setLogin(!login), setPassword(""), setUsername("") }} style={{ color: 'blue' }}>Login here.</Text></Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Pressable style={styles.loginBtn} onPress={() => {
                                    checkTextInput();


                                }}>


                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', padding: 10 }}>
                                        Create Account
                                    </Text>

                                </Pressable>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.backgroundColor}>
                            <View style={styles.loginContent}>
                                <Text style={styles.title}>Login</Text>

                                <View style={styles.inputPosition}>
                                    <InputFieldComponentLogin />
                                </View>

                                <View>
                                    <Text style={styles.loginTxt}>New here? <Text onPress={() => { setLogin(!login), setPassword(""), setUsername("") }} style={{ color: 'blue' }}>Create an Account</Text></Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Pressable style={styles.loginBtn} onPress={() => checkTextInput()}>

                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', padding: 10 }}>
                                        Login
                                    </Text>

                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
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
        fontStyle: 'italic',
        marginTop: 20
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
        alignItems: 'center',
        marginTop: 25
    },
    loginContent: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },


})

export default LoginAndCreateAccountScreen;