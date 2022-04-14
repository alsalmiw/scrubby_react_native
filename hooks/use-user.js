import {useState} from "react"

export default function UseUser(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [savedUsername, setSavedUsername] = useState('username')
    const [savedPassword, setSavedPassword] = useState('password')
    const [isChildFree, setIsChildFree] = useState(true)
    const [userData, setUserData] = useState({
        id: 0,
        username: "",
        fullname: "",
        photo: "",
        points: 0, 
        coins: 0,
        isDeleted: false,
    })
    const [childData, setChildData] = useState({
        id: 0,
        userId: 0,
        dependantName: "",
        dependantAge: 0,
        dependantPhoto: "",
        dependantCoins: 0,
        dependantPoints: 0, 
        isDeleted: false,
    })
    const [mySpaces, setMySpaces] =useState({
        id: 0,
        collectionName: "",
        isDeleted: false,
        userId: 0,
    })

    const [myRooms, setMyRooms] = useState({
        id: 0,
        spaceNamne: "",
        spaceCategory: "",
        collectionId: 0,
    })

    return{username, setUsername, password, setPassword, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms}
}