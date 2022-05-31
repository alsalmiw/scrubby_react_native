import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import SettingsLinkComponent from '../../components/Settings/SettingsLinkComponent';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HeaderComponent from "../../components/HeaderComponent"
import RootStackParamList from '../../types/INavigation'
import { ThemeContext } from '../../context/ThemeContext';
import ChildFreeBoolComponent from '../../components/Settings/ChildFreeBoolComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalStorageInfo } from '../../services/localStorage'
import UserContext from '../../context/UserContext';
import AvatarComponent from '../../components/AvatarComponent';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
import UnderlinedHeaderComponent from '../../components/UnderlinedHeaderComponent';
import TaskRowHistoryComponent from '../../components/TaskRowHistoryComponent';
import { GetAllTasksHistoryForMembers } from '../../services/dataService';


type Props = NativeStackScreenProps<RootStackParamList, 'TasksHistory'>

const TasksHistoryScreen: FC<Props> = ({ navigation }) => {
  const { orangeColor, blueColor, fuchsiaColor, violetColor, greenColor, yellowColor, purpleColor, lilacColor } = useContext(ThemeContext)
  const { mySpaces, userData, childData, childrenData, acceptedInvitations, taskUser, setTaskUser, mySpace, setMySpace, selectedUser, setSelectedUser, seeAll, tasksHistory, setTasksHistory, current, setCurrent, isChildFree, sharedSpacesInfo } = useContext(UserContext)
  const [allMembers, setAllMembers] = useState([])
  const [historyDays, setHistoryDays] = useState<any[]>([])
  const [tasksList, setTasksList] = useState<any[]>([])

  useEffect(() => {
   
    handleCreateUsersList()


  }, [childrenData, acceptedInvitations, tasksHistory, sharedSpacesInfo])

  

  const GetTaskDates = () => {
    let today = new Date();
    var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var nextDay = new Date(+todayDate);

    let pastThirtyDays = [] as any
    pastThirtyDays.push(todayDate.toISOString())


    for (let i = 30; i >= 0; i--) {
      let endDate = nextDay.getDate() - 1;
      nextDay.setDate(endDate);
      pastThirtyDays.push(nextDay.toISOString());

    }

    setHistoryDays(pastThirtyDays)


    let filterdTasks = tasksHistory.filter((task: any) => pastThirtyDays.includes(task.dateScheduled))

    let sortedTasks = filterdTasks.sort((a: any, b: any) => a.dateScheduled > b.dateScheduled ? -11 : 1)
    setTasksList(sortedTasks)
    
  }

  const handleCreateUsersList = () => {
    let membersArr = [] as any
    let member = {
      id: userData.id,
      fullName: userData.name,
      photo: userData.photo,
      isChild: false,
      isInvited: false
    }
    membersArr.push(member)
    setSelectedUser(member)

    !isChildFree ?
      childrenData.length > 0 ?
        childrenData.map((child: any, idx: number) => {

          let kid = {
            id: child.id,
            fullName: child.dependentName,
            photo: child.dependentPhoto,
            isChild: true,
            isInvited: false

          }
          membersArr.push(kid)
        })
        : null
      : null
    acceptedInvitations.length > 0 ?
      acceptedInvitations.map((person: any, idx: number) => {
        sharedSpacesInfo.map((space: any, idx: number) => space.sharedWith.map((shared: any) => {
          let invited = [] as any;
          if (shared.invitedId == person.invitedId) {
            invited =
            {
              id: person.invitedId,
              fullName: person.invitedFullname,
              photo: person.invitedPhoto,
              isChild: false,
              isInvited: true

            }
            let foundmember = membersArr.some((member: any) => {
              if (member.id == invited.id && member.isChild == false) {
                return true
              }
            })
            if (!foundmember) {
              membersArr.push(invited)
            }
          }

        }
        ))
      })
      : null

    setAllMembers(membersArr)
    GetTaskDates()
    
  }




  let r = Math.floor(Math.random() * 7)
  const ShowMembers = (): any => {

    return (


      allMembers.map((member: any, idx: number) => {
        return (
          <Pressable key={idx} onPress={() => { setSelectedUser(member) }}>
            <AvatarComponent onPress={undefined} imageSource={member.photo} />
            <View style={[styles.fadedImage, { backgroundColor: "#FFF", opacity: selectedUser.id == member.id && selectedUser.isChild == member.isChild ? 0 : 0.5 }]} ></View>
          </Pressable>
        )
      }
      )

    )
  }

  return (

    <ScrollView style={styles.container}>
      <HeaderComponent title="Tasks History" />

      <View style={styles.underlineContainer}>
        {allMembers.length <= 3 ?
          <UnderlinedOneHeaderComponent titleFirst={'Select Member'} />
          :
          <UnderlinedHeaderComponent titleOne={'Select Member'} titleTwo={'see all'} titleThree={'see less'} />
        }

      </View>
      <View style={styles.selectMemberCon}>

        {

          seeAll ?

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              <ShowMembers />
            </ScrollView>

            :
            <View style={styles.selectMemberCon}>
              <ShowMembers />
            </View>

        }

      </View>

      <UnderlinedOneHeaderComponent titleFirst={'Last 30 days'} />


      <View style={styles.flexrow}>



      </View>

      {
        selectedUser != null ?
          tasksList.length != 0 ?

            tasksList.map((task: any, idx: number) => {
              return (
                task.memberId == selectedUser.id && task.isChild == selectedUser.isChild ?


                  <View key={idx}>
                    <TaskRowHistoryComponent r={r} key={idx} idx={idx} task={task} />
                    <View style={[{ display: current === idx ? "flex" : "none", padding: 10 }]}>
                      <Text style={[styles.taskInfo]}>Location: {task.taskSpace} </Text>
                      <Text style={[styles.taskInfo]}>Room: {task.taskRoom} </Text>
                      <Text style={[styles.taskInfo]}>Date Scheduled: {task.dateScheduled.slice(0, 10)}</Text>
                      <Text style={[styles.taskInfo]}>Date Completed: {task.isCompleted ? task.dateCompleted.slice(0, 10) : "not completed"}</Text>

                    </View>

                  </View>


                  : null
              )
            })

            : <Text style={{ padding: 10 }}>Loading .... or you have no Task History</Text>
          : null
      }

    </ScrollView>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  fadedImage: {
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 5,
    position: 'absolute'

  },
  underlineContainer: {

    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
  selectMemberCon: {
    flexDirection: 'row',
    flexWrap: "wrap",

  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  taskInfo: {
    fontSize: 20,
  }
});

export default TasksHistoryScreen