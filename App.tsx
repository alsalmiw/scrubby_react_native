import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ButtonModalComponent from './components/Modal/ButtonModalComponent';
import AddItemButtonComponent from './components/AddItemButtonComponent';
import FullButtonComponent from './components/FullButtonComponent';

import { AntDesign } from '@expo/vector-icons';
// import { ThemeProvider } from './context/ThemeContext';
// import HeaderComponent from './components/HeaderComponent'


export default function App() {

  const displayHandler = () => {
    console.log('Hello World')
  }

  const displayAddHandler = () => {
    console.log('This is the add button');
  }

  const displayFullHandler = () => {
    console.log('Full Display');
  }

  return (
    // <ThemeProvider>
    // <HeaderComponent title="Header Component"/>
    <>
      <View style={styles.container}>
        {/* This is the ButtonModalComponent */}
        <ButtonModalComponent onPress={displayHandler}>Completed</ButtonModalComponent>
        {/* This is the AddItemButtonComponent */}
        <AddItemButtonComponent onPress={displayAddHandler}>
          {/* This is the expo vector icon, size is based on pixels */}
          <AntDesign name="plussquare" size={130} color="grey" />
        </AddItemButtonComponent>
        <FullButtonComponent onPress={displayFullHandler}>Back</FullButtonComponent>

      </View>

    </>
    // {/* </ThemeProvider> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  addButtonContainer: {
    flex: 1,
  }
});
