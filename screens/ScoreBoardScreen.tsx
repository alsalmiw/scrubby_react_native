// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../types/INavigateSettings'
import HeaderComponent from '../components/HeaderComponent';
import FullButtonComponent from '../components/FullButtonComponent';
import { ThemeContext } from '../context/ThemeContext';
import UserContext from '../context/UserContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ScoreBoard'>

const ScoreBoardScreen: FC<Props> = ({ navigation, route }) => {
  const { purpleColor } = useContext(ThemeContext)
  const { scoreBoardList } = useContext(UserContext)

  const handleGoBack = () => {
    navigation.navigate("Settings")
  }

  useEffect(() => {
    console.log(scoreBoardList)

  }, [])


  return (
    <>
      <View style={styles.container}>

        <HeaderComponent title='SCORE BOARD' />
        <View style={{ marginBottom: 10, paddingLeft: 10 }}>
          <Text> Participants</Text>

        </View>

        {
          scoreBoardList.sort((a: any, b: any) => b.points - a.points).map((people: any, idx: number) => {
            return (
              <View key={idx} style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', paddingRight: 10, paddingLeft: 10, alignItems: 'flex-start' }}>
                  <View style={{paddingRight:10}}>
                    <Text>{idx + 1}</Text>
                  </View>
                  {/* missing image */}
                  <View style={{paddingRight:10}}>
                    <Text>{people.name}</Text>
                  </View>


                </View>
                <View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
                  <Text>{people.points}</Text>
                </View>


              </View>
            )
          })
        }


      </View>
      <FullButtonComponent radius={0} color={purpleColor} onPress={() => handleGoBack()} >Back</FullButtonComponent>
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