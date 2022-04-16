// import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

const MySpaceCollectionScreen: FC = ()=> {
  
  return (
    <View style={styles.container}>
    <Text>My Space Collection Screen</Text> 
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

export default MySpaceCollectionScreen