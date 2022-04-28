// import { StatusBar } from 'expo-status-bar';
import { Component, FC, useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer'
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import AddPhotoComponent from '../../components/AddPhotoComponent';
import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import { Entypo } from '@expo/vector-icons';
//



type Props = NativeStackScreenProps<RootStackParamList, 'ManageInvites'>

const ManageInvitesScreen: FC<Props> = ({ navigation, route }) => {
  const { fuchsiaColor, lilacColor, lightLilacColor, blueColor } = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width * 0.25;

  const handleBackToSettings = () =>{
    navigation.navigate('Settings')
  }
  const handleToInviteUser = () =>{
    navigation.navigate('InviteUser')
  }

  return (
    <>
      <View style={styles.container}>
        <View >
          <HeaderComponent title='MANAGE INVIATIONS' />
        </View>

        <View style={{alignItems:'center'}}>
        <UnderlinedOneHeaderComponent titleFirst={'Invited'} />
        </View>
        
        <View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'flex-start', }}>
          <AddItemButtonComponent onPress={() => {handleToInviteUser()}} >
            <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
          </AddItemButtonComponent>
        </View>
        <View style={{alignItems:'center'}}>
        <UnderlinedOneHeaderComponent titleFirst='Request' />
        </View>
        


      </View>
      <FullButtonComponent onPress={() => handleBackToSettings()} color={blueColor}>
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
     position:'absolute'
    

  },
});

export default ManageInvitesScreen