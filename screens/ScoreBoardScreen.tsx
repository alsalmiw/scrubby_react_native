// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../types/INavigateSettings'
import HeaderComponent from '../components/HeaderComponent';

type Props = NativeStackScreenProps <RootStackParamList, 'ScoreBoard'>

const ScoreBoardScreen: FC<Props> = ({navigation, route})=> {
  
  
  return (
 
    <View style={styles.container}>
        
        <HeaderComponent title='SCORE BOARD'/>
        <View>
          <Text> Participants</Text>
        </View>
        
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

export default ScoreBoardScreen