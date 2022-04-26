import {useState} from "react"
import { ISpace } from "../Interfaces/ISpace"
import IUserData from "../Interfaces/IUserData"

export default function UseUser(){

    interface newSpace {
        collectionName: string,
        id: number,
        isDeleted: boolean,
        userId: number
    }
    interface myRooms{
        id: number,
        spaceName: string,
        spaceCategory: string,
        collectionId: number,
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [savedUsername, setSavedUsername] = useState('username')
    const [savedPassword, setSavedPassword] = useState('password')
    const [seeAll, setSeeAll] = useState(false)
    const [isChildFree, setIsChildFree] = useState(true)
    const [userData, setUserData] = useState<IUserData[]>([])
    const [childData, setChildData] = useState([])
    const [mySpaces, setMySpaces] =useState<newSpace[]>([])
    const [mySpace, setMySpace] =useState([])
    const [newSpace, setNewSpace] = useState<ISpace[]>([]);
    // const [myRooms, setMyRooms] = useState<myRooms[]>([])
    const [task, setTask] = useState([]);
    const [allTask, setAllTask] = useState([])
    const [addTask, setAddTask] = useState([])

    const [myRooms, setMyRooms] = useState({
        id: 0,
        spaceNamne: "",
        spaceCategory: "",
        collectionId: 0,
    })

    return{username, setUsername, password, setPassword, seeAll, setSeeAll, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms, task, setTask, allTask, setAllTask, addTask, setAddTask}
}