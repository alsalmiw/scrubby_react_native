import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddDefaultUserSpace, GetUserData } from '../../services/dataService';
import UserContext from '../../context/UserContext';
import ReactNativeCalendar from '../../components/ReactNativeCalendar';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { ThemeContext } from '../../context/ThemeContext';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UnderlinedTwoHeaderComponent from '../../components/UnderlinedTwoHeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import RootStackParamList from '../../types/INavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FullButtonComponent from '../../components/FullButtonComponent';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { Ionicons} from '@expo/vector-icons';
import IDefaultSpace from '../../Interfaces/IDefaultSpace';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';


type Props = NativeStackScreenProps<RootStackParamList, 'DefaultChildOptions'>

const DefaultSpaceChildScreen: FC<Props> = ({navigation})=> {

    const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn, defaultSpace, setDefaultSpace, mySchedule, setRunAgain } = useContext(UserContext)
    const {secondaryTextColor, purpleColor} = useContext(ThemeContext)
    const [newSelection, setNewSelection] = useState<any>([])

    useEffect(() => {
        setNewSelection(defaultSpace)
    },[])

    const handleSetDefaultSchedule =async(space:any)=> {
        setNewSelection(space)
        console.log(userData.username, space.id, space.collectionName)
      
    }

    const handleConfirm = async () => {
        let newDefault:IDefaultSpace = {
            Id:0,
            UserId:userData.id,
            CollectionId:newSelection.id,
            IsDefault:true, 
            IsDelete:false
        }

        console.log(newDefault);

        let changeDefault = await AddDefaultUserSpace (newDefault)
        if(changeDefault)
        {
            console.log(changeDefault)
            setRunAgain(true)
            setDefaultSpace(newSelection)
            alert("You have successfully set the default schedule to " + newSelection.collectionName)
            navigation.goBack()
        }
        
    }

    const handleBackPress =()=> {
        navigation.goBack()
    }
    return(
        <View style={styles.container}>
            <ScrollView>
            <HeaderComponent title="Set Default Schedule"/>
            <UnderlinedTwoHeaderComponent titleFirst={"My Spaces"} titleTwo={"Set Default"}/>

            <View>
            {
                mySchedule.map((space:any, idx:number) =>
                        space.rooms.length > 0?
                    <TaskSpaceRowComponent key={idx} idx={idx} onPress={()=>handleSetDefaultSchedule(space)}>
                        <View style={[styles.flexrow]}>
                        <Text style={[styles.spacesFont]}>{space.collectionName}</Text>
                        {
                          
                          newSelection.id==space.id?
                            <Ionicons name="radio-button-on" size={24} color="#FFF" />
                             :
                             <Ionicons name="radio-button-off" size={24} color="#FFF" />
                             
                          
                             
                        }
                       
                        </View>
                    </TaskSpaceRowComponent>
                    :
                    <TaskSpaceRowComponent key={idx} idx={idx} onPress={undefined}>
                         <View style={[styles.flexrow]}>
                        <Text style={[styles.spacesFont]}>{space.collectionName}</Text>
                        <Text style={{color: '#FFF', fontSize:15}}>Not Available</Text>
                        </View>
                        </TaskSpaceRowComponent>


                )
            }

            </View>
            </ScrollView>

        <View>
            <TwoFullButtonComponent text1={"Back"} text2={"Confirm"} onAcceptPress={()=>handleConfirm()} color={purpleColor} onBackPress={()=>handleBackPress()} />

        </View>
     

        </View>
   
    )

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop:20,
    justifyContent: "space-between"
    },
    flexrow: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      spacesFont:{
          color:"#FFF",
          fontSize: 18,
          fontWeight: "bold"

      }
})

export default DefaultSpaceChildScreen