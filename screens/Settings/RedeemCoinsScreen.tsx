// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, Pressable } from 'react-native';

import RootStackParamList from '../../types/INavigation'
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
import { GetDependantByUserId, GetDependantsDTOByUsername, GetUserByUsername, NewCoinAmountDependent, NewCoinAmountUser } from '../../services/dataService';
import { FontAwesome5 } from '@expo/vector-icons';
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemCoins'>
//////
const RedeemCoinsScreen: FC<Props> = ({ navigation, route }) => {



  const { orangeColor, purpleColor, lilacColor, yellowColor } = useContext(ThemeContext)
  const { userData, setUserData, setChildrenData, childrenData, seeAll, setSeeAll, childData, savedUsername, isChildFree} = useContext(UserContext)


  const [selectedUser, setSelectedUser] = useState([]) as any
  const [coinAmount, setCoinAmount] = useState(userData.coins)
  const [amountEntered, setAmountEntered] = useState<string>('')
  const [firstTime, setFirstTime] = useState<boolean>(true)


  useEffect(() => {

    if(firstTime)
    {
        setSelectedUser({"id":userData.id, "name":userData.name, "isChild": false, "coins":userData.coins})
        setFirstTime(false)
    }
  
    SetupUsers()

}, [childrenData, userData])

  const handleGoBack = () => {
    navigation.navigate("SettingsScreen")
  }
 

 const handleRedeem = ()=> {
    console.log(typeof coinAmount)
  let regi = /[a-zA-Z]/;
    let regiStuff = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    if (Number(amountEntered) <= 0 || regi.test(amountEntered) || regiStuff.test(amountEntered) ) {
      Alert.alert("Can't Redeem", `Invalid amount. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (Number(amountEntered) > Number(coinAmount)) {
      Alert.alert("Sorry", `${selectedUser.name} does not have ${amountEntered} coins to redeem. Try Again.`, [{ text: "Okay", style: "cancel", }]);
    }
    else if (Number(amountEntered) <= Number(coinAmount)) {
    let leftover = (Number(coinAmount) - Number(amountEntered))
      selectedUser.isChild? handleRedeemChild(leftover): handleRedeemUser(leftover)
    }
 }
  const handleRedeemUser = async(leftAmount:number) => {

      let userRedeem: IRedeemCoins = {

        Id: userData.id,
        Coins: leftAmount,
      }
      console.log(userRedeem);
      setCoinAmount(leftAmount)
      setAmountEntered('')

      let updatedUserInfo = await NewCoinAmountUser(userRedeem)
      if(updatedUserInfo!=null)
      {
             console.log(updatedUserInfo);
            setUserData(updatedUserInfo)
              Alert.alert("Success", `${selectedUser.name} has redeemed ${amountEntered} coins.`, [{ text: "Okay", style: "cancel",}]);
      }

  }



  const handleRedeemChild = async(leftAmount:number) => {
    
      let childRedeem: IRedeemCoinsChild = {
        Id: selectedUser.id,
        DependentCoins: leftAmount

      }
      setCoinAmount(leftAmount)
      setAmountEntered('')
      console.log(childRedeem)
      let updateChildData = await NewCoinAmountDependent(childRedeem)
      if(updateChildData!=null)
      {
        console.log(updateChildData)
         Alert.alert("Success", `${selectedUser.name} has redeemed ${amountEntered} coins.`, [{ text: "Okay", style: "cancel"}]);
         let dependentsInfo = await GetDependantsDTOByUsername(userData.username)
         if(dependentsInfo.length > 0)
         {
           setChildrenData(dependentsInfo)
         }

         
      }
   
 
     
    }
  
  



  const SetupUsers = () => {

    return(
       <>
          <Pressable  onPress={()=> {setSelectedUser({"id":userData.id, "name":userData.name, "isChild": false, "coins":userData.coins}), setCoinAmount(userData.coins) }}>
          <AvatarComponent onPress={undefined} imageSource={userData.photo} />
          <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==userData.id && selectedUser.isChild ==false ? 0:0.5}]} ></View>
          </Pressable>

          {  !isChildFree?
          childrenData.map((child: any, idx: number) => {
            return (
              <Pressable key={idx} onPress={()=> {setSelectedUser({"id":child.id, "name":child.dependentName, "isChild": true, "coins": child.dependentCoins}), setCoinAmount(child.dependentCoins)}}>
              <AvatarComponent onPress={undefined} imageSource={child.dependentPhoto} />
              <View style={[styles.fadedImage, {backgroundColor:"#FFF", opacity: selectedUser.id==child.id && selectedUser.isChild ==true ? 0:0.5}]} ></View>
              </Pressable>
            )
          }):null}
         </>
    )

  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <View style={{ flex: 1 }}>
        <ScrollView>
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
                    <SetupUsers/>
                    </ScrollView>
                  </View>
                </>
                :
                <>
                  <View style={styles.childIconView}>
                  <SetupUsers/>
                  </View>
                </>
            }
          </>
          <View style={styles.underlineContainer}>
            <UnderlinedOneHeaderComponent titleFirst={'Redeem'} />
          </View>
     
              <View style={styles.textContent}>
               
                  {
                    selectedUser.coins>0? 
                   <Text>  {selectedUser.name} has coins!! Enter the value of coins you would like to redeem:   </Text>
                    : 
                    <Text>  {selectedUser.name} does not have any coins. Complete tasks to earn coins!   </Text>
                  }
                
              </View>
              
            
          
          <View style={[{justifyContent: 'center', alignItems: 'center'}]}>
          <View style={[{margin: 10, flexDirection: 'row', padding:20, borderColor:yellowColor, borderWidth:3, borderRadius:15, width:"50%", }]}>
          <FontAwesome5 size={30} name="coins" color={yellowColor} />
            <Text style={[{fontSize:30, paddingLeft: 10}]}>{coinAmount}</Text>
          </View>
          </View>

          {
            selectedUser.coins>0? 
            <>

            <View style={styles.redeemInput}>
                      <InputFieldComponent maxLength={80} value={amountEntered} holder="Redeem Coins" hide={false} onChangeText={(e: string) => setAmountEntered(e)} />
                    </View>
                
                        {/* <View style={styles.buttonContent}>
                          <Pressable style={[{backgroundColor:orangeColor, borderRadius:15, padding:20, marginTop:10}]}  onPress={() => { handleRedeem(), console.log(selectedUser) }}>
                            <Text style={[{color:"white", textAlign: 'center',fontSize: 25}]}> Redeem </Text>
                            </Pressable>
                        </View> */}
              </>
            : null
            
          }
        
        
          
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <TwoFullButtonComponent color={purpleColor} text1={"Back"} text2={"Redeem"} onBackPress={()=>{navigation.goBack()}} onAcceptPress={handleRedeem} />
      {/* <FullButtonComponent radius={0} color={purpleColor} onPress={() => handleGoBack()}><Text> Back </Text></FullButtonComponent> */}
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

    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonContent: {
    
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