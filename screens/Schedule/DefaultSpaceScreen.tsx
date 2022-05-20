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
import { AntDesign } from '@expo/vector-icons';


type Props = NativeStackScreenProps<RootStackParamList, 'DefaultOptions'>

const DefaultSpaceScreen: FC<Props> = ({navigation})=> {

    const { savedUsername, setSavedUsername, setMySpaces, userData, setUserData, childData, setChildrenData , setScoreBoardList, setInviters, setInvited, setAcceptedInvitations, setSpinnerOn, defaultSpace, setDefaultSpace, mySchedule } = useContext(UserContext)
    const {secondaryTextColor, purpleColor} = useContext(ThemeContext)



    return(
        <View style={styles.container}>
            <ScrollView>
            <HeaderComponent title="Set Default Schedule"/>
            <UnderlinedTwoHeaderComponent titleFirst={"My Spaces"} titleTwo={"Set Default"}/>

            <View>
            {
                mySchedule.map((space:any, idx:number) =>
                    <TaskSpaceRowComponent key={idx} idx={idx} onPress={()=>console.log(space.collectionName)}>
                        <View style={[styles.flexrow]}>
                        <Text style={[styles.spacesFont]}>{space.collectionName}</Text>
                        <AntDesign name="checksquare" size={30} color="white" />
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
          color:"#FFF"
      }
})

export default DefaultSpaceScreen