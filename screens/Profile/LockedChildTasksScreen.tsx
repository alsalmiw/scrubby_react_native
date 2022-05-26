// import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Pressable, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import UserContext from '../../context/UserContext';
import RootStackParamList from '../../types/INavigateProfile';
import AvatarComponent from '../../components/AvatarComponent';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';
////
import { FontAwesome5 } from '@expo/vector-icons';
import SquareColoredButton from '../../components/SquareColoredButton';
import iconsMap from '../../types/IconsMap';
import ChildLockModalComponent from '../../components/Modal/ChildLockModalComponent';
import { GetChildDefaultSchedule, GetDependantDTOByChildId, GetTasksByRoomId } from '../../services/dataService';
import TaskInfoModalComponent from '../../components/Modal/TaskInfoModalComponent';

import TaskSpaceRowComponent from '../../components/TaskSpaceRowComponent';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';


type Props = NativeStackScreenProps<RootStackParamList, 'LockedChildTasks'>

const ChildTasksScreen: FC<Props> = ({ navigation }) => {
    const { childPage, setChildPage, userData, rState, mySpace, setTasks, setMyRoom, modalVisible, setModalVisible, taskModal, setTaskModal, childRooms, childDefaultSpace, setChildDefaultSpace, selectedTask, setSelectedTask, runAgain, setRunAgain } = useContext(UserContext)
    const { yellowColor, secondaryTextColor } = useContext(ThemeContext)

    const [space, setSpace] = useState<String>("")
    const [location, setLocation] = useState<String>("")
    const [coin, setCoin] = useState<String>("")
    const [insturction, setInstruction] = useState<String>("")
    const [title, setTitle] = useState<String>("")
    // const [selectedTask, setSelectedTask]=useState<any[]>([])
    const [requestedApproval, setRequestedApproval] = useState<boolean>(false)


    const [childScheduleTasks, setChildScheduleTasks] = useState<any>([])

    const [childCoin, setChildCoin] = useState<any>("")
    const [childPoint, setChildPoint] = useState<any>("")


    const [childScheduleRooms, setChildScheduleRooms] = useState<any>()
    const [childScheduleRoomsNotCompleted, setChildScheduleRoomsNotCompleted] = useState<any>()
    const [childScheduleRoomsCompleted, setChildScheduleRoomsCompleted] = useState<any>()
    const [childSelectedRoom, setChildSelectedRoom] = useState<any>()




    let newArr = ['bed', 'bathroom', 'kitchen']
    let r = Math.floor(Math.random() * 7)


    const childTaskDate = () => {
        let today = new Date();
        var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var nextDay = new Date(+todayDate);

        let oneDays = [] as any
        oneDays.push(todayDate.toISOString())


        for (let i = 1; i < 1; i++) {
            let endDate = nextDay.getDate() + 1;
            nextDay.setDate(endDate);
            oneDays.push(nextDay.toISOString());

        }

        //need to re fetch child default space for new data to map room.

        let nextTasks = childDefaultSpace.rooms.map((room: any) => room.tasksAssigned.filter((task: any) => oneDays.includes(task.dateScheduled)))
        setChildScheduleTasks(nextTasks)

        let roomArr = [] as any;
        let taskArr = [] as any;
        childDefaultSpace.rooms.map((room: any) => {
            let tempArr = [] as any;
            let tempRoomArr = [] as any;
            room.tasksAssigned.map((task: any) => {
                if (oneDays.includes(task.dateScheduled)) {
                    tempArr.push(task);

                    if (tempRoomArr.length == 0) {
                        tempRoomArr.push(room);
                    }
                }
            });
            if (tempArr.length != 0) {
                taskArr.push(tempArr);
            }
            roomArr.push(...tempRoomArr);
        });
        let rooms = [] as any;
        roomArr.map((room: any, idx: number) => {
            rooms.push({ id: room.id, spaceName: room.spaceName, spaceCategory: room.spaceCategory, todaysTasks: taskArr[idx] });
        });

        let completedTask: any = []
        let notCompletedTask: any = []
        let newRooms = rooms.slice()
        console.log("==============================================================================================")
        console.log(newRooms)
        newRooms.map((x: any) => x.todaysTasks.map((need: any) => need.isCompleted ? completedTask.push(need) : notCompletedTask.push(need)))

        setChildScheduleRooms(rooms != null || rooms.length != 0 ? rooms : 0)
        setChildScheduleRoomsCompleted(completedTask != null || completedTask.length != 0 ? completedTask : 0)
        setChildScheduleRoomsNotCompleted(notCompletedTask != null || notCompletedTask.length != 0 ? notCompletedTask : 0)
        setChildSelectedRoom(rooms[0] != null || rooms[0] != 0 ? rooms[0] : 0)
        {
            rooms != 0 && rooms[0] != 0 ?
                setSpace(rooms[0].spaceName)
                : console.log('yess')
        }

        //setSpace(rooms[0].spaceName);
    }
    const getChildInformation = async (childId: number) => {
        let childInfo = await GetDependantDTOByChildId(childId)
        console.log("fetch", childInfo)
        setChildCoin(childInfo.dependentCoins)
        setChildPoint(childInfo.dependentPoints)
        setChildPage(childInfo)
        //setChildDefaultSpace(childInfo.scheduledTasks[1])
    }

    const childDefaultSchedule = () => {
        let childDefault = GetChildDefaultSchedule(childPage.id)
        //console.log(childDefault)
        setChildDefaultSpace(childDefault)
    }


    useEffect(() => {

        if (runAgain) childDefaultSchedule(), childTaskDate(), setRunAgain(false)
        else childDefaultSchedule(), childTaskDate()

    }, [runAgain])




    return (

        <View style={styles.container}>
            <View>
                <View>
                    <HeaderComponent title='My Tasks'></HeaderComponent>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.firstRow}>
                        <AvatarComponent onPress={() => console.log(childDefaultSpace)} imageSource={childPage.dependentPhoto} />
                    </View>


                    <View style={styles.nameAndCoinContainer}>
                        <View style={styles.childName}>
                            <Text style={{ fontSize: 20 }}>{childPage.dependentName}</Text>
                        </View>

                        <Text>{childPage.dependentAge} years old</Text>


                        <View style={styles.coinContainer}>
                            <CoinsPointsDisplayContainer coins={childCoin} points={childPoint} ></CoinsPointsDisplayContainer>
                        </View>


                    </View>
                    <View style={styles.unlockIconView}>
                        <Pressable onPress={() => setModalVisible(true)}>
                            <FontAwesome5 name="lock" size={40} color="grey" />
                        </Pressable>
                    </View>



                </View>

                <View style={styles.underLineView}>
                    <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
                    {childScheduleRooms != null ?
                        childScheduleRooms.map((room: any, x: number) => {
                            // missing logic to display task not completed and today and future task.

                            //fix space name and location
                            return (
                                room != null ?
                                    <View key={x} style={styles.sqrBtn}>
                                        <SquareColoredButton idx={x + rState + 1} onPress={() => { console.log(childScheduleRooms), console.log("=======================================================================++"), setChildSelectedRoom(room), setSpace(room.spaceName) }}>
                                            <View style={styles.sqrBtn}>
                                                <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
                                            </View>
                                            <View style={styles.sqrBtn}>
                                                <Text style={styles.sqrTxt}>{room.spaceCategory}</Text>
                                            </View>
                                        </SquareColoredButton>
                                    </View>
                                    : <Text>You Have No Rooms</Text>


                            )
                        })
                        
                        : null
                    }

                </ScrollView>

                <View style={styles.underLineView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Remaining Tasks'}></UnderlinedOneHeaderComponent>
                </View>
                <ScrollView style={styles.taskStyle}>

                    {
                        childSelectedRoom != null ?
                            childSelectedRoom.todaysTasks.map((taskName: any, x: number) => {
                                // setChildScheduleRoomsNotCompleted

                                return (
                                    !taskName.isCompleted ?
                                        <TaskSpaceRowComponent key={x} idx={x} onPress={() => { console.log("=======================================================================++"), console.log(taskName), setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name), setLocation(childDefaultSpace.collectionName), setRequestedApproval(!taskName.isRequestedApproval && !taskName.isCompleted ? true : false) }}>

                                            <View style={styles.centering}>
                                                <View>
                                                    <Text>Image</Text>
                                                </View>
                                                <View style={{ justifyContent: 'space-between' }}>
                                                    <View style={styles.centering}>
                                                        <Text style={{ color: 'white', fontSize: 20 }}>{taskName.task.name + " " + taskName.item.name}

                                                        </Text>
                                                    </View>
                                                    <View style={styles.centering}>
                                                        <Text style={[{ color: 'white', fontSize: 20 }]}> <FontAwesome5 name="coins" color='white' />  {taskName.task.coins}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                        </TaskSpaceRowComponent>
                                        :
                                        <Text>You Have No Task Today</Text>



                                )



                            })


                            :
                            null

                    }
                </ScrollView>

                <View style={styles.underLineView}>
                    <UnderlinedOneHeaderComponent titleFirst={'Completed Tasks '}></UnderlinedOneHeaderComponent>
                </View>
                <ScrollView style={styles.taskStyle}>

                    {
                        childSelectedRoom != null ?
                            childSelectedRoom.todaysTasks.map((taskName: any, x: number) => {

                                // !taskName.isCompleted
                                return (
                                    taskName.isCompleted ?
                                        <TaskSpaceRowComponent key={x} idx={x + 1} onPress={() => { console.log("=======================================================================++"), console.log(taskName.isCompleted), setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name), setLocation(childDefaultSpace.collectionName), setRequestedApproval(!taskName.isRequestedApproval && !taskName.isCompleted ? true : false) }}>

                                            <View style={styles.centering}>
                                                <View>
                                                    <Text>Image</Text>
                                                </View>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <View style={{ justifyContent: 'center' }}>
                                                        <Text style={{ color: 'white', fontSize: 20 }}>{taskName.task.name + " " + taskName.item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.centering}>
                                                        <Text style={[{ color: 'white', fontSize: 20 }]}> <FontAwesome5 name="coins" color='white' />  {taskName.task.coins}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TaskSpaceRowComponent>
                                        :
                                        <Text>You Have No Completed Task Today</Text>
                                )


                            })
                            :
                            null
                        // {Alert.alert("Error", 'You have no Task', [{ text: "Ok", style: "cancel" }])}
                    }
                </ScrollView>

                {modalVisible === true ?
                    <ChildLockModalComponent /> : taskModal === true ?
                        <TaskInfoModalComponent Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} isButton={requestedApproval} childInfo={undefined} userInfo={undefined} />
                        : null}



            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight
    },
    coinContainer: {
        marginTop: '6%',
        alignItems: 'center',
        width: '100%'
    },
    nameAndCoinContainer: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        paddingLeft: 0,
        marginLeft: 0

    },
    firstRow: {
        marginVertical: '0%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSize: {
        width: 50, height: 50
    },
    underLineView: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    unlockIconView: {
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingRight: 10,
        marginTop: 10,
        height: 100
    },
    myRoomScrollView: {
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
        marginTop: "2%",
        marginBottom: "2%"
    },
    childName: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    sqrBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    taskStyle: {
        paddingLeft: "2.5%",
        marginTop: 5,
        marginBottom: 5
    },
    sqrTxt: {
        color: 'white',
        flexShrink: 1,
        fontSize: 13
    },
    centering: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default ChildTasksScreen