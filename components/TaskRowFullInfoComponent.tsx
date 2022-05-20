import React, { FC, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ITask from '../Interfaces/ITask';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { FontAwesome5 } from '@expo/vector-icons';
import UserContext from '../context/UserContext';

interface taskProp {
    task: ITask; 
    idx: number;
    r:number
}


const TaskRowFullInfoComponent: FC<taskProp> = ({task, idx, r}) => {
    const { current, setCurrent} = useContext(UserContext)
    const [showTask, setShowTask] = useState(false)

    const displayTaskInfo =()=> {
       setCurrent(task.id)
    }

  return (
    <View key={idx}>
    <TaskSpaceRowComponent idx={r+idx} onPress={()=>{displayTaskInfo(); }}>
        <View style={[styles.container, styles.flexrow]}>
          <Text style={[styles.text, ]}>{task.task.name} {task.item.name}</Text>
          <View style={[styles.flexrow]}>
          <FontAwesome5 name={'coins'} size={25} style={{marginRight: 10, color: "#FFF"}} />
          <Text style={[styles.text, ]}>{task.task.coins} coins</Text>
          </View>
        </View>
    </TaskSpaceRowComponent>

    </View>
  )
}
const styles = StyleSheet.create({
       container: {
            justifyContent: 'space-between',
            padding: 5,
        },
        flexrow: {
            flexDirection: "row"
        },
        text: {
            color:"#FFF", 
            fontWeight: 'bold', 
            fontSize: 20
        }, 
        taskInfo: {
            fontSize: 20,
        }
        
       

    })

export default TaskRowFullInfoComponent