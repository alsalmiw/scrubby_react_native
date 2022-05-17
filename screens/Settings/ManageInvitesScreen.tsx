// import { StatusBar } from 'expo-status-bar';
import {  FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {  StyleSheet, Text, View, StatusBar, Dimensions, Pressable } from 'react-native';

import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import { Entypo } from '@expo/vector-icons';
import { AllInvitesByInvitedUsername, GetInvitationByUsername} from '../../services/dataService';
import UserContext from '../../context/UserContext';
///
import AsyncStorage from '@react-native-async-storage/async-storage';
import InviteUserScreen from './InviteUserScreen';



type Props = NativeStackScreenProps<RootStackParamList, 'ManageInvites'>

const ManageInvitesScreen: FC<Props> = ({ navigation, route }) => {
  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
  const { userData, inviters, setInviters, invited, setInvited, refresh, setRefresh, acceptedInvitations, setAcceptedInvitations } = useContext(UserContext)


  const windowWidth = Dimensions.get('window').width * 0.25;



  const handleBackToSettings = () => {
    navigation.navigate('SettingsScreen')
  }
  const handleToInviteUser = () => {
    navigation.navigate('InviteUser')
  }

  const handleToInviteUserPending = async (person: any) => {

    AsyncStorage.setItem('Invited', person.invitedUsername)
    navigation.navigate('InviteUserPending');

  }




  const fetchGetInvitesAndRequest = async ()=>{
    
    let data:any = await GetInvitationByUsername(userData.username)
    //console.log(data)
    if(data != null)
    {
      setInvited(data.sentInvites.filter((Invited:any)=> (Invited.isAccepted == false && Invited.isDeleted == false)))
      setInviters( data.recievedInvites.filter((Inviter:any)=> (Inviter.isAccepted == false  && Inviter.isDeleted == false)));
      setAcceptedInvitations( data.recievedInvites.filter((Inviter:any) => (Inviter.isAccepted == true && Inviter.isDeleted == false)))
    }


  }

  useEffect(() => {
    fetchGetInvitesAndRequest()
    console.log(invited)
    setRefresh(false)

  }, [refresh])

  return (
    <>
      <View style={styles.container}>
        <View >
          <HeaderComponent title='MANAGE INVIATIONS' />
        </View>

        <View style={{ alignItems: 'center' }}>
          <UnderlinedOneHeaderComponent titleFirst={'Invited'} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
          <AddItemButtonComponent onPress={() => { handleToInviteUser() }} >
            <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
          </AddItemButtonComponent>
          {
            invited !=null ?
            invited.map((person: any, idx:number) => {

              return (
                <Pressable key={idx}  style={{padding:10, backgroundColor:'red'}} onPress={handleToInviteUserPending.bind(this, person)}>
                  <Text>{person.invitedUsername}</Text>
                </Pressable>

              )
            })
            :null

          }
        </View>

        <View style={{ alignItems: 'center' }}>
          <UnderlinedOneHeaderComponent titleFirst='Request' />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
          {
            inviters != null?
            inviters.map((request:any, idx:number) =>{
              return(
                <Pressable key={idx} style={{padding:10}} onPress={()=>{ AsyncStorage.setItem("Inviter", request.inviterUsername), AsyncStorage.setItem("InviterFullName", request.inviterFullname), console.log(userData) , navigation.navigate("AcceptRequest")}}>
                <Text>{request.inviterUsername}</Text>
                </Pressable>
              )
            })
            : null
          }
        </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
            
          {
            inviters != null?
            inviters.map((request:any, idx:number) =>{
              return(
                <Pressable key={idx} style={{padding:10}} onPress={()=>{ AsyncStorage.setItem("Inviter", request.inviterUsername), AsyncStorage.setItem("InviterFullName", request.inviterFullname), console.log(userData) , navigation.navigate("AcceptRequest")}}>
                <Text>{request.inviterUsername}</Text>
                </Pressable>
              )
            })
            : null
          }
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: '10%'}}>
          <UnderlinedOneHeaderComponent titleFirst='Accepted Requests'></UnderlinedOneHeaderComponent>
          {
            acceptedInvitations != null?
            acceptedInvitations.map((request:any, idx:number) =>{
              return(
                <Pressable key={idx} style={{padding:10}} onPress={()=>{ AsyncStorage.setItem("Inviter", request.inviterUsername), AsyncStorage.setItem("InviterFullName", request.inviterFullname), console.log(userData) , navigation.navigate("AcceptedInvitation")}}>
                <Text>{request.inviterUsername}</Text>
                </Pressable>
              )
            })
            : null
          }
        </View>




      </View>
      <FullButtonComponent radius={0} onPress={() => handleBackToSettings()} color={purpleColor}>
        <Text>Back</Text>
      </FullButtonComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    position: 'absolute'


  },
});

export default ManageInvitesScreen