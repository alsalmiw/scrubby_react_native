// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {  StyleSheet, Text, View, StatusBar,  TouchableWithoutFeedback, Keyboard } from 'react-native';

import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemCoins'>

const RedeemCoinsScreen: FC<Props> = ({ navigation, route }) => {

  const { orangeColor, purpleColor } = useContext(ThemeContext)

  const { userData } = useContext(UserContext)
  const [redeemCoins, setRedeemCoins] = useState("")

  const handleGoBack = () => {
    navigation.navigate("Settings")
  }

  useEffect(() => {
    console.log(userData)
    console.log('ji')

  }, [])

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={{flex:1}}>
          <View style={{marginBottom:15}}>
        <HeaderComponent title='REDEEM COINS' />
        </View>

        <View style={styles.underlineContainer}>
          <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
        </View>


        <View style={styles.underlineContainer}>
          <UnderlinedOneHeaderComponent titleFirst={'Redeem'} />
        </View>

        <View style={{ flex: 0.1, marginTop:10, paddingLeft:10, paddingRight:10 }}>
          <Text> {userData.username} has a total of {userData.coins} coins. Enter the value of coins you would like to redeem:</Text>
        </View>

        <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center' }}>

            <InputFieldComponent maxLength={80} value={''} holder="Redeem Coins" hide={false} onChangeText={(e: string) => setRedeemCoins(e)} />

        </View>

        <View style={{ flex: 0.1 }}>
          <FullButtonComponent color={orangeColor} onPress={() => console.log('redeem')}><Text> Redeem </Text></FullButtonComponent>
        </View>

        </View>
      </TouchableWithoutFeedback>
      <FullButtonComponent color={purpleColor} onPress={() => handleGoBack()}><Text> Back </Text></FullButtonComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

    paddingTop: StatusBar.currentHeight,

  },
  underlineContainer: {

    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
});

export default RedeemCoinsScreen