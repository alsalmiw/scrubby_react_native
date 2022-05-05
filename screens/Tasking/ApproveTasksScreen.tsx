// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import RootStackParamList from '../../types/INavigateTasking'
import { ThemeContext } from '../../context/ThemeContext';
import HeaderComponent from '../../components/HeaderComponent';
import FullButtonComponent from '../../components/FullButtonComponent';


type Props = NativeStackScreenProps <RootStackParamList, 'ApproveTasks'>

const ApproveTasksScreen: FC<Props> = ({navigation, route})=> {
  const { purpleColor} = useContext(ThemeContext)
  
  const handleGoBack = ()=>{
   
  }

  
  return (
 <>
    <View style={styles.container}>
        
        <HeaderComponent title='Approve Tasks'/>
        <View>
          <Text> Approve Tasks</Text>
        </View>
        
    </View>
    <FullButtonComponent radius={0} color={purpleColor} onPress={()=>handleGoBack()} >Back</FullButtonComponent>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

export default ApproveTasksScreen