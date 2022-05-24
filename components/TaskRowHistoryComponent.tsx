import React, { FC, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ITask from '../Interfaces/ITask';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import UserContext from '../context/UserContext';

interface taskProp {
    task: any; 
    idx: number;
    r:number
}


const TaskRowFullInfoComponent: FC<taskProp> = ({task, idx, r}) => {
    const { current, setCurrent} = useContext(UserContext)
    const [showTask, setShowTask] = useState(false)

    const displayTaskInfo =()=> {
       setCurrent(idx)
    }

  return (
    <View key={idx}>
    <TaskSpaceRowComponent idx={r+idx} onPress={()=>{displayTaskInfo(); }}>
        <View style={[styles.container, styles.flexrow]}>
          <Text style={[styles.text, ]}>{task.taskName}</Text>
          <View style={[styles.flexrow]}>
              {
                  task.isCompleted?
                   <FontAwesome5 name={'check'} size={25} style={{marginRight: 10, color: "#FFF"}} />
                   : !task.isCompleted?
                   <FontAwesome name={'remove'} size={25} style={{marginRight: 10, color: "#FFF"}} />
                    : !task.isCompleted && task.requestedApproval?
                    <FontAwesome5 name={'clock'} size={25} style={{marginRight: 10, color: "#FFF"}} />
                    :null


              }
         
        
          </View>
        </View>
    </TaskSpaceRowComponent>

    </View>
  )
}
const styles = StyleSheet.create({
       container: {
            justifyContent: 'space-between',
            padding: 0,
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