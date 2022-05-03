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
import { GetInvitationByUsername} from '../../services/dataService';
import UserContext from '../../context/UserContext';
///
import AsyncStorage from '@react-native-async-storage/async-storage';



type Props = NativeStackScreenProps<RootStackParamList, 'ManageInvites'>

const ManageInvitesScreen: FC<Props> = ({ navigation, route }) => {
  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
  const { userData, allRequestName, setAllRequestName, allInvites, setAllInvites } = useContext(UserContext)


  const windowWidth = Dimensions.get('window').width * 0.25;



  const handleBackToSettings = () => {
    navigation.navigate('Settings')
  }
  const handleToInviteUser = () => {
    navigation.navigate('InviteUser')
  }




  const fetchGetInvitesAndRequest = async ()=>{
    
    let data:any = await GetInvitationByUsername(userData.username)
    console.log(data)
    if(data != null)
    {
      //check if they accepted
      // setAllInvites(data.sentInvites)
      setAllInvites(data.sentInvites.filter((Invited:any)=> (Invited.isAccepted == false && Invited.isDeleted == false)))
      //data.sentInvites.filter((Invited:any)=> (Invited.isAccepted == false && Invited.isDeleted == false) ? setAllInvites(data.sentInvites) : null )
      //check if they accepted
      setAllRequestName( data.recievedInvites.filter((Inviter:any)=> (Inviter.isAccepted == false  && Inviter.isDeleted == false)))
      //data.recievedInvites.filter((Inviter:any)=> (Inviter.isAccepted == false  && Inviter.isDeleted == false) ? setAllRequestName(data.sentInvites) : null )
      //setAllRequestName(data.recievedInvites);
    }


  }

  useEffect(() => {
    fetchGetInvitesAndRequest()
    console.log(allRequestName.length)


  }, [])

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
            allInvites !=null ?
            allInvites.map((person: any, idx:number) => {

              return (
                <Pressable key={idx}  style={{padding:10, backgroundColor:'red'}} onPress={()=>{console.log(person)}}>
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
            allRequestName != null?
            allRequestName.map((request:any, idx:number) =>{
              return(
                <Pressable key={idx} style={{padding:10}} onPress={()=>{ AsyncStorage.setItem("Inviter", request.inviterUsername), AsyncStorage.setItem("InviterFullName", request.inviterFullname), console.log(userData) , navigation.navigate("AcceptRequest")}}>
                <Text>{request.inviterUsername}</Text>
                </Pressable>
              )
            })
            : null
          }
        </View>




      </View>
      <FullButtonComponent onPress={() => handleBackToSettings()} color={purpleColor}>
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