// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../types/INavigateSettings'
import HeaderComponent from '../components/HeaderComponent';
import FullButtonComponent from '../components/FullButtonComponent';
import { ThemeContext } from '../context/ThemeContext';

type Props = NativeStackScreenProps <RootStackParamList, 'ScoreBoard'>

const ScoreBoardScreen: FC<Props> = ({navigation, route})=> {
  const { purpleColor} = useContext(ThemeContext)
  
  const handleGoBack = ()=>{
    navigation.navigate("Settings")
  }

  
  return (
 <>
    <View style={styles.container}>
        
        <HeaderComponent title='SCORE BOARD'/>
        <View>
          <Text> Participants</Text>
        </View>
        
    </View>
    <FullButtonComponent radius={0} color={purpleColor} onPress={()=>handleGoBack()} >Back</FullButtonComponent>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

export default ScoreBoardScreen