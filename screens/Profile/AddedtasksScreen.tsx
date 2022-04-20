// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import RootStackParamList from '../../types/INavigateProfile'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserContext from '../../context/UserContext';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';


type Props = NativeStackScreenProps <RootStackParamList, 'AddedTasks'>


const AddedTasksScreen: FC<Props> = ({navigation})=> {
    const {bgColor, lilacColor} = useContext(ThemeContext)
    const { username } = useContext(UserContext)
    const [display, setDisplay] = useState(false)

    const displayAddIcon = () => {
        console.log('Plus Icon Works');
        navigation.navigate('AddItems')
      }

      const displayTaskInfo =() => {

      }

  return (
      <View>
    <View style={styles.container}>
         <HeaderComponent title="MY Added Tasks" />
        
    </View>
     <View>
     <AddItemButtonComponent onPress={displayAddIcon}>
       <Entypo name="squared-plus" size={50} color={lilacColor} />
     </AddItemButtonComponent>
     <View >
       <UserNameComponent name="Create a New Space"></UserNameComponent>
     </View>
   </View>

    {/*//map all items here} */}

    <TaskSpaceRowComponent idx={1} onPress={()=>displayTaskInfo()}>
    <Text>Clean Sink</Text>
    <View>
    <FontAwesome5 name={'coins'} size={25} style={{marginRight: 10, color: "FFF"}} />
    <Text>10 coins</Text>
    </View>
    </TaskSpaceRowComponent>
    
   </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
});

export default AddedTasksScreen