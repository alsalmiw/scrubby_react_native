import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, StatusBar, View, Alert} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import TwoFullButtonComponent from "../../components/TwoFullButtonComponent";
import UnderlinedHeaderComponent from "../../components/UnderlinedHeaderComponent";
import UnderlinedOneHeaderComponent from "../../components/UnderlinedOneHeaderComponent";
import { ThemeContext } from "../../context/ThemeContext";
import RootStackParamList from "../../types/INavigateSettings";
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from "../../context/UserContext";


type Props = NativeStackScreenProps<RootStackParamList, 'AcceptRequest'>

const AcceptRequestScreen: FC<Props> = ({ navigation, route }) => {
    const { purpleColor } = useContext(ThemeContext)
    const {allInvites, setAllInvites} =useContext(UserContext)
    const [Name, setName] = useState("")
    const handleAcceptBtn =() =>{
        Alert.alert("Congratulation", '... can now invite you to share a space with you', [{ text: "Cancel", style: "cancel",  onPress: () =>navigation.navigate("ManageInvites") }  ])
    }
    const handleGetLocalName = async() =>{
        let displayName:any = await AsyncStorage.getItem('Invitee')
        if (displayName.length != 0)
        {
            setName(displayName)
        }
    }
    // const removeInvitee = () =>{
    //     if(Name == allInvites.username)
    //     {

    //     }
    // }
    useEffect(() =>{
        handleGetLocalName()
        console.log(allInvites)

    },[])

    return (
        <>
        <View style={styles.container}>
            <View>
                <HeaderComponent title={"ADD TO MY SPACE"}></HeaderComponent>
            </View>
            <View>
            <Text>{Name}</Text>
            </View>
            <View style={styles.underlineContainer}>
                <UnderlinedOneHeaderComponent titleFirst="Action" />
            </View>
            <View style={styles.underlineContainer}>
            <Text style={{fontSize:20, paddingTop:10}}>This user has invited you to share responsibilities.</Text>
            </View>

        </View>
        <TwoFullButtonComponent text1="Back" text2="Accept" color={purpleColor} onBackPress={()=> navigation.navigate("ManageInvites")} onAcceptPress={()=> {handleAcceptBtn() }}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    underlineContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 10,
      },
});

export default AcceptRequestScreen