import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, Image } from "react-native";
import AvatarComponent from "../../components/AvatarComponent";
import HeaderComponent from "../../components/HeaderComponent";
import ChildLockModalComponent from "../../components/Modal/ChildLockModalComponent";
import CoinsPointsDisplayContainer from "../../components/Profile/CoinsPointsDisplayContainer";
import UnderlinedOneHeaderComponent from "../../components/UnderlinedOneHeaderComponent";
import UserContext from "../../context/UserContext";
import RootStackParamList from "../../types/INavigateProfile";

import { FontAwesome5 } from '@expo/vector-icons';
import UnderlinedHeaderComponent from "../../components/UnderlinedHeaderComponent";
import SquareColoredButton from "../../components/SquareColoredButton";

import iconsMap from '../../types/IconsMap';
import TaskSpaceRowComponent from "../../components/TaskSpaceRowComponent";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskInfoModalComponent from "../../components/Modal/TaskInfoModalComponent";
//

type Props = NativeStackScreenProps<RootStackParamList, 'LockedChildTasks'>



const LockChildTasksScreen: FC<Props> = ({ navigation }) => {

    const { userData, childPage, setModalVisible, childRooms, setChildRooms, rState, childDefaultSpace, setTaskModal, taskModal, modalVisible, selectedTask, setSelectedTask } = useContext(UserContext);

    const [lockedChildScheduleRooms, setLockedChildScheduleRooms] = useState<any>()
    const [lockedChildScheduleTasks, setLockedChildScheduleTasks] = useState<any>()
    const [lockedChildSelectedRoom, setLockedChildSelectedRoom] = useState<any>()

    const [space, setSpace] = useState<String>("")
    const [location, setLocation] = useState<String>("")
    const [coin, setCoin] = useState<String>("")
    const [insturction, setInstruction] = useState<String>("")
    const [title, setTitle] = useState<String>("")
    //const [selectedTask, setSelectedTask] = useState() as any
    const [requestedApproval, setRequestedApproval] = useState<boolean>(false)



    const childTaskDate = () => {
        let today = new Date();
        var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var nextDay = new Date(+todayDate);

        let oneDay = [] as any
        oneDay.push(todayDate.toISOString())


        for (let i = 1; i < 1; i++) {
            let endDate = nextDay.getDate() + 1;
            nextDay.setDate(endDate);
            oneDay.push(nextDay.toISOString());

        }
        // console.log(oneDay)

        //need to re fetch child default space for new data to map room.

        let nextTasks = childDefaultSpace.rooms.map((room: any) => room.tasksAssigned.filter((task: any) => oneDay.includes(task.dateScheduled)))
        setLockedChildScheduleTasks(nextTasks)

        let roomArr = [] as any;
        let taskArr = [] as any;
        childDefaultSpace.rooms.map((room: any) => {
            let tempArr = [] as any;
            let tempRoomArr = [] as any;
            room.tasksAssigned.map((task: any) => {
                if (oneDay.includes(task.dateScheduled)) {
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
        setLockedChildScheduleRooms(rooms != null || rooms.length != 0 ? rooms : 0)
        setLockedChildSelectedRoom(rooms[0] != null || rooms[0] != 0 ? rooms[0] : 0)
        {
            rooms != 0 && rooms[0] != 0 ?
                setSpace(rooms[0].spaceName)
                : console.log('Nooo')
        }

    }
    useEffect(() => {
        // console.log(childPage)

        childTaskDate();
        console.log("Mod",modalVisible)
        console.log("tm",taskModal)


        // setTaskModal(false)

    }, [])






    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderComponent title='My Tasks Locked'></HeaderComponent>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.firstRow}>
                        <AvatarComponent onPress={() =>  console.log(lockedChildSelectedRoom.todaysTasks) } imageSource={childPage.dependentPhoto} />
                    </View>


                    <View style={styles.nameAndCoinContainer}>
                        <View style={styles.childName}>
                            <Text style={{ fontSize: 20 }}>{childPage.dependentName}</Text>
                        </View>

                        <Text>{childPage.dependentAge} years old</Text>


                        <View style={styles.coinContainer}>
                            <CoinsPointsDisplayContainer coins={childPage.dependentCoins} points={childPage.dependentPoints} ></CoinsPointsDisplayContainer>
                        </View>


                    </View>
                    <View style={styles.lockStyle}>
                        <Pressable onPress={() =>  setModalVisible(true) }>
                            <FontAwesome5 name="lock" size={40} color="grey" />
                        </Pressable>
                        <ChildLockModalComponent />
                    </View>



                </View>

                <View style={styles.underLineStyle}>
                    <UnderlinedOneHeaderComponent titleFirst={"My Rooms"} ></UnderlinedOneHeaderComponent>

                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.myRoomScrollView}>
                    {lockedChildScheduleRooms != null ?
                        lockedChildScheduleRooms.map((room: any, x: number) => {
                            // missing logic to display task not completed and today and future task.

                            //fix space name and location
                            return (
                                <View key={x} style={styles.sqrBtn}>
                                    <SquareColoredButton idx={x + rState + 1} onPress={() => { console.log("=======================================================================++"), console.log(lockedChildScheduleRooms.length), console.log("=======================================================================++"), setLockedChildSelectedRoom(room), setSpace(room.spaceName) }}>
                                        <View style={styles.sqrBtn}>
                                            <Image style={styles.buttonSize} source={iconsMap.get(room.spaceCategory)} />
                                        </View>
                                        <View style={styles.sqrBtn}>
                                            <Text style={styles.sqrTxt}>{room.spaceCategory}</Text>
                                        </View>
                                    </SquareColoredButton>
                                </View>


                            )
                        })
                        // does not display even if they have nothing 
                        : <Text>You Have No Rooms</Text>
                    }

                </ScrollView>

                <View style={styles.underLineStyle}>
                    <UnderlinedOneHeaderComponent titleFirst={'Remaining Tasks'}></UnderlinedOneHeaderComponent>

                </View>
                <ScrollView style={styles.taskStyle}>

                    {
                        lockedChildSelectedRoom != null ?
                            lockedChildSelectedRoom.todaysTasks.map((taskName: any, x: number) => {


                                return (
                                    <View key={x}>
                                        <TaskSpaceRowComponent key={x} idx={x} onPress={() => { console.log("=======================================================================++"), console.log(taskName), setTaskModal(true), setSelectedTask(taskName), setCoin(taskName.task.coins), setInstruction(taskName.task.description), setTitle(taskName.task.name + " " + taskName.item.name),  setLocation(childDefaultSpace.collectionName), setRequestedApproval(taskName.isRequestedApproval && !taskName.isCompleted?true:false)  }}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'white', fontSize: 20 }}>{taskName.task.name + " " + taskName.item.name}
                                                </Text>
                                            </View>

                                        </TaskSpaceRowComponent>
                                        {modalVisible == true ?
                                            <ChildLockModalComponent /> : 
                                                <TaskInfoModalComponent Space={space} Location={location} task={taskName} isChild={true} taskedInfo={childPage} isButton={requestedApproval} />
                                               }

                                    </View>



                                )
                            })
                            :
                            <Text>You Have No Task Today</Text>
                    }
                </ScrollView>
                <View style={styles.underLineStyle}>
                    <UnderlinedOneHeaderComponent titleFirst={'Completed Tasks'}></UnderlinedOneHeaderComponent>
                </View>

                {/* {
               !taskModal == true ?
                <ChildLockModalComponent />
                : 
                <TaskInfoModalComponent Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} isButton={requestedApproval} />
                        } */}

                {/* {modalVisible === true ?
          <ChildLockModalComponent /> : taskModal === true ?
            <TaskInfoModalComponent  Space={space} Location={location} task={selectedTask} isChild={true} taskedInfo={childPage} isButton={requestedApproval}/>
            : null} */}
            </View>

        </View>

    )
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
    underLineStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    myRoomScrollView: {
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
        marginTop: "2%",
        marginBottom: "2%"
    },
    sqrBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lockStyle: {
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingRight: 10,
        marginTop: 10,
        height: 100
    },
    sqrTxt: {
        color: 'white',
        flexShrink: 1,
        fontSize: 13
    },
    childName: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    taskStyle: {
        paddingLeft: "2.5%",
        marginTop: 5,
        marginBottom: 5
    },
});

export default LockChildTasksScreen;