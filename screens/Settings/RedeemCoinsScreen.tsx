// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../../types/INavigateSettings'

type Props = NativeStackScreenProps <RootStackParamList, 'RedeemCoins'>

const RedeemCoinsScreen: FC<Props> = ({navigation, route})=> {
  
  
  return (
 
    <View style={styles.container}>
        
        <Text>Redeem Coins</Text>
        
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
});

export default RedeemCoinsScreen