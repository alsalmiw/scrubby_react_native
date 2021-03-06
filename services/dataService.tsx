import INewUser from '../Interfaces/INewUser';
import IUserLogin from '../Interfaces/IUserLogin'
import INewName from '../Interfaces/INewName'
import ISelectedTask from '../Interfaces/ISelectedTask';
import IRoom from '../Interfaces/IRoom';
import { ISpace } from '../Interfaces/ISpace';
import IChild from '../Interfaces/IChild';
import IInviteUser from '../Interfaces/IInviteUser';

let link = "https://scrubbyapi.azurewebsites.net"

async function UserLogin(userData:IUserLogin){
    let res= await fetch(`${link}/User/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    let data = await res.json();
    console.log(data)
   return data;
   
}

async function CreateAccount(newUser:INewUser){
    let res= await fetch(`${link}/User/AddUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
   return data;
}


async function UpdateName(newName: INewName) {
    let res= await fetch(`${link}/User/UpdateName`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
        body: JSON.stringify(newName)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
   return data;
}

async function UpdatePassword(newPassword: IUserLogin) {
    let res= await fetch(`${link}/User/UpdatePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
        body: JSON.stringify(newPassword)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
   return data;
}

async function AddNewRoom(room: IRoom) {
    let res= await fetch(`${link}/spaceInfo/AddNewSpace`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
        body: JSON.stringify(room)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
   return data;
}
async function AddChild(child: IChild) {
    let res= await fetch(`${link}/Dependent/AddDependent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
        body: JSON.stringify(child)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
   return data;
}

async function AddNewSpace(space: ISpace) {
    let res= await fetch(`${link}/SpaceCollection/CreateSpaceCollection`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
        body: JSON.stringify(space)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
   return data;
}

async function DeleteUser(id:number) {
    let res= await fetch(`${link}/User/UpdateUserInfo/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
}

async function ChildFreeSwitch(id:number) {
    let res= await fetch(`${link}/User/ChildFreeBool/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
    return data;
}

async function GetSpaceCollectionByUserId(UserId: number) {
    let res = await fetch(`${link}/SpaceCollection/GetSpaceCollectionByUserId/${UserId}`);
    let data = await res.json();
    return data;
}

async function GetUserByUsername(Username:string) {
    let res = await fetch(`${link}/User/GetUserPublicInfoByUserName/${Username}`);
    let data = await res.json();
    return data;
}

async function GetDependantByUserId (Id: number){
let res = await fetch(`${link}/Dependent/GetDependantByUserId/${Id}`);
let data = await res.json();
return data;
}

async function GetSpacesByCollectionID (Id: number){
    let res = await fetch(`${link}/SpaceInfo/GetSpacesByCollectionID/${Id}`);
    let data = await res.json();
    return data;
    }

async function GetAllSpaceItems(){
    let res = await fetch(`${link}/SpaceItemsStaticAPI/GetAllSpaceItemsStaticAPI`);
    let data = await res.json();
    return data;
}


async function AddSelectedTask(newSelectedTask: any) {
    
    let res= await fetch(`${link}/SelectedTask/AddSelectedTask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSelectedTask)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data = await res.json();
    console.log(data)
}

async function AllInvitesByInvitedUsername(username:string){
    let res = await fetch(`${link}/InviteUsers/AllInvitesByInvitedUsername/${username}`);
    let data = await res.json();
    return data;
}



async function InviteUser(newUser: IInviteUser) {
    let res= await fetch(`${link}/InviteUsers/InviteUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data:boolean = await res.json();
    console.log(data)
    return data;
   
}

async function GetAllInvitesByID(userId:string){
    let res = await fetch(`${link}/InviteUsers/AllInvitesByID/${userId}`)
    let data = await res.json();
    return data;
}
async function GetAllRequest(userName:string){
    let res = await fetch(`${link}/InviteUsers/GetAllUserInfoInviteRequests/${userName}`)
    let data = await res.json();
    return data
}

async function AcceptInvite(userId:number, invitedUsername:string){
    let res= await fetch(`${link}/InviteUsers/AcceptInvite/${userId}/${invitedUsername}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //
        body: JSON.stringify({})
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data:boolean = await res.json();
    console.log(data)
    return data;
}





export {UserLogin, CreateAccount, UpdateName, DeleteUser, AddNewRoom, UpdatePassword, AddChild, GetSpaceCollectionByUserId, GetUserByUsername, GetDependantByUserId, GetAllSpaceItems, AddSelectedTask, AllInvitesByInvitedUsername, InviteUser,  GetSpacesByCollectionID, AddNewSpace, GetAllInvitesByID, GetAllRequest, AcceptInvite, ChildFreeSwitch }



