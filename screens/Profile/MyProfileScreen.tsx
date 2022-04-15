// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer'
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import AddPhotoComponent from '../../components/AddPhotoComponent';

const MyProfileScreen: FC = ()=> {
  
  let r = Math.floor (Math.random()*7)

  //let arr = ['jfghjshg', 'shjfgkhjsdfgkj', 'hfsgsjdhkdhjfg', 'idfoaijufiafj', 'sgdfgsgdsg', 'sddsgsdgsdg', 'adfafaf', 'sdfsdfgsd', 'sdfgsfafa', 'sdgsdgsdfg']
  return (
 
    <View style={styles.container}>
        
        {/* <CoinsPointsDisplayContainer coins="200" points="10,000" />
        {arr.map((title, idx) => {
          return (
           <TaskSpaceRowComponent key={idx} idx={idx+r}>
          <Text>{title}</Text>
          <Text>Icon</Text>
          <Text>{idx+2}</Text>
        </TaskSpaceRowComponent>
          )
        })}
        */}

    <Text>MyProfile</Text>
        
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

export default MyProfileScreen