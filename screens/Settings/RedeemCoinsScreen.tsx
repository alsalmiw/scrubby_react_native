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

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemCoins'>

const RedeemCoinsScreen: FC<Props> = ({ navigation, route }) => {



  const { orangeColor, purpleColor } = useContext(ThemeContext)

  const { userData } = useContext(UserContext)
  const [redeemCoins, setRedeemCoins] = useState("")
  const [remainingCoins, setRemainingCoins] = useState<number>()
  const [refreshCoins, setRefreshCoins] = useState(true)

  const handleGoBack = () => {
    navigation.navigate("Settings")
  }
  const handleRedeem = () => {

    if (redeemCoins > userData.coins) {
      Alert.alert("Sorry", `${userData.username} does not have ${redeemCoins} coins to redeem. Try Again `, [{ text: "Okay", style: "cancel", onPress: () => handleGoBack() }]);
    }
    else if (redeemCoins <= userData.coins) {
      setRemainingCoins((Number(userData.coins) - Number(redeemCoins)))
      //need to send to the back
      setRefreshCoins(true)
      Alert.alert("Sorry", `${userData.username}  have redeemed ${redeemCoins} coins. You have ${redeemCoins} coins left`, [{ text: "Okay", style: "cancel", onPress: () => console.log('hi') }]);
    }

  }

  useEffect(() => {
    console.log(userData)
    console.log('ji')
    setRefreshCoins(false)

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
            <Text> {userData.username} has a total of {userData.coins} coins. Enter the value of coins you would like to redeem:</Text>
          </View>

          <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center' }}>

            <InputFieldComponent maxLength={80} value={''} holder="Redeem Coins" hide={false} onChangeText={(e: string) => setRedeemCoins(e)} />

          </View>

          <View style={{ flex: 0.1, marginLeft: 40, marginRight: 40, justifyContent: 'center' }}>
            <FullButtonComponent color={orangeColor} radius={15} onPress={() => console.log(redeemCoins)}><Text> Redeem </Text></FullButtonComponent>
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