// import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import UserContext from '../../context/UserContext';
import RootStackParamList from '../../types/INavigateProfile';
import AvatarComponent from '../../components/AvatarComponent';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';

import { FontAwesome5 } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'ChildTasks'>

const ChildTasksScreen: FC = () => {
  const { childPage, setChildPage, userData } = useContext(UserContext)

  useEffect(() => {
    console.log(childPage)
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <View>

          <HeaderComponent title='My Tasks'></HeaderComponent>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={styles.firstRow}>
            <AvatarComponent onPress={() => console.log('hi')} imageSource={userData.photo} />
          </View>

          <View style={styles.nameAndCoinContainer}>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
              <Text>{childPage.dependentName}</Text>
              <FontAwesome5 name="unlock" size={24} color="grey" />
            </View>

            <Text>{childPage.dependentAge} years old</Text>

            <View style={styles.coinContainer}>
              <CoinsPointsDisplayContainer coins={childPage.dependentCoins} points='100' ></CoinsPointsDisplayContainer>
            </View>


          </View>

        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
          <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
          <UnderlinedOneHeaderComponent titleFirst={'Tasks'}></UnderlinedOneHeaderComponent>
        </View>


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight
  },
  coinContainer: {
    marginTop: '6%',
    alignItems: 'center',
    width: '100%'
  },
  nameAndCoinContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  firstRow: {
    marginVertical: '0%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChildTasksScreen