import {useState} from "react"
import { ISpace } from "../Interfaces/ISpace"
import IUserData from "../Interfaces/IUserData"
import IChild from "../Interfaces/IChild"
import ITask from "../Interfaces/ITask"
import IScoreBoard from "../Interfaces/IScoreBoard"

export default function UseUser(){

    interface newSpace {
        collectionName: string,
        id: number,
        isDeleted: boolean,
        userId: number
    }
    interface IRoom{
        id: number,
        spaceName: string,
        spaceCategory: string,
        collectionId: number,
    }
   interface ISelectedUser {
       id: number,
       fullName: string,
       isChild:boolean
   }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [savedUsername, setSavedUsername] = useState('username')
    const [savedPassword, setSavedPassword] = useState('password')
    const [seeAll, setSeeAll] = useState(false)
    const [isChildFree, setIsChildFree] = useState(false)
    const [isChild, setIsChild] = useState(false)
    const [userData, setUserData] = useState<IUserData[]>([])
    const [fullUserInfo, setFullUserInfo] = useState([])
    const [childData, setChildData] = useState<IChild[]>([])
    const [childrenData, setChildrenData] = useState<IChild[]>([])
    const [mySpaces, setMySpaces] =useState<newSpace[]>([])
    const [mySpace, setMySpace] =useState<ISpace[]>([])
    const [newSpace, setNewSpace] = useState<ISpace[]>([]);
    const [inviters, setInviters] = useState<any>([])
    const [invited, setInvited] = useState<any>([])
    const [acceptedInvitations, setAcceptedInvitations] = useState<any>([]);
    // const [myRooms, setMyRooms] = useState<myRooms[]>([])
    const [task, setTask] = useState([]);
    const [allTask, setAllTask] = useState([])
    const [addTask, setAddTask] = useState([])
    const [taskUser, setTaskUser] = useState<any>([])
    const [rState, setRState] = useState(Math.floor(Math.random() * 7));
    const [usersAddedTasks, setUsersAddedTasks] = useState([])

    const [myRooms, setMyRooms] = useState<IRoom[]>([])
    const [tasksAPI, setTasksAPI] = useState([])
    const [myRoom, setMyRoom] = useState<IRoom>()
    const [roomTasks, setRoomTasks]=useState<ITask[]>([]);
    const [scoreBoardList, setScoreBoardList]=useState<IScoreBoard[]>([]);
    const [refresh, setRefresh] = useState<boolean>()
    const [selectedUser, setSelectedUser] = useState<ISelectedUser>()
    const [modalVisible, setModalVisible] = useState(false);
    const [scheduleTask, setScheduleTask]= useState()
   
    // return{username, setUsername, password, setPassword, seeAll, setSeeAll, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms, task, setTask, allTask, setAllTask, addTask, setAddTask, mySpace, setMySpace, rState, setRState, allRequestName, setAllRequestName, allInvites, setAllInvites, setChildrenData, childrenData, setNewSpace, usersAddedTasks, setUsersAddedTasks, myRoom, setMyRoom, tasksAPI, setTasksAPI, roomTasks, setRoomTasks, fullUserInfo, setFullUserInfo, scoreBoardList, setScoreBoardList}


   
    return{username, setUsername, password, setPassword, seeAll, setSeeAll, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms, task, setTask, allTask, setAllTask, addTask, setAddTask, mySpace, setMySpace, rState, setRState, invited, setInvited, inviters, setInviters, setChildrenData, childrenData, setNewSpace, usersAddedTasks, setUsersAddedTasks, myRoom, setMyRoom, tasksAPI, setTasksAPI, roomTasks, setRoomTasks, fullUserInfo, setFullUserInfo, refresh, setRefresh, scoreBoardList, setScoreBoardList, acceptedInvitations, setAcceptedInvitations, taskUser, setTaskUser, isChild, setIsChild, selectedUser, setSelectedUser, modalVisible, setModalVisible, scheduleTask, setScheduleTask}

    
}