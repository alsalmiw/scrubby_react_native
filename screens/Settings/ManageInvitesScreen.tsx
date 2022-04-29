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
import { GetAllInvitesByID, GetAllRequest} from '../../services/dataService';
import UserContext from '../../context/UserContext';
///




type Props = NativeStackScreenProps<RootStackParamList, 'ManageInvites'>

const ManageInvitesScreen: FC<Props> = ({ navigation, route }) => {
  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor, purpleColor } = useContext(ThemeContext);
  const { userData } = useContext(UserContext)
  const [allInvites, setAllInvites] = useState<any>([])
  const [allRequestName, setAllRequestName] = useState<any>([])

  const windowWidth = Dimensions.get('window').width * 0.25;



  const handleBackToSettings = () => {
    navigation.navigate('Settings')
  }
  const handleToInviteUser = () => {
    navigation.navigate('InviteUser')
  }

  const fetchGetAllInvitesById = async () => {
    let data: any = await GetAllInvitesByID(userData.id)
    if (data.length != 0) {
      setAllInvites(data);
    }
  }

  const fetchGetAllRequest = async ()=>{
    let data:any = await GetAllRequest(userData.username)
    if (data.length != 0) {
      setAllRequestName(data);
    }
  }

  useEffect(() => {
    fetchGetAllInvitesById()
    fetchGetAllRequest()
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
            allInvites.map((person: any, idx:number) => {

              return (
                <Pressable key={idx}  style={{padding:10, backgroundColor:'red'}} onPress={()=>{console.log(person.invitedUsername)}}>
                <Text>{person.invitedUsername}</Text>
                </Pressable>

              )
            })

          }
        </View>

        <View style={{ alignItems: 'center' }}>
          <UnderlinedOneHeaderComponent titleFirst='Request' />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
          {
            allRequestName.map((request:any, idx:number) =>{
              return(
                
                <Pressable key={idx} style={{padding:10}} onPress={()=>{console.log(request.username), navigation.navigate("AcceptRequest")}}>
                <Text>{request.username}</Text>
                </Pressable>
              )
            })
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