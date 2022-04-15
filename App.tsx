import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import UserContext, { UserProvider } from './context/UserContext';
import NavigationComponent from './components/NavigationComponent';
import { NavigationContainer } from '@react-navigation/native';
import LoginAndCreateAccountScreen from './screens/LoginCreateAccountScreen';
import { FC, useContext, useEffect } from 'react';
// import RootStackParamList from './types/INavigateProfile'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList ={
  login:undefined,
  Nav: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC =()=> {
  const {username, password} = useContext(UserContext)

  useEffect(() => {
   
  }, [])
  

  const checkUser=()=>{
    if(username !=null) {

    }
  }

  return (

    <NavigationContainer>
   <UserProvider>
    <ThemeProvider>
         <Stack.Navigator>
<Stack.Screen name="login" 
component={LoginAndCreateAccountScreen} 
options={{headerShown: false}} />


<Stack.Screen name="Nav" 
component={NavigationComponent} 
options={{headerShown: false}} />

         </Stack.Navigator>

          </ThemeProvider> 

    </UserProvider>
</NavigationContainer>
   



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

export default App;