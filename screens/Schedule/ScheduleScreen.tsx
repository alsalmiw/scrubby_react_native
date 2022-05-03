import { StatusBar } from 'expo-status-bar';
import { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ScheduleScreen: FC = ()=> {

  
  useEffect(() => {
    // console.log(savedUsername)
    GetUserInfoByUsername();


  }, [])

  const GetUserInfoByUsername =() => {

  }
  
  return (
    
   
    
 
    <View style={styles.container}>
        <Text>My Schedule Page</Text>
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

export default ScheduleScreen