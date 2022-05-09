import React, { FC, useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Platform  } from 'react-native'
import ITask from '../Interfaces/ITask';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { FontAwesome5 } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import ModalComponent from './ModalComponent';
import { DatePickerModal } from 'react-native-paper-dates';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {en, enGB, registerTranslation,} from 'react-native-paper-dates'
import { ThemeContext } from '../context/ThemeContext';
import UnderlinedOneHeaderComponent from './UnderlinedOneHeaderComponent';
import UserNameComponent from './UserNameComponent';
import ReactNativeCalendar from './ReactNativeCalendar';
import { AddChildAssignedTasks, AddUserAssignedTasks } from '../services/dataService';
  registerTranslation('en', en)
  registerTranslation('en-GB', enGB)


interface taskProp {
    task: ITask; 
    idx: number;
    r:number
}


const TaskRowTaskInfoComponent: FC<taskProp> = ({task, idx, r}) => {

    const { modalVisible, setModalVisible, scheduleTask, setScheduleTask, selectedUser, userData, myRoom} = useContext(UserContext)
    const {secondaryTextColor, lightLilacColor, yellowColor, blueColor} = useContext(ThemeContext)

   
    const [dates, setDates] = React.useState<Date[] | undefined>();
    const [arrDates, setArrDates] = useState<any[]>([])
    const [open, setOpen] = React.useState(false);

    const [isAdded, setIsAdded]= useState(false)
    let newArr=[] as any

    const onDismiss = React.useCallback(() => {
      setOpen(false);

     
    }, [setOpen]);
  

    const onConfirm = React.useCallback((params) => {
      setOpen(false);
      setDates(params.dates);
     
      newArr=params.dates?.map((date:any)=> date.toISOString().slice(0,10)) as any[];
      let date = new Date
      //console.log(params.dates)
      //console.log(date.toLocaleString().split(','))
      //console.log(task)
      setArrDates(newArr)
      
      sendScheduledTasks()
      setIsAdded(true)
      
        
    }, []);
    
      const sendScheduledTasks = async()=> {
            let scheduledTasksArr =[]

            if(!selectedUser.isChild)
            {
                  for(let i=0; i < newArr.length; i++) {
                          let scheduledTaskUser = {
                                      Id:0,
                                      UserId: selectedUser.id,
                                      SpaceId: myRoom.id,
                                      AssignedTaskId: task.id,
                                      DateCreated: newArr[i],
                                      DateCompleted: "none",
                                      IsCompleted: false,
                                      IsDeleted: false,
                                      Repeat:0
                                  }
                              scheduledTasksArr.push(scheduledTaskUser)

                      }
                      console.log(scheduledTasksArr)
                      let result = await AddUserAssignedTasks(scheduledTasksArr)
                      
            }
            
            else{
      
              for(let i=0; i < newArr.length; i++) {
                  let scheduledTaskUser = {
                              Id:0,
                              ChildId: selectedUser.id,
                              SpaceId: myRoom.id,
                              SelectedTaskId: task.id,
                              DateCreated: newArr[i],
                              DateCompleted: "none",
                              IsCompleted: false,
                              IsDeleted: false,
                              Repeat:0
                          }
                      scheduledTasksArr.push(scheduledTaskUser)
                     
              }
               console.log(scheduledTasksArr)
                let result = AddChildAssignedTasks(scheduledTasksArr)
        }
     

      }




    const displayTaskInfo =()=> {
        // setModalVisible(true)
        setScheduleTask(task)
        setOpen(true) 
       
    }
  
    // const ModalContent = () => {


    //     const theme = { ...DefaultTheme,
    //         colors: {
    //         ...DefaultTheme.colors,
    //         primary: blueColor,
    //         accent: lightLilacColor,
            
    //       }, }

    //     return(
    //         <>
    //         <View>
    //         <Text>{task.task.name}</Text>
    //         </View>
    //         <View>
    //             <UnderlinedOneHeaderComponent titleFirst={'Repeat'} />
    //         </View>
    //         <View>
    //         <UnderlinedOneHeaderComponent titleFirst={'Dates'} />
    //         <View>
    //             <UserNameComponent name={'Start Date'} />
    //         </View>
    //         <View>
    //             <UserNameComponent name={'End Date'} />
    //         </View>

    //         </View>
    //         <View>
    //         <Button title="Calendar" onPress={() => setOpen(true)} />
           
    //     <PaperProvider theme={theme}>
        
      
    //   <DatePickerModal
        
    //     locale="en"
    //     mode="multiple"
    //     visible={open}
    //     onDismiss={onDismiss}
    //     dates={dates}
    //     onConfirm={onConfirm}
    
    //     // moreLabel="More"
    //     validRange={{
    //       startDate: new Date(),  // optional
    //       //endDate: new Date(2023, 1, 2), // optional
    //     }}
    //     // saveLabel="Save" // optional
    //     //uppercase={false} // optional, default is true
    //     // label="Select period" // optional
    //     // startLabel="From" // optional
    //     // endLabel="To" // optional
    //     // animationType="slide" // optional, default is slide on ios/android and none on web
    //   />
        
    //     </PaperProvider>
    //         </View>
          
    //       </>
    //     )
    // }
    const theme = { ...DefaultTheme,
        colors: {
        ...DefaultTheme.colors,
        primary: blueColor,
        accent: lightLilacColor,
        
      }, }
    
  return (
      <>
    <View key={idx}>
    <TaskSpaceRowComponent idx={r+idx} onPress={()=>displayTaskInfo()}>
        <View style={[styles.container, styles.flexrow]}>
          <Text style={[styles.text, ]}>{task.task.name} {task.item.name}</Text>
          <View style={[styles.flexrow]}>
              {
                  !isAdded?
                   <FontAwesome5 name={'plus'} size={25} style={{marginRight: 10, color: "#FFF"}} />
                   : 
                   <FontAwesome5 name={'minus'} size={25} style={{marginRight: 10, color: "#FFF"}} />
              }
         
          <Text style={[styles.text, ]}>{task.task.coins} coins</Text>
          </View>
        </View>
    </TaskSpaceRowComponent>
    
    </View>
    <PaperProvider theme={theme}>
        
      
      <DatePickerModal
        
        locale="en"
        mode="multiple"
        visible={open}
        onDismiss={onDismiss}
        dates={dates}
        onConfirm={onConfirm}
    
        // moreLabel="More"
        validRange={{
          startDate: new Date(),  // optional
          //endDate: new Date(2023, 1, 2), // optional
        }}
        // saveLabel="Save" // optional
        //uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
      />
        
        </PaperProvider>
    {/* <ModalComponent>
        <ModalContent />
     </ModalComponent> */}
    </>
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
        },
        calendar:{
            width: "50%",
            height: "50%",
        }
        
       

    })

 
export default TaskRowTaskInfoComponent