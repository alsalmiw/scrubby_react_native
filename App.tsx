import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import HeaderComponent from './components/HeaderComponent'
import UnderlinedHeaderComponent from './components/UnderlinedHeaderComponent';
import NavigationComponent from './components/NavigationComponent'

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
    <ThemeProvider>
    <NavigationComponent />
    </ThemeProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    flex: 1,
  }
});
