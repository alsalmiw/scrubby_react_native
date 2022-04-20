import {useState} from "react"

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
    const [userData, setUserData] = useState([])
    const [childData, setChildData] = useState([])
    const [mySpaces, setMySpaces] =useState([])
    const [newSpace, setNewSpace] = useState<newSpace[]>([]);
    const [myRooms, setMyRooms] = useState<myRooms[]>([])

    return{username, newSpace, setNewSpace, setUsername, password, setPassword, seeAll, setSeeAll, savedUsername, setSavedUsername, savedPassword, setSavedPassword, isChildFree, setIsChildFree,  userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms}
}