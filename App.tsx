import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { ThemeProvider } from './context/ThemeContext';
// import HeaderComponent from './components/HeaderComponent'

import InputFieldComponent from './components/AddEdit/InputFieldComponent';
export default function App() {
  return (
    // <ThemeProvider>
    // <HeaderComponent title="Header Component"/>
    <>
    <View style={styles.container}>
    <Text>WhatWhat</Text>
    <InputFieldComponent />
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
