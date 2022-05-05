// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';
import IRedeemCoins from '../../Interfaces/IRedeemCoins';

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemCoins'>
////
const RedeemCoinsScreen: FC<Props> = ({ navigation, route }) => {



  const { orangeColor, purpleColor } = useContext(ThemeContext)

  const { userData } = useContext(UserContext)
  const [redeemCoins, setRedeemCoins] = useState<any>(0)
  const [remainingCoins, setRemainingCoins] = useState<any>(userData.coins)
  const [refreshCoins, setRefreshCoins] = useState(true)

  const handleGoBack = () => {
    navigation.navigate("Settings")
  }

  const quickMath = () => {
    setRemainingCoins((Number(userData.coins) - Number(redeemCoins)))
  }
  const handleRedeem = () => {
    let regi = /[a-zA-Z]/;
    if(regi.test(redeemCoins)){
      Alert.alert("Sorry", `Cannot Redeem. Please try again.`, [{ text: "Cancel", style: "cancel", }]);
    }
    else if (redeemCoins <= 0) {
      Alert.alert("Sorry", `${userData.username} can't redeem ${redeemCoins} coins. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (redeemCoins > remainingCoins) {
      Alert.alert("Sorry", `${userData.username} does not have ${redeemCoins} coins to redeem. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (redeemCoins <= remainingCoins) {
      let userRedeem: IRedeemCoins = {
        Coins: remainingCoins,
        Id: userData.id
      }

      //need to send to the back
      quickMath()
      setRefreshCoins(true)
      Alert.alert("Success", `${userData.username} have redeemed ${redeemCoins} coins.`, [{ text: "Okay", style: "cancel", onPress: () => console.log('hi') }]);
    }
    


  }

  useEffect(() => {
    console.log(userData)

    setRefreshCoins(false)
    setRemainingCoins((Number(remainingCoins) ))
  }, [refreshCoins])

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 15 }}>
            <HeaderComponent title='REDEEM COINS' />
          </View>

          <View style={styles.underlineContainer}>
            <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
          </View>


          <View style={styles.underlineContainer}>
            <UnderlinedOneHeaderComponent titleFirst={'Redeem'} />
          </View>

          <View style={{ flex: 0.1, marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
            <Text> {userData.username} has a total of {remainingCoins} coins. Enter the value of coins you would like to redeem:</Text>
          </View>

          <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center' }}>

            <InputFieldComponent maxLength={80} value={''} holder="Redeem Coins" hide={false} onChangeText={(e: string) => setRedeemCoins(e)} />

          </View>

          <View style={{ flex: 0.1, marginLeft: 40, marginRight: 40, justifyContent: 'center' }}>
            <FullButtonComponent color={orangeColor} radius={15} onPress={() => { handleRedeem()}}><Text> Redeem </Text></FullButtonComponent>
          </View>

        </View>
      </TouchableWithoutFeedback>
      <FullButtonComponent radius={0} color={purpleColor} onPress={() => handleGoBack()}><Text> Back </Text></FullButtonComponent>
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