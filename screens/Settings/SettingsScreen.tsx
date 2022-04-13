import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';

const SettingsScreen: FC = () => {

  const displayBackHandler = () => {
    console.log('Back Button is working')
  }

  const displayAcceptHandler = () => {
    console.log('Accept Button is working')
  }

  return (

    <View style={styles.container}>
      <Text>My Settings Page</Text>
      <TwoFullButtonComponent
        onBackPress={displayBackHandler}
        onAcceptPress={displayAcceptHandler}
        text1="Back"
        text2="Accept"
      >
      </TwoFullButtonComponent>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen