import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Image, Pressable, Alert } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';

import UserContext from '../../context/UserContext';
import RootStackParamList from '../../types/INavigateProfile';
import AvatarComponent from '../../components/AvatarComponent';
import CoinsPointsDisplayContainer from '../../components/Profile/CoinsPointsDisplayContainer';
import UnderlinedOneHeaderComponent from '../../components/UnderlinedOneHeaderComponent';

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
import IchildCoinAndPoint from '../../Interfaces/IchildCoinAndPoint';
import UserNameComponent from '../../components/UserNameComponent';


type Props = NativeStackScreenProps<RootStackParamList, 'LockedChildTasks'>

const ChildTasksScreen: FC<Props> = ({ navigation }) => {
    const { childPage, setChildPage, userData, rState, mySpace, setTasks, setMyRoom, modalVisible, setModalVisible, taskModal, setTaskModal, childRooms, childDefaultSpace, setChildDefaultSpace, selectedTask, setSelectedTask, runAgain, setRunAgain, childPoints, setChildPoints, childCoins, setChildCoins, refreshChildTask, setRefreshChildTask } = useContext(UserContext)
    const { yellowColor, secondaryTextColor, primaryTextColor } = useContext(ThemeContext)

    const [space, setSpace] = useState<String>("")
    const [location, setLocation] = useState<String>("")
    const [coin, setCoin] = useState<String>("")
    const [insturction, setInstruction] = useState<String>("")
    const [title, setTitle] = useState<String>("")

    const [requestedApproval, setRequestedApproval] = useState<boolean>(false)


    const [childScheduleTasks, setChildScheduleTasks] = useState<any>([])

    const [childCoin, setChildCoin] = useState<any>("")
    const [childPoint, setChildPoint] = useState<any>("")

    const [childScheduleRooms, setChildScheduleRooms] = useState<any>()

    const [childSelectedRoom, setChildSelectedRoom] = useState<any>()

    const [childUpdateCoins, setChildUpdateCoins] = useState<IchildCoinAndPoint>()


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

        setChildScheduleRooms(rooms != null || rooms.length != 0 ? rooms : 0)
        setChildSelectedRoom(rooms[0] != null || rooms[0] != 0 ? rooms[0] : 0)
        {
            rooms != 0 && rooms[0] != 0 ?
                setSpace(rooms[0].spaceName)
                : null

        }
    }

    useEffect(() => {

        childTaskDate()
        if (runAgain) {
            childTaskDate()
            setRunAgain(false)
        }

    }, [runAgain])

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderComponent title='My Tasks' ></HeaderComponent>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.firstRow}>
                        <AvatarComponent onPress={undefined} imageSource={childPage.dependentPhoto} />
                    </View>


                    <View style={styles.nameAndCoinContainer}>
                        <View style={styles.childName}>
                            <UserNameComponent name={childPage.dependentName} />
                        </View>

                        <Text style={{ color: primaryTextColor }}>{childPage.dependentAge} years old</Text>

                        <View style={styles.coinContainer}>
                            <CoinsPointsDisplayContainer coins={childCoins} points={childPoints} ></CoinsPointsDisplayContainer>
                        </View>

                    </View>
                    <View style={styles.unlockIconView}>
                        <Pressable onPress={() => setModalVisible(true)}>
                            <FontAwesome5 name="lock" size={40} color="grey" />
                        </Pressable>
                    </View>

                </View>
                <View>
                    <Text style={[styles.mainHeader, { color: secondaryTextColor }]}>{childDefaultSpace.collectionName}</Text>
                </View>
                {
                    childSelectedRoom != null ?
                        <View style={styles.underLineView}>
                            <UnderlinedOneHeaderComponent titleFirst={'My Rooms'}></UnderlinedOneHeaderComponent>
                        </View>

                        : null
                }

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
                    {childScheduleRooms != null ?
                        childScheduleRooms.map((room: any, x: number) => {
                            
                            return (
                                room != null ?
                                    <View key={x} style={styles.sqrBtn}>
                                        <SquareColoredButton idx={x + rState + 1} onPress={() => { setChildSelectedRoom(room), setSpace(room.spaceName) }}>
                                            <View style={styles.sqrBtn}>
                                                <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
                                            </View>
                                            <View style={styles.sqrBtn}>
                                                <Text style={styles.sqrTxt}>{room.spaceCategory}</Text>
                                            </View>
                                        </SquareColoredButton>
                                    </View>
                                    : null
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
                                

                                return (
                                    !taskName.isCompleted ?
                                        <TaskSpaceRowComponent key={x} idx={x} onPress={() => {
                                            setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name), setLocation(childDefaultSpace.collectionName), setRequestedApproval(!taskName.isRequestedApproval && !taskName.isCompleted ? true : false)

                                            {
                                                let childInfoCoin: IchildCoinAndPoint = {
                                                    Id: childPage.id,
                                                    DependentCoins: taskName.task.coins,
                                                    DependentPoints: taskName.task.coins
                                                }
                                                setChildUpdateCoins(childInfoCoin)
                                            }
                                        }}>

                                            <View style={[{ flexDirection: 'row' }]}>


                                                <View style={[{ width: '85%', }]}>
                                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{taskName.task.name + " " + taskName.item.name}

                                                    </Text>
                                                </View>
                                                <View style={[{ width: '15%', justifyContent: 'flex-end' }]}>
                                                    {
                                                        taskName.isRequestedApproval && !taskName.isCompleted ?
                                                            <Ionicons name="time-sharp" size={30} color="#FFF" />

                                                            :

                                                            <Text style={[{ color: 'white', fontSize: 18, fontWeight: 'bold' }]}>
                                                                <FontAwesome5 name="coins" color='white' />  {taskName.task.coins}</Text>
                                                    }

                                                </View>

                                            </View>

                                        </TaskSpaceRowComponent>
                                        :
                                        x < 1 && x === 0 ? <Text key={x} style={[{ color: primaryTextColor }]}>You Have No Task Today</Text> : null
                                )
                            })
                            :
                            <Text style={[{ color: primaryTextColor }]}> You have no tasks today</Text>

                    }
                </ScrollView>
                {
                    childSelectedRoom != null ?
                        <View style={styles.underLineView}>
                            <UnderlinedOneHeaderComponent titleFirst={'Completed Tasks '}></UnderlinedOneHeaderComponent>
                        </View>
                        : null
                }
                <ScrollView style={styles.taskStyle}>

                    {
                        childSelectedRoom != null ?
                            childSelectedRoom.todaysTasks.map((taskName: any, x: number) => {

                                
                                return (
                                    taskName.isCompleted ?
                                        <TaskSpaceRowComponent key={x + 1} idx={x + 1} onPress={() => { setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name), setLocation(childDefaultSpace.collectionName), setRequestedApproval(!taskName.isRequestedApproval && !taskName.isCompleted ? true : false) }}>

                                            <View style={styles.centering}>

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
                                        x < 1 && x === 0 ? <Text key={x} style={[{ color: primaryTextColor }]}>You Have No Completed Task Today</Text> : null
                                )


                            })
                            :
                            null
                        
                    }
                </ScrollView>

                {modalVisible === true ?
                    <ChildLockModalComponent /> : taskModal === true ?
                        <TaskInfoModalComponent Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} isButton={requestedApproval} childInfo={childUpdateCoins} />
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
    },
    mainHeader: {
        fontSize: 25,
        fontWeight: "bold",
        padding: 10
    },
});

export default ChildTasksScreen