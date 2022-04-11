import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { ThemeProvider } from './context/ThemeContext';
// import HeaderComponent from './components/HeaderComponent'


export default function App() {
  return (
    // <ThemeProvider>
    // <HeaderComponent title="Header Component"/>
    <>
    <View style={styles.container}>
    <Text>WhatWhat</Text>
 
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
