import React, { FC, useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Platform } from 'react-native'
import ITask from '../Interfaces/ITask';
import TaskSpaceRowComponent from './TaskSpaceRowComponent';
import { FontAwesome5 } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import ModalComponent from './ModalComponent';
import { DatePickerModal } from 'react-native-paper-dates';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { en, enGB, registerTranslation, } from 'react-native-paper-dates'
import { ThemeContext } from '../context/ThemeContext';
import UnderlinedOneHeaderComponent from './UnderlinedOneHeaderComponent';
import UserNameComponent from './UserNameComponent';
import { AddChildAssignedTasks, AddUserAssignedTasks, GetCollectionByUsername, GetCollectionDTOByCollectionID, GetUserDefaultScheduleByUserId } from '../services/dataService';
import DatePicker from 'react-native-datepicker';
import { getDate } from 'date-fns';
registerTranslation('en', en)
registerTranslation('en-GB', enGB)

interface taskProp {
  task: ITask;
  idx: number;
  r: number;
  selectedSpaceId: number
}


const TaskRowTaskInfoComponent: FC<taskProp> = ({ task, idx, r, selectedSpaceId }) => {

  const { modalVisible, setModalVisible, scheduleTask, setScheduleTask, selectedUser, userData, myRoom, setRunAgain, defaultSpace, mySpace, setDefaultSpace, setMySpaces, mySpaces, setMySpace } = useContext(UserContext)
  const { secondaryTextColor, lightLilacColor, yellowColor, blueColor } = useContext(ThemeContext)


  const [dates, setDates] = React.useState<Date[] | undefined>();
  const [datePicker, setDatePicker] = React.useState<string | undefined>('09-10-2022');

  const [storedDates, setStoredDates] = useState<any[]>([])
  const [open, setOpen] = React.useState(false);
  const [runGetDates, setRunGetDates] = useState<boolean>(true)
  const [isAdded, setIsAdded] = useState(false)
  let datesArr = [] as any

  const displayTaskInfo = () => {
    getTasks()
    setOpen(true)

  }

  const getTasks = () => {
    let tasksByUser = myRoom.tasksAssigned.filter((assignedTask: any) => assignedTask.assignedTaskId == task.id && assignedTask.userId == selectedUser.id && assignedTask.isChild == selectedUser.isChild)
    let getDates = [] as any
    tasksByUser.map((tasks: any) => { getDates.push(tasks.dateScheduled) })

    let datesData = getDates.map((date: string) => {
      let dateF = new Date(date)
      return dateF
    })


    if (runGetDates) {

      setDates(datesData)
      setStoredDates(datesData)
    }



  }


  const onDismiss = () => {
    setOpen(false);

  };

  let allDate = [] as any
  let sendDates = [] as any

  const onConfirm = (params: any) => {
    setRunGetDates(false)
    setOpen(false);
    setDates(params.dates);
    allDate.push(params.dates)
    let date = new Date

    let allDatesArr = [] as any[]
    if (storedDates.length > 0) {
      params.dates.toString().split(',').filter((date: any) => !storedDates.toString().split(',').includes(date) ? allDatesArr.push(date) : null)
      storedDates.toString().split(',').filter((date: any) => !params.dates.toString().split(',').includes(date) ? allDatesArr.push(date) : null)
    } else {
      allDatesArr = params.dates
    }

    sendDates = allDatesArr.map((date: string) => {
      let dateF = new Date(date)
      return dateF.toISOString()
    })

    sendScheduledTasks()
    setStoredDates(params.dates)
  };

  const sendScheduledTasks = async () => {
    let scheduledTasksArr = []

    if (!selectedUser.isChild) {
      for (let i = 0; i < sendDates.length; i++) {
        let scheduledTaskUser = {
          Id: 0,
          UserId: selectedUser.id,
          SpaceId: selectedSpaceId,
          AssignedTaskId: task.id,
          DateCreated: sendDates[i],
          DateCompleted: "none",
          IsCompleted: false,
          IsDeleted: false,
          Repeat: 0
        }
        scheduledTasksArr.push(scheduledTaskUser)

      }

      let result = await AddUserAssignedTasks(scheduledTasksArr)
      if (result) {
        if (userData.id == selectedUser.id && !selectedUser.isChild && mySpace.id == defaultSpace.id) {
          let defaultCollection = await GetUserDefaultScheduleByUserId(selectedUser.id)
          if (defaultCollection.length != 0) {

            setDefaultSpace(defaultCollection)
          }

        }

        let spaceInfo = await GetCollectionDTOByCollectionID(mySpace.id)
        if (spaceInfo != null) {
          setMySpace(spaceInfo)

        }
      }

    }

    else {

      for (let i = 0; i < sendDates.length; i++) {
        let scheduledTaskUser = {
          Id: 0,
          ChildId: selectedUser.id,
          SpaceId: selectedSpaceId,
          AssignedTaskId: task.id,
          DateCreated: sendDates[i],
          DateCompleted: "none",
          IsCompleted: false,
          IsDeleted: false,
          Repeat: 0
        }
        scheduledTasksArr.push(scheduledTaskUser)

      }

      let result = await AddChildAssignedTasks(scheduledTasksArr)
      if (result) {
        let spaces = await GetCollectionByUsername(userData.username)
        if (spaces.length > 0) {
          setMySpaces(spaces)
        }
      }

    }

  }


  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: blueColor,
      accent: lightLilacColor,

    },
  }

  return (
    <>
      <View key={idx}>
        <TaskSpaceRowComponent idx={r + idx} onPress={() => displayTaskInfo()}>
          <View style={[styles.container, styles.flexrow]}>
            <Text style={[styles.text,]}>{task.task.name} {task.item.name}</Text>
            <View style={[styles.flexrow]}>
              {
                !isAdded ?
                  <FontAwesome5 name={'plus'} size={20} style={{ marginRight: 10, color: "#FFF" }} />
                  :
                  <FontAwesome5 name={'minus'} size={20} style={{ marginRight: 10, color: "#FFF" }} />
              }

              <Text style={[styles.text,]}>{task.task.coins} coins</Text>
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

          
          validRange={{
            startDate: new Date(),
            
          }}
        />

      </PaperProvider>
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
    color: "#FFF",
    fontWeight: 'bold',
    fontSize: 18
  },
  taskInfo: {
    fontSize: 20,
  },
  calendar: {
    width: "50%",
    height: "50%",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },



})


export default TaskRowTaskInfoComponent