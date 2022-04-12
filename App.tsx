import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonModalComponent from './components/Modal/ButtonModalComponent';
// import { ThemeProvider } from './context/ThemeContext';
// import HeaderComponent from './components/HeaderComponent'


export default function App() {

  const displayHandler = () => {
    console.log('Hello World')
  }

  return (
    // <ThemeProvider>
    // <HeaderComponent title="Header Component"/>
    <>
      <View style={styles.container}>
        <Text>WhatWhat</Text>
        <ButtonModalComponent onPress={displayHandler} >Completed</ButtonModalComponent>
      </View>
    </>
    // {/* </ThemeProvider> */}
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
