import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TaskFamilyScreen: FC = ()=> {
  return (
    
   
    
 
    <View style={styles.container}>
        <Text>My Task Family Page</Text>
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

export default TaskFamilyScreen