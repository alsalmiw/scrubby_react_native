import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import HeaderComponent from './components/HeaderComponent'
import UnderlinedHeaderComponent from './components/UnderlinedHeaderComponent';
import NavigationComponent from './components/NavigationComponent';

import LoginAndCreateAccountScreen from './screens/LoginCreateAccountScreen';
import InputFieldComponent from './components/AddEdit/InputFieldComponent';
import PhotoComponent from './components/PhotoComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


type  RootStackParamList ={
  Login: undefined
  nav: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    <UserProvider>
      <ThemeProvider>

        <NavigationContainer>
          <Stack.Navigator>

          
          <Stack.Screen name="Login" component={LoginAndCreateAccountScreen} />

          <Stack.Screen name="nav" component={LoginAndCreateAccountScreen} />
          </Stack.Navigator>


        </NavigationContainer>
        {/* <LoginAndCreateAccountScreen /> */}
        {/* <InputFieldComponent /> */}
        {/* <NavigationComponent /> */}


      </ThemeProvider>

    </UserProvider>



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
