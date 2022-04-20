import {useState} from "react"

export default function UseUser(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [savedUsername, setSavedUsername] = useState('username')
    const [savedPassword, setSavedPassword] = useState('password')
    const [seeAll, setSeeAll] = useState(false)
    const [isChildFree, setIsChildFree] = useState(true)
    const [userData, setUserData] = useState([])
    const [childData, setChildData] = useState([])
    const [mySpaces, setMySpaces] =useState([])

    const [myRooms, setMyRooms] = useState({
        id: 0,
        spaceNamne: "",
        spaceCategory: "",
        collectionId: 0,
    })

    return{username, setUsername, password, setPassword, seeAll, setSeeAll, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms}
}