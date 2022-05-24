// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import RootStackParamList from '../types/INavigateSettings'
import HeaderComponent from '../components/HeaderComponent';
import FullButtonComponent from '../components/FullButtonComponent';
import { ThemeContext } from '../context/ThemeContext';
import UserContext from '../context/UserContext';
import { FontAwesome } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'ScoreBoard'>

const ScoreBoardScreen: FC<Props> = ({ navigation, route }) => {
  const { purpleColor, yellowColor } = useContext(ThemeContext)
  const { scoreBoardList } = useContext(UserContext)

  const handleGoBack = () => {
    navigation.navigate("SettingsScreen")
    //navigation.goBack(); 
  }

  useEffect(() => {
    console.log(scoreBoardList)

  }, [])


  return (
    <>
      <View style={styles.container}>

        <HeaderComponent title='SCORE BOARD' />
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 30 }}> {scoreBoardList.length} Participants</Text>
        </View>

        {
          scoreBoardList.sort((a: any, b: any) => b.points - a.points).map((people: any, idx: number) => {
            return (
              <View key={idx} style={styles.scoreBoardParent}>
                <View style={styles.scoreBoardChild1}>
                  <View style={{ paddingRight: 10 }}>
                    <Text style={{ fontSize: 20 }}>{idx + 1}</Text>
                  </View>
                  {/* missing image */}
                  <View style={{ paddingRight: 10 }}>
                    <Text style={{ fontSize: 20 }}>{people.name}</Text>
                  </View>


                </View>
                <View style={styles.parentForPoints}>
                  <View style={{ paddingRight: 10 }}><FontAwesome size={25} name="star" color={yellowColor} /></View>
                  <View style={{ paddingRight: 10 }}>
                    <Text style={{ fontSize: 20 }}>{people.points}</Text>
                  </View>

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
  scoreBoardParent: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  scoreBoardChild1: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'flex-start'
  },
  parentForPoints: {
    alignItems: 'flex-end',
    paddingRight: 10,
    flexDirection: 'row'
  }
});

export default ScoreBoardScreen