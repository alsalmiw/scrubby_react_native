// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, Pressable } from 'react-native';

import RootStackParamList from '../../types/INavigateSettings'
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import UserContext from '../../context/UserContext';
import InputFieldComponent from '../../components/AddEdit/InputFieldComponent';
import FullButtonComponent from '../../components/FullButtonComponent';
import { ThemeContext } from '../../context/ThemeContext';
import IRedeemCoins from '../../Interfaces/IRedeemCoins';
import IRedeemCoinsChild from '../../Interfaces/IRedeemChildCoins';
import AvatarComponent from '../../components/AvatarComponent';
import { GetDependantByUserId, GetUserByUsername, NewCoinAmountDependent, NewCoinAmountNotDependent } from '../../services/dataService';

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemCoins'>
//////
const RedeemCoinsScreen: FC<Props> = ({ navigation, route }) => {



  const { orangeColor, purpleColor, lilacColor } = useContext(ThemeContext)

  const { userData, setUserData, setChildrenData, childrenData, seeAll, setSeeAll, childData, savedUsername, isChildFree} = useContext(UserContext)
  const [redeemCoins, setRedeemCoins] = useState<any>()
  const [remainingCoins, setRemainingCoins] = useState<any>()
  const [refreshCoins, setRefreshCoins] = useState(true)
  const [aChild, setAChild] = useState<any>()
  const [childRedeem, setChildRedeem] = useState<boolean>(false)
  const [userCoins, setUserCoins] = useState(userData.coins)
  const [childCoin, setChildCoin] = useState()
  const [selectedUser, setSelectedUser] = useState([]) as any



  const handleGoBack = () => {
    navigation.navigate("SettingsScreen")
  }
  let leftover: any;
  const quickMath = async () => {
    !childRedeem ?
      (
        leftover = (Number(userCoins) - Number(redeemCoins)),
        setRemainingCoins(leftover)
      )
      :
      (
        leftover = (Number(childCoin) - Number(redeemCoins)),
        setRemainingCoins(leftover)
      )
  }

  const handleRedeem = () => {
    let regi = /[a-zA-Z]/;
    let regiStuff = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    if (redeemCoins <= 0 || regi.test(redeemCoins) || regiStuff.test(redeemCoins)) {
      Alert.alert("Can't Redeem", `Invalid amount. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (redeemCoins > remainingCoins) {
      Alert.alert("Sorry", `${userData.username} does not have ${redeemCoins} coins to redeem. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (redeemCoins <= remainingCoins) {
      quickMath()
      let userRedeem: IRedeemCoins = {

        Id: userData.id,
        Coins: leftover,
      }
      const newAmount = async (userRedeem: IRedeemCoins) => {
        await NewCoinAmountNotDependent(userRedeem)
      }
      newAmount(userRedeem)
      setUserCoins(leftover)
      Alert.alert("Success", `${userData.username} have redeemed ${redeemCoins} coins.`, [{ text: "Okay", style: "cancel", onPress: () => { setUserCoins(leftover) } }]);

    }
  }
  const handleRedeemChild = () => {
    let regi = /[a-zA-Z]/;
    let regiStuff = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    if (redeemCoins <= 0 || regi.test(redeemCoins) || regiStuff.test(redeemCoins)) {
      Alert.alert("Can't Redeem", `Invalid amount. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (redeemCoins > remainingCoins) {
      Alert.alert("Sorry", `${aChild.dependentName} does not have ${redeemCoins} coins to redeem. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (redeemCoins <= remainingCoins) {
      quickMath()
      let childRedeem: IRedeemCoinsChild = {
        Id: aChild.id,
        DependentCoins: leftover

      }
      const newAmountChild = async (childRedeem: IRedeemCoinsChild) => {
        await NewCoinAmountDependent(childRedeem)
      }
      newAmountChild(childRedeem)
      setChildCoin(leftover)
      Alert.alert("Success", `${aChild.dependentName} have redeemed ${redeemCoins} coins.`, [{ text: "Okay", style: "cancel", onPress: () => { setChildCoin(leftover) } }]);
    }
  }
  // const getUserandChild = async () => {
  //   let user = await GetUserByUsername(savedUsername);
  //   if (user.length != 0) {
  //     setUserData(user)
  //     let children = await GetDependantByUserId(user.id);
  //     if (children.length != 0) {
  //       setChildrenData(children)
  //       console.log(children)
  //     }
  //   }
  // }

  useEffect(() => {
    setSelectedUser({"id":userData.id, "isChild": false})
    setChildRedeem(false)
    // getUserandChild()
    setUserCoins(userData.coins)
    console.log("================================================")
    //setChildRedeem(false)
    //setChildCoin(aChild.dependentCoins)
    setRedeemCoins("")
    quickMath()
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
            {
              childrenData.length>2?
            <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
            : 
            <UnderlinedOneHeaderComponent titleFirst={"Select Member"} />

            }
      
          </View>
          <>
            {
              seeAll ?
                <>
                  <View >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Pressable  onPress={()=> {setSelectedUser({"id":userData.id, "isChild": false}), setChildRedeem(false), setRefreshCoins(true) }}>

                      <AvatarComponent onPress={undefined} imageSource={userData.photo} />
                    
                    <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==userData.id && selectedUser.isChild ==false ? 0:0.5}]} ></View>
            </Pressable>
                    
                      {  !isChildFree?
                      childrenData.map((child: any, idx: number) => {
                        return (
                          <Pressable key={idx} onPress={()=> {setSelectedUser({"id":child.id, "isChild": true}), setAChild(child), setChildCoin(child.dependentCoins),setChildRedeem(true) }}>
                          <AvatarComponent onPress={undefined} imageSource={child.dependentPhoto} />
                          <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==child.id && selectedUser.isChild ==true ? 0:0.5}]} ></View>
                          </Pressable>
                        )
                      }):null}
                    </ScrollView>
                  </View>
                </>
                :
                <>
                  <View style={styles.childIconView}>
                  <Pressable  onPress={()=> {setSelectedUser({"id":userData.id, "isChild": false}), setChildRedeem(false), setRefreshCoins(true) }}>

                  <AvatarComponent onPress={undefined} imageSource={userData.photo} />

                <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==userData.id && selectedUser.isChild ==false ? 0:0.5}]} ></View>
                </Pressable>
                    {
                     !isChildFree?
                     childrenData.map((child: any, idx: number) => {
                      return (
                        <Pressable key={idx} onPress={()=> {setSelectedUser({"id":child.id, "isChild": true}), setAChild(child), setChildCoin(child.dependentCoins),setChildRedeem(true) }}>
                        <AvatarComponent onPress={undefined} imageSource={child.dependentPhoto} />
                        <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==child.id && selectedUser.isChild ==true ? 0:0.5}]} ></View>
                        </Pressable>
                      )
                    }):null}
                  </View>
                </>
            }
          </>
          <View style={styles.underlineContainer}>
            <UnderlinedOneHeaderComponent titleFirst={'Redeem'} />
          </View>
          {
            !childRedeem ?
              <View style={styles.textContent}>
                <Text> {userData.username} has a total of {userCoins} coins. Enter the value of coins you would like to redeem:</Text>
              </View>
              :
              <View style={styles.textContent}>
                <Text> {aChild.dependentName} has a total of {childCoin} coins. Enter the value of coins you would like to redeem:</Text>
              </View>
          }
          <View style={styles.redeemInput}>
            <InputFieldComponent maxLength={80} value={""} holder="Redeem Coins" hide={false} onChangeText={(e: string) => setRedeemCoins(e)} />
          </View>
          {
            !childRedeem ?
              <View style={styles.buttonContent}>
                <FullButtonComponent color={orangeColor} radius={15} onPress={() => { handleRedeem(), console.log('adult') }}><Text> Redeem </Text></FullButtonComponent>
              </View>
              :
              <View style={styles.buttonContent}>
                <FullButtonComponent color={orangeColor} radius={15} onPress={() => { handleRedeemChild() }}><Text> Redeem </Text></FullButtonComponent>
              </View>
          }
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
  textContent: {
    flex: 0.1,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonContent: {
    flex: 0.1,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center'
  },
  childIconView: {
    opacity: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  redeemInput: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center'
  }, 
  fadedImage: {
    borderRadius:10, 
    width: 100,
    height: 100, 
    margin: 5,
    position: 'absolute'

},
});

export default RedeemCoinsScreen