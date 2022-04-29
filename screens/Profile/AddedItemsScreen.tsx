// import { StatusBar } from 'expo-status-bar';
import { FC, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import UserContext from '../../context/UserContext';
import HeaderComponent from '../../components/HeaderComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import SquareColoredButton from '../../components/SquareColoredButton';
import { Dimensions } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Entypo } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../../types/INavigateProfile';
import FullButtonComponent from '../../components/FullButtonComponent';
import { AddSelectedTask } from '../../services/dataService'


interface taskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
  color: number;
}

interface noColorTaskInfo {
  description: string;
  id: number;
  name: string;
  tags: string;
  UserId: number;
  color?: number
}



type Props = NativeStackScreenProps<RootStackParamList, 'MyProfile'>


const AddedItemsScreen: FC<Props> = ({navigation}) => {

  const { seeAll, setSeeAll, task, setTask, allTask, setAllTask, addTask, setAddTask, userData, rState, setRState } = useContext(UserContext)

  const { lilacColor, purpleColor } = useContext(ThemeContext)
  const windowWidth = Dimensions.get('window').width * 0.25;
  

  const handleNavigate = () => {
    console.log('Hello World');
    navigation.navigate("AddItems");
  }
  const handleNavigateDone = async () => {
    //console.log('This is the done button');
    console.log(addTask);

    let newAddTask: noColorTaskInfo[] = [...addTask];
   
    //await AddSelectedTask(addTask)

    //I need to copy addTask to another variable
    //Then i need to get that new variable and loop through each object and delete the color property
    //Then with the newly formatted object without color property, send it to AddSelectedTask(newAddTask)
    //Then i must set the addTask to empty 

    console.log('This is the new add task array of object');
    console.log(newAddTask);

    newAddTask.forEach((task: noColorTaskInfo) => {
      delete task.color;
    })

    console.log('This is the deleted color new Add Task');
    console.log(newAddTask);

    //Now i just send newAddTask to the addSelectedTask
    await AddSelectedTask(newAddTask)

    //I am assuming
    setAddTask([])


    //This is just a default location, need to ask where this exactly goes
    navigation.navigate("MyProfile")
  }

  const handleDeleteItem = (id:number) => {

    setAddTask((currentTasks: any) => {

      return currentTasks.filter((task:any, x:number) => x !== id)
      
    });
  
  }
  
  return (
    <View style={styles.container}>
      {/* This header component use font size 25, later must change to percentage based on device width */}
      <View>
        <HeaderComponent title="Master Bathroom Items" />
        <UnderlinedOneHeaderComponent titleFirst="Added Items" />
      </View>


      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '2%' }}>
       
          <AddItemButtonComponent onPress={handleNavigate}>
            <Entypo name="squared-plus" size={windowWidth} color={lilacColor} />
          </AddItemButtonComponent>
        
        {

          addTask.map((colorBtn: taskInfo, x: number) => {
            console.log(colorBtn);
            return (
              <View>
                <SquareColoredButton key={colorBtn.id} idx={colorBtn.color}  onPress={handleDeleteItem.bind(this, x)} >
                  <Entypo name="minus" size={45} color="white" style={{ paddingBottom: 0, marginBottom: 0, textAlign: 'center' }} />
                  <Text style={{ color: 'white', textAlign: 'center', marginTop: 0 }}>{colorBtn.name}</Text>
                </SquareColoredButton>
              </View>

            )
          })
        }
      </View>

        <FullButtonComponent onPress={handleNavigateDone} color={purpleColor}>
          <Text>Done</Text>
        </FullButtonComponent>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});

export default AddedItemsScreen

// onPress={() => { colorBtn.UserId = userData.id, addTask.push(colorBtn), console.log(addTask)