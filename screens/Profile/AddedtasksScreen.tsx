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
import TwoFullButtonComponent from '../../components/TwoFullButtonComponent';



type Props = NativeStackScreenProps <RootStackParamList, 'AddedTasks'>


const AddedTasksScreen: FC<Props> = ({navigation})=> {
    const {bgColor, lilacColor, purpleColor} = useContext(ThemeContext)
    const { userData, usersAddedTasks, setTasksAPI, roomTasks, setRoomTasks, myRoom, tasksAPI, current, setCurrent, setStoredAddedItems, rState, noAddedItems, setNoAddedItems } = useContext(UserContext)
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

      const handleGoToAddedItems = async() => {
        let getAddedItems = await GetTasksByRoomId(myRoom.id)
        if(getAddedItems.length>0){
          let addedItemsWColor = [] as any
          getAddedItems.map((task:any, idx: number)=>  addedItemsWColor.push({ ...task, 'color': (rState + idx+2), 'spaceId': myRoom.id }))
         
          setStoredAddedItems(addedItemsWColor)
          navigation.navigate('AddedItems')
          setNoAddedItems(true)
        }
      }

  return (
    <>
      <ScrollView>
    <View style={styles.container}>
         <HeaderComponent title="MY Added Tasks" />
         <View style={{padding: 10}}>
         <UnderlinedOneHeaderComponent titleFirst={"My Room: "+ myRoom.spaceName} />
        </View>
    </View>
     <View style={styles.addExtraContainer}>
     <AddItemButtonComponent onPress={displayAddIcon}>
       <View style={{flexDirection: "row", alignItems: "center"}}>
       <Entypo name="squared-plus" size={50} color={lilacColor} />
       <UserNameComponent name="Add Items For more tasks"></UserNameComponent>
       </View>
     </AddItemButtonComponent>
       
   </View>

    {/*//map all items here} */}
    {
      roomTasks.length > 0 ?
      roomTasks.map((task:ITask, idx:number)=>{
        return(

          <View key={idx}>
          <TaskRowFullInfoComponent r={r} key={idx} idx={idx} task={task} />
          <View style={[ {display:current===task.id?"none": "none", padding: 10}]}>
          <Text style={[styles.taskInfo ]}>Description: {task.task.description}</Text>
           <Text style={[styles.taskInfo ]}>Item: {task.item.name}</Text>
           <Text style={[styles.taskInfo ]}>Points: {task.task.coins} points</Text>
           </View>

          </View>



          
     
        )
      })
      :
      
      <View style={[ {padding:10}]}>
                    <UserNameComponent name="You have no tasks. Add items for a list of auto generated tasks."/>
                </View>
    }
    
    
    
   </ScrollView>
   {
         roomTasks.length > 0 ?
         <TwoFullButtonComponent color={purpleColor} text1={"Back"} text2={"Added Items"} onBackPress={()=>navigation.goBack()} onAcceptPress={handleGoToAddedItems} />

         : 


         <FullButtonComponent radius ={0} onPress={()=>navigation.goBack()} color={purpleColor}>
      {/* AddSelectedTask(addTask), console.log(AddSelectedTask(addTask) */}
        <Text>Back</Text>
      </FullButtonComponent>
   }

</>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent:"space-between",
    
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