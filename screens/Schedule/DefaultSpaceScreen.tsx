import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserData } from '../../services/dataService';
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


type Props = NativeStackScreenProps<RootStackParamList, 'DefaultOptions'>

const DefaultSpaceScreen: FC<Props> = ({navigation})=> {

    const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn, defaultSpace, setDefaultSpace, mySchedule, setRunAgain } = useContext(UserContext)
    const {secondaryTextColor, purpleColor} = useContext(ThemeContext)


    const handleSetDefaultSchedule =async(space:any)=> {
        setDefaultSpace(space)
        setRunAgain(true)
       // let changeDefault = await 
    }
    return(
        <View style={styles.container}>
            <ScrollView>
            <HeaderComponent title="Set Default Schedule"/>
            <UnderlinedTwoHeaderComponent titleFirst={"My Spaces"} titleTwo={"Set Default"}/>

            <View>
            {
                mySchedule.map((space:any, idx:number) =>
                    <TaskSpaceRowComponent key={idx} idx={idx} onPress={()=>handleSetDefaultSchedule(space)}>
                        <View style={[styles.flexrow]}>
                        <Text style={[styles.spacesFont]}>{space.collectionName}</Text>
                        {
                            space.rooms.length > 0?
                            defaultSpace.id==space.id?
                            <Ionicons name="radio-button-on" size={24} color="#FFF" />
                             :
                             <Ionicons name="radio-button-off" size={24} color="#FFF" />
                             :
                             <Text style={{color: '#FFF', fontSize:15}}>Not Available</Text>
                             
                        }
                       
                        </View>
                    </TaskSpaceRowComponent>
                )
            }

            </View>
            </ScrollView>

        <View>
            <FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={purpleColor}>

                    <Text>Back</Text>
                </FullButtonComponent>

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

export default DefaultSpaceScreen