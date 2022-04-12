import {useState} from "react"

export default function UseUser(){

    const [username, setUsername] = useState('')
    const [userData, setUserData] = useState({
        id: number,
        username: string,
        fullname: string,
        photo: string,
        points: number, 
        coins: number,
        isDeleted: boolean,
    })
    const [childData, setChildData] = useState({
        id: number,
        userId: number,
        dependantName: string,
        dependantAge: number,
        dependantPhoto: string,
        dependantCoins: number,
        dependantPoints: number, 
        isDeleted: boolean,
    })
    const [mySpaces, setMySpaces] =useState({
        id: number,
        collectionName: string,
        isDeleted: boolean,
        userId: number,
    })

    const [myRooms, setMyRooms] = useState({
        id: number,
        spaceNamne: string,
        spaceCategory: string,
        collectionId: number,
    })

    return{username, setUsername, userData, setUserData, childData, setChildData, mySpaces, setMySpaces, myRooms, setMyRooms}
}