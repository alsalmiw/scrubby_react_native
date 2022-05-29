import { FC, useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

import { Button } from "react-native-paper"
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import InputFieldComponentLogin from "../components/AddEdit/InputFieldComponentLogin"
import UserContext from "../context/UserContext"
import INewUser from "../Interfaces/INewUser"
import IUserLogin from "../Interfaces/IUserLogin"
import { CreateAccount, GetUserData, GetUserDefaultSchedule, UserLogin, GetUserByUsername, GetDependantsDTOByUserId, GetAcceptedInvitationsbyInviterId, GetDependantByUserId, GetInvitationByUsername, GetDependantsDTOByUsername, GetScoreBoardByUsername, GetCollectionByUsername, GetMyTaskedCollectionsByUsername, GetSpaceCollectionByUsername } from "../services/dataService"
import InputFieldComponent from "../components/AddEdit/InputFieldComponent"
import ChildFreeBoolComponent from "../components/Settings/ChildFreeBoolComponent"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatars from '../types/IAvatars'
import FullButtonComponent from "../components/FullButtonComponent"
import { ThemeContext } from "../context/ThemeContext"
import RootStackParamList from '../types/INavigation'
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import SplashComponent from "../components/SplashComponent"


// type RootStackParamList = {
//     login: undefined,
//     Nav: undefined,
// }
//

type Props = NativeStackScreenProps<RootStackParamList, 'login'>

const LoginAndCreateAccountScreen: FC<Props> = ({ navigation, route }) => {

    const { setModalVisible, username, setUsername, password, setPassword, savedUsername, setSavedUsername, savedPassword, setSavedPassword, fullUserInfo, setFullUserInfo, setDefaultSpace, fullName, setFullName, login, setLogin, setUserData, blank, setBlank, setChildrenData, setMySpaces, setScoreBoardList, setInvited, setInviters, setAcceptedInvitations, setMySchedule, setTasksHistory, setIsChildFree, childrenInfo, setChildrenInfo, myHouses, setMyHouses  } = useContext(UserContext)
    const { yellowColor, greenColor } = useContext(ThemeContext)
    const [name, setName] = useState<any>("")



    let avR = Math.floor(Math.random() * 46)

    useEffect(() => {

    }, [])




    const addUser = async () => {
        //send full name to the backend

        // need to trim full name of leading and trailing spaces
        let name = fullName.trim().split(" ").filter((word: string) => word != "").join(" ");
        let userData: INewUser = {
            Id: 0,
            Username: username,
            Password: password,
            Photo: avatars[avR],
            Fullname: name,
        }
        setSavedUsername(username);
        setSavedPassword(password);

        let result = await CreateAccount(userData);
        if (result) {

            userLogin()

        }

        else  {setBlank(false), Alert.alert("Error", 'Account not created.', [{ text: "Cancel", style: "cancel" }]) }

    }

    const userLogin = async () => {
        let userLoginData: IUserLogin = {
            Username: username,
            Password: password
        }
        //console.log(userLoginData)
        setSavedUsername(username);
        setSavedPassword(password);

        let result = await UserLogin(userLoginData);
        if (result.token != null) {

            AsyncStorage.setItem("Token", result.token);
            AsyncStorage.setItem("Username", username);
          
            let defaultCollection = await GetUserDefaultSchedule(username)
            let userInfo = await GetUserByUsername(username)
            let invitesInfo = await GetInvitationByUsername(username)
            let dependents = await GetDependantsDTOByUsername(username)
            let scores = await GetScoreBoardByUsername(username)
          
           
            let collections = await GetSpaceCollectionByUsername(username)

            

            if (defaultCollection.length != 0) {
                
                setDefaultSpace(defaultCollection)
                navigation.navigate('Nav', { screen: "Schedule" })
            } else {
                
                navigation.navigate('Nav', { screen: "Profile" })

            }
             let schedule = await GetMyTaskedCollectionsByUsername (username)
            if(dependents.length>0){
                setChildrenData(dependents)
            }
          
            if (userInfo) {
                setUserData(userInfo)
                setIsChildFree(userInfo.isChildFree)
            }
            if(invitesInfo.length!=0){
                setInvited(invitesInfo.sentInvites.filter((Invited: any) => (Invited.isAccepted == false && Invited.isDeleted == false)))
                setInviters(invitesInfo.recievedInvites.filter((Inviter: any) => (Inviter.isAccepted == false && Inviter.isDeleted == false)))
                setAcceptedInvitations(invitesInfo.sentInvites.filter((Invited: any) => (Invited.isAccepted == true && Invited.isDeleted == false)))
            //  console.log(invitesInfo.sentInvites)
            }
            if(scores.length > 0){
                setScoreBoardList(scores)
            }
              if(schedule.length > 0){
                setMySchedule(schedule)
            }
            if(collections.length > 0){
                setMyHouses(collections)
            }
            let spaces = await GetCollectionByUsername(username)
            if(spaces.length > 0){
                setMySpaces(spaces)
            }
          
        



        }
        else {
            Alert.alert("Error", 'Incorrect Username or Password.', [{ text: "Cancel", style: "cancel" }])
            setBlank(false)
            //console.log('fail')
        }
    }
    const checkTextInput = () => {
        let regi = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
        let space = /[ ]/
        let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/



        if (login) {
            if (!username.trim()) {
                Alert.alert("Error", 'Please Enter username.', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            if (!password.trim()) {
                Alert.alert("Error", 'Please Enter password.', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            if(!fullName.trim()){
                Alert.alert("Error", 'Please Enter Full Name.', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            if (regi.test(username)) {
                Alert.alert("Error", 'Username can not contains special characters or space(s).', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            if (space.test(password)) {
                Alert.alert("Error", 'Password can not contains any space(s).', [{ text: "Cancel", style: "cancel" }]);
                return;
            }

            if (specialChar.test(fullName)) {
                Alert.alert("Error", 'Full name can not contains special characters.', [{ text: "Cancel", style: "cancel" }]);
                return;
            }
            else {
                setBlank(true)
                addUser();
                setFullName("");
                setPassword("");
                setUsername("");
            }
        }
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
                setBlank(true)
                userLogin();
                setPassword("");
                setUsername("");
            }
        }
    };

    // const GetUserInfoByUsername = async () => {

    //     let username: any = await AsyncStorage.getItem("Username");
    //     if (username) {
    //       setSavedUsername(username)
    //       let userInfo = await GetUserData(username)
    //       let dependent= await GetDependantsDTOByUserId(userInfo.userInfo.Id)
    //       if(dependent.length!= 0){
    //         setChildrenData(dependent)
    //       }
    //       let invites = await GetAcceptedInvitationsbyInviterId(userInfo.userInfo.Id)
    //       if(invites.length!= 0){
    //         setAcceptedInvitations(invites)
    //       }
    //       if (userInfo.length != 0) {
    //         //setChildrenData(userInfo.children)
    //         //setMySpaces(userInfo.spaces)
    //         //setUserData(userInfo.userInfo)
    //         // setScoreBoardList(userInfo.scoreBoard)
    //         // setInvited(userInfo.invitations.sentInvites.filter((Invited: any) => (Invited.isAccepted == false && Invited.isDeleted == false)))
    //         // setInviters(userInfo.invitations.recievedInvites.filter((Inviter: any) => (Inviter.isAccepted == false && Inviter.isDeleted == false)))
    //         // setAcceptedInvitations(userInfo.invitations.sentInvites.filter((Invited: any) => (Invited.isAccepted == true && Invited.isDeleted == false)))
    //        // setMySchedule(userInfo.mySchedule)
    //         setTasksHistory(userInfo.tasksHistory)
    //         // setIsChildFree(userInfo.userInfo.isChildFree)
    //       }
    
    //     }
    
    //   }
    
        

    return (
        <>
            <SplashComponent>
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
                                <View style={styles.btnStyle}>
                                    <FullButtonComponent radius={15} color={yellowColor} onPress={() => checkTextInput()} > <Text>Create Account</Text></FullButtonComponent>

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
                                <View style={styles.btnStyle}>
                                    <FullButtonComponent radius={15} color={yellowColor} onPress={() => checkTextInput()} > <Text>Login</Text></FullButtonComponent>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                }

            </SplashComponent>
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
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center'
    },
    loginTxt: {
        color: '#FFF',
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
        marginTop: 25,
        marginBottom: 10,
        paddingBottom: 0
    },
    loginContent: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 0
    },
    btnStyle: {
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 100,
        marginTop: 0,

    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: "#FFF",
        height: 60,
        width: 300,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    ImageStyle: {
        paddingLeft: 10

    },
    inputUsername: {
        flex: 1,
        height: 60,
        width: 50,
        paddingEnd: 10,
        backgroundColor: '#FFF',
        textDecorationLine: "underline",
        overflow: 'hidden',
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    spinBackgroundColor: {

        backgroundColor: '#1699B1',
        minWidth: "100%",
        minHeight: '100%',
    }


})

export default LoginAndCreateAccountScreen;