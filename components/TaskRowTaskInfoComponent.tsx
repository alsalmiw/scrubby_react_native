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
//import ReactNativeCalendar from './ReactNativeCalendar';
import { AddChildAssignedTasks, AddUserAssignedTasks } from '../services/dataService';
import DatePicker from 'react-native-datepicker';
import { getDate } from 'date-fns';
  registerTranslation('en', en)
  registerTranslation('en-GB', enGB)


interface taskProp {
    task: ITask; 
    idx: number;
    r:number
}


const TaskRowTaskInfoComponent: FC<taskProp> = ({task, idx, r}) => {

    const { modalVisible, setModalVisible, scheduleTask, setScheduleTask, selectedUser, userData, myRoom, setRunAgain} = useContext(UserContext)
    const {secondaryTextColor, lightLilacColor, yellowColor, blueColor} = useContext(ThemeContext)

   
    const [dates, setDates] = React.useState<Date[] | undefined>();
    const [datePicker, setDatePicker] = React.useState<string | undefined>('09-10-2022');

    const [storedDates, setStoredDates] = useState<any[]>([])
    const [open, setOpen] = React.useState(false);

    const [isAdded, setIsAdded]= useState(false)
    let datesArr=[] as any

    useEffect(() => {
     //console.log(task.id, myRoom.id, selectedUser.id, selectedUser.isChild)
     let tasksByUser = myRoom.tasksAssigned.filter((assignedTask:any) => assignedTask.assignedTaskId == task.id && assignedTask.userId == selectedUser.id && assignedTask.isChild == selectedUser.isChild) 
     let getDates = [] as any
     tasksByUser.map((tasks:any)=> getDates.push(tasks.dateScheduled))
     console.log(tasksByUser)

     let datesData = getDates.map((date:string)=>{
      let dateF = new Date(date)
        return dateF
     })

    
     setDates(datesData)
     setStoredDates(datesData)
    }, [selectedUser])
    

    const onDismiss = React.useCallback(() => {
      setOpen(false);

     
    }, [setOpen]);
  
let allDate =[] as any
let sendDates=[] as any

    const onConfirm = React.useCallback((params) => {
      setOpen(false);
      setDates(params.dates);
     allDate.push(params.dates)
      let date = new Date
       console.log(storedDates)
       console.log(params.dates)
      let allDatesArr=[ ] as any[]
      if(storedDates.length>0)
      {
        params.dates.toString().split(',').filter((date:any)=> !storedDates.toString().split(',').includes(date)? allDatesArr.push(date):null )
         storedDates.toString().split(',').filter((date:any)=> !params.dates.toString().split(',').includes(date)? allDatesArr.push(date):null )
      }else{
        allDatesArr = params.dates
      }
      
     
      console.log(allDatesArr)

      sendDates= allDatesArr.map((date:string) => {
        let dateF = new Date(date)
        return dateF.toISOString()
      })
     
      sendScheduledTasks()
        
    }, []);
    
      const sendScheduledTasks = async()=> {
            let scheduledTasksArr =[]

            if(!selectedUser.isChild)
            {
                  for(let i=0; i < sendDates.length; i++) {
                          let scheduledTaskUser = {
                                      Id:0,
                                      UserId: selectedUser.id,
                                      SpaceId: myRoom.id,
                                      AssignedTaskId: task.id,
                                      DateCreated: sendDates[i],
                                      DateCompleted: "none",
                                      IsCompleted: false,
                                      IsDeleted: false,
                                      Repeat:0
                                  }
                              scheduledTasksArr.push(scheduledTaskUser)

                      }
                      console.log(scheduledTasksArr)
                      let result = await AddUserAssignedTasks(scheduledTasksArr)
                      if(result) {
                        setRunAgain(true)
                      }
                      
            }
            
            else{
      
              for(let i=0; i < sendDates.length; i++) {
                  let scheduledTaskUser = {
                              Id:0,
                              ChildId: selectedUser.id,
                              SpaceId: myRoom.id,
                              AssignedTaskId: task.id,
                              DateCreated: sendDates[i],
                              DateCompleted: "none",
                              IsCompleted: false,
                              IsDeleted: false,
                              Repeat:0
                          }
                      scheduledTasksArr.push(scheduledTaskUser)
                     
              }
               console.log(scheduledTasksArr)
               let result = await  AddChildAssignedTasks(scheduledTasksArr)
               if(result) {
                setRunAgain(true)
              }
              
        }
     

      }




    const displayTaskInfo =()=> {
       // setModalVisible(true)
        setScheduleTask(task)
       setOpen(true) 
        allDate.push(dates)
        console.log(allDate)

       
    }
  
    const ModalContent = () => {

        return(
            <>
            <View>
            <Text>{task.task.name}</Text>
            </View>
            <View>
                <UnderlinedOneHeaderComponent titleFirst={'Repeat'} />
            </View>
            <View>
            <UnderlinedOneHeaderComponent titleFirst={'Dates'} />
            <View>
                <UserNameComponent name={'Start Date'} />
            </View>
            <View>
                <UserNameComponent name={'End Date'} />
            </View>

            </View>
              <View>
                 <DatePicker
          style={styles.datePickerStyle}
          date={datePicker} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDatePicker(date);
          }}
        />
              </View>
          
          </>
        )
    }
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
    <ModalComponent>
        <ModalContent />
     </ModalComponent>
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
        },
        datePickerStyle: {
          width: 200,
          marginTop: 20,
        },
        
       

    })

 
export default TaskRowTaskInfoComponent