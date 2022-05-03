// import { StatusBar } from 'expo-status-bar';
import { FC, useContext, useEffect, useState } from 'react';
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
import { GetAllTasks, GetTasksByRoomId } from '../../services/dataService';
import FullButtonComponent from '../../components/FullButtonComponent';
import ITask from '../../Interfaces/ITask';
import TaskRowFullInfoComponent from '../../components/TaskRowFullInfoComponent';



type Props = NativeStackScreenProps <RootStackParamList, 'AddedTasks'>


const AddedTasksScreen: FC<Props> = ({navigation})=> {
    const {bgColor, lilacColor, purpleColor} = useContext(ThemeContext)
    const { userData, usersAddedTasks, setTasksAPI, roomTasks, setRoomTasks, myRoom, tasksAPI } = useContext(UserContext)
    const [display, setDisplay] = useState(false)


    useEffect(() => {
  
     
     displayTasks()
     
  
    }, [])

      let r = Math.floor(Math.random() * 7)

     const displayAddIcon = () => {
        console.log('Plus Icon Works');
        navigation.navigate('AddItems')
      }

      const displayTasks = async() => {
          let tasks = await GetTasksByRoomId(myRoom.id)
          console.log(myRoom.id)
          console.log(tasks)

          if(tasks)
          {
            setRoomTasks(tasks)
            console.log(tasks)
          }
        
         
          

      }

      const displayTaskInfo =() => {

      }

  return (
    <>
      <ScrollView>
    <View style={styles.container}>
         <HeaderComponent title="MY Added Tasks" />
        
    </View>
     <View style={styles.addExtraContainer}>
     <AddItemButtonComponent onPress={displayAddIcon}>
       <Entypo name="squared-plus" size={50} color={lilacColor} />
     </AddItemButtonComponent>
       <UserNameComponent name="Add Items For more tasks"></UserNameComponent>
   </View>

    {/*//map all items here} */}
    {
      roomTasks.map((task:ITask, idx:number)=>{
        return(


          <TaskRowFullInfoComponent r={r} key={idx} idx={idx} task={task} />
          // <TaskSpaceRowComponent key={idx} idx={r+idx} onPress={()=>{displayTaskInfo(); console.log(task)}}>
          // <Text>{task.tasks.name}</Text>
          // <View>
          // <FontAwesome5 name={'coins'} size={25} style={{marginRight: 10, color: "#FFF"}} />
          // <Text>10 coins</Text>
          // </View>
          // </TaskSpaceRowComponent>
        )
      })
    }
    
    
    
   </ScrollView>
<FullButtonComponent onPress={()=>navigation.goBack()} color={purpleColor}>
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
    paddingTop: 60
  },
  addExtraContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  }
});

export default AddedTasksScreen