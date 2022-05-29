// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import AddItemButtonComponent from '../../components/AddItemButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import UserNameComponent from '../../components/UserNameComponent';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';
import RootStackParamList from '../../types/INavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserContext from '../../context/UserContext';
import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { GetAllTasks, GetTasksByRoomId } from '../../services/dataService';
import FullButtonComponent from '../../components/FullButtonComponent';
import ITask from '../../Interfaces/ITask';
import TaskRowFullInfoComponent from '../../components/TaskRowFullInfoComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';



type Props = NativeStackScreenProps <RootStackParamList, 'AddedTasks'>


const AddedTasksScreen: FC<Props> = ({navigation})=> {
    const {bgColor, lilacColor, purpleColor} = useContext(ThemeContext)
    const { userData, usersAddedTasks, setTasksAPI, roomTasks, setRoomTasks, myRoom, tasksAPI, current, setCurrent } = useContext(UserContext)
    const [display, setDisplay] = useState(false)
  

    // useEffect(() => {
  
     
    //  //displayTasks()
     
  
    // }, [])

      let r = Math.floor(Math.random() * 7)

     const displayAddIcon = () => {
        console.log('Plus Icon Works');
        navigation.navigate('AddItems')
      }

      // const displayTasks = async() => {
      //     let tasks = await GetTasksByRoomId(myRoom.id)
      //     console.log(myRoom.id)
      //     console.log(tasks)

      //     if(tasks.length > 0) 
      //     {
      //       setRoomTasks(tasks)
      //       console.log(tasks)
      //     }
      //     else{
      //       setRoomTasks([])
      //     }
        
         
          

     // }

      const displayTaskInfo =() => {

      }

  return (
    <>
      <ScrollView>
    <View style={styles.container}>
         <HeaderComponent title="MY Added Tasks" />
         <UnderlinedOneHeaderComponent titleFirst={"My Room: "+ myRoom.spaceName} />
        
    </View>
     <View style={styles.addExtraContainer}>
     <AddItemButtonComponent onPress={displayAddIcon}>
       <Entypo name="squared-plus" size={50} color={lilacColor} />
     </AddItemButtonComponent>
       <UserNameComponent name="Add Items For more tasks"></UserNameComponent>
   </View>

    {/*//map all items here} */}
    {
      roomTasks.length > 0 ?
      roomTasks.map((task:ITask, idx:number)=>{
        return(

          <View key={idx}>
          <TaskRowFullInfoComponent r={r} key={idx} idx={idx} task={task} />
          <View style={[ {display:current===task.id?"flex": "none", padding: 10}]}>
          <Text style={[styles.taskInfo ]}>Description: {task.task.description}</Text>
           <Text style={[styles.taskInfo ]}>Item: {task.item.name}</Text>
           <Text style={[styles.taskInfo ]}>Points: {task.task.coins} points</Text>
           </View>

          </View>



          
     
        )
      })
      :
      
      <Text>You have no Tasks</Text>
    }
    
    
    
   </ScrollView>
<FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={purpleColor}>
      {/* AddSelectedTask(addTask), console.log(AddSelectedTask(addTask) */}
        <Text>Back</Text>
      </FullButtonComponent>
</>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  addExtraContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  },
  taskInfo: {
    fontSize: 20,
}
});

export default AddedTasksScreen