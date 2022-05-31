import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, Dimensions, Pressable } from 'react-native';

import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import { Entypo } from '@expo/vector-icons';
import { AllInvitesByInvitedUsername, GetInvitationByUsername } from '../../services/dataService';
import AvatarComponent from '../../components/AvatarComponent';
import UserContext from '../../context/UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import InviteUserScreen from './InviteUserScreen';



type Props = NativeStackScreenProps<RootStackParamList, 'ManageInvites'>

const ManageInvitesScreen: FC<Props> = ({ navigation, route }) => {
  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
  const { userData, inviters, setInviters, invited, setInvited, refresh, setRefresh, acceptedInvitations, setAcceptedInvitations, sentAcceptedInvitations, setSentAcceptedInvitations } = useContext(UserContext)


  const windowWidth = Dimensions.get('window').width * 0.30;

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

  const handleToAcceptedRequestScreen = async (request: any) => {
    await AsyncStorage.setItem("Inviter", request.inviterUsername);
    await AsyncStorage.setItem("InviterFullName", request.inviterFullname);
    await AsyncStorage.setItem("InviterPhoto", request.inviterPhoto);
    navigation.navigate("AcceptRequest")
  }


  const fetchGetInvitesAndRequest = async () => {

    let username = await AsyncStorage.getItem("Username");

    let data: any = await GetInvitationByUsername(username!);
    let result = await AsyncStorage.getAllKeys();




    if (data != null) {
      setInvited(data.sentInvites.filter((Invited: any) => (Invited.isAccepted == false && Invited.isDeleted == false)))
      setInviters(data.recievedInvites.filter((Inviter: any) => (Inviter.isAccepted == false && Inviter.isDeleted == false)));
      setAcceptedInvitations(data.recievedInvites.filter((Inviter: any) => (Inviter.isAccepted == true && Inviter.isDeleted == false)))
      setSentAcceptedInvitations(data.sentInvites.filter((Invited: any) => (Invited.isAccepted == true && Invited.isDeleted == false)))
    }


  }

  useEffect(() => {
    fetchGetInvitesAndRequest()


    setRefresh(false)

  }, [refresh])

  return (
    <>
      <View style={styles.container}>
        <View>
          <View >
            <HeaderComponent title='MANAGE INVITATIONS' />
          </View>
          <View style={{ padding: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <UnderlinedOneHeaderComponent titleFirst={'My Sent Invitations'} />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
              <AddItemButtonComponent onPress={() => { handleToInviteUser() }} >
                <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
              </AddItemButtonComponent>
              {
                invited != null ?
                  invited.map((person: any, idx: number) => {

                    return (

                      <View key={idx}>
                        <AvatarComponent onPress={handleToInviteUserPending.bind(this, person)} imageSource={person.invitedPhoto} />
                      </View>

                    )
                  })
                  : null

              }
            </View>
            {
              sentAcceptedInvitations.length > 0 ?
                <View style={{ alignItems: 'center' }}>
                  <UnderlinedOneHeaderComponent titleFirst='Accepted Sent Invitation' />
                </View>
                : null
            }
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
              {
                sentAcceptedInvitations != null ?
                  sentAcceptedInvitations.map((invitation: any, idx: number) => {
                    return (
                      <View key={idx}>
                        <AvatarComponent onPress={() => { AsyncStorage.setItem("Invited", invitation.invitedUsername), navigation.navigate("SentAcceptedInvitation") }} imageSource={invitation.invitedPhoto} />
                      </View>

                    )
                  })
                  : null
              }
            </View>
            {
              inviters.length > 0 ?
                <View style={{ alignItems: 'center' }}>
                  <UnderlinedOneHeaderComponent titleFirst='Recieved Requests' />
                </View>
                : null
            }
            <View style={styles.underlineContainer}>
              {
                inviters != null ?
                  inviters.map((request: any, idx: number) => {
                    return (

                      <View key={idx}>
                        <AvatarComponent onPress={handleToAcceptedRequestScreen.bind(this, request)} imageSource={request.inviterPhoto} />
                      </View>
                    )
                  })
                  : null


              }
            </View>

            <View style={[styles.underlineContainer]}>
              {acceptedInvitations.length > 0 ?
                <UnderlinedOneHeaderComponent titleFirst='Accepted Recieved Requests'></UnderlinedOneHeaderComponent>
                : null}
              {
                acceptedInvitations != null ?
                  acceptedInvitations.map((request: any, idx: number) => {
                    return (


                      <View key={idx}>
                        <AvatarComponent onPress={() => { AsyncStorage.setItem("Inviter", request.inviterUsername), AsyncStorage.setItem("InviterFullName", request.inviterFullname), AsyncStorage.setItem("InviterPhoto", request.inviterPhoto), AsyncStorage.setItem("AcceptedInviterRequest", JSON.stringify(request)), navigation.navigate("AcceptedRequest") }}
                          imageSource={request.inviterPhoto}
                        />
                      </View>
                    )
                  })
                  : null
              }
            </View>
          </View>
        </View>

        <FullButtonComponent radius={0} onPress={() => handleBackToSettings()} color={purpleColor}>
          <Text>Back</Text>
        </FullButtonComponent>

      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight,
    
  },
  underlineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
});

export default ManageInvitesScreen