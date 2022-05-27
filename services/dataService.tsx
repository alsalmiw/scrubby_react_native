import INewUser from '../Interfaces/INewUser';
import IUserLogin from '../Interfaces/IUserLogin'
import INewName from '../Interfaces/INewName'
import ISelectedTask from '../Interfaces/ISelectedTask';
import IRoom from '../Interfaces/IRoom';
import { ISpace } from '../Interfaces/ISpace';
import IChild from '../Interfaces/IChild';
import IInviteUser from '../Interfaces/IInviteUser';
import IUserData from '../Interfaces/IUserData';
import IRedeemCoins from '../Interfaces/IRedeemCoins';
import IRedeemCoinsChild from '../Interfaces/IRedeemChildCoins';
import ISharedSpace from '../Interfaces/ISharedSpace';
import IChildPassCode from '../Interfaces/IChildPassCode';
import IAddAvatar from '../Interfaces/IAddAvatar';
import IDefaultSpace from '../Interfaces/IDefaultSpace';
import IDefaultSpaceChild from '../Interfaces/IDefaultSpaceChild';
import IchildCoinAndPoint from '../Interfaces/IchildCoinAndPoint';


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

async function DeleteInvitation(inviteId:number){
    let res = await fetch(`${link}/InviteUsers/DeleteInvitation/${inviteId}`);
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

async function RedeemCoinsUser(newAmount:any) {
    let res= await fetch(`${link}/User/NewCoinAmount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAmount)
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

async function RedeemCoinsChild(newAmount:any) {
    let res= await fetch(`${link}/Dependent/NewCoinAmount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAmount)
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


async function GetInvitationByUsername(username:string){
    let res = await fetch(`${link}/InviteUsers/GetInvitationsByUsername/${username}`)
    let data = await res.json();
    console.log(data)
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

async function GetSelectedTasksByUserID(Id:number){
    let res = await fetch(`${link}/SelectedTask/GetSelectedTaskByUserId/${Id}`)
    let data = await res.json();
    return data
}

async function GetAllTasks(){
    let res = await fetch(`${link}/TasksInfoStaticAPI/GetAllTasks`)
    let data = await res.json();
    return data
}

async function DeleteInvite(userId:number, invitedUsername:string){
    let res= await fetch(`${link}/InviteUsers/DeleteInvite/${userId}/${invitedUsername}`, {
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
    console.log('This is inside data service')
    console.log(data)
    return data;
}
async function GetUserData(username:string){
    let res = await fetch(`${link}/User/GetUserData/${username}`)
    let data = await res.json();
    return data
}

async function GetTasksByRoomId(roomId:number){
    let res = await fetch(`${link}/SelectedTask/GetTasksBySpaceId/${roomId}`)
    let data = await res.json();
    return data
}



async function GetUserDefaultSchedule(username:string){
    let res = await fetch(`${link}/DefaultCollection/UserDefaultSchedule/${username}`)
    // let data = await res.json();
    // return data
    let data = []
    if(res.status === 200)
    {
        data= await res.json();
    }
    return data;
}



async function GetChildDefaultSchedule(childId:number){
    let res = await fetch(`${link}/DefaultCollectionDependent/ChildDefaultSchedule/${childId}`)
    // let data = await res.json();
    // return data
    console.log(res.status)
    let data = []
    if(res.status === 200)
    {
        data= await res.json();
    }
    return data;
}



async function CreateSharedSpaces(sharedSpace: ISharedSpace) {
    let res= await fetch(`${link}/SharedSpaces/CreateSharedSpaces`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
        body: JSON.stringify(sharedSpace)
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

async function DeleteSharedSpacesById(sharedSpace: any) {

    let res= await fetch(`${link}/SharedSpaces/DeleteSharedSpacesById/${sharedSpace.id}`, {
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
    return data;
    
}

async function GetSharedSpacesByUserId(id:number) {
    let res = await fetch(`${link}/SharedSpaces/GetSharedSpacesByUserId/${id}`)
    let data = await res.json();
    return data
}

async function GetSharedSpacesById(id:number){
    let res = await fetch(`${link}/SharedSpaces/GetSharedSpacesById/${id}`)
    let data = await res.json();
    return data
}

async function GetDependantDTOByChildId(childId:number){
    let res = await fetch(`${link}/Dependent/GetDependantDTOByChildId/${childId}`)
    let data = await res.json();
    return data
}


async function GetAllTasksHistoryForMembers(userId:number){
    let res = await fetch(`${link}/SpaceCollection/GetAllTasksHistoryForMembers/${userId}`)
    let data = []
    if(res.status === 200)
    {
        data= await res.json();
    }
    return data;
}


async function UpdateUserTaskToCompleted(taskId:number){
    let res = await fetch(`${link}/AssignedTasksUsers/UpdateUserTaskToCompleted/${taskId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})

    })
    let data = await res.json();
    return data;
}
async function GetSharedSpacesByInvitedAndInviterUsername(invited:string, inviter:string) {
    let res = await fetch(`${link}/SharedSpaces/GetSharedSpacesByInvitedAndInviterUsername/${invited}/${inviter}`)
    let data = await res.json();
    return data
}

async function SubmitTaskChildApproval(taskId:number){
    let res = await fetch(`${link}/AssignedTasksChild/SubmitTaskChildApproval/${taskId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    })
    let data = await res.json();
    return data
}


async function ApproveTaskForCompletionChild(taskId:number){
    let res = await fetch(`${link}/AssignedTasksChild/ApproveTaskForCompletionChild/${taskId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    })
    let data = await res.json();
    return data
}


//add post for new coin amount
async function NewCoinAmountDependent(Dependent:IRedeemCoinsChild)
{
    let res= await fetch(`${link}/Dependent/NewCoinAmount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //
        body: JSON.stringify(Dependent)
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

async function NewCoinAmountNotDependent(User:IRedeemCoins)
{
    let res= await fetch(`${link}/User/NewCoinAmount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //
        body: JSON.stringify(User)
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

async function AddUserAssignedTasks(assignedTasks: any)
{
    let res= await fetch(`${link}/AssignedTasksUsers/AddUserAssignedTasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //
        body: JSON.stringify(assignedTasks)
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

async function AddChildAssignedTasks(assignedTasks: any[])
{
    let res= await fetch(`${link}/AssignedTasksChild/AddChildAssignedTasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //
        body: JSON.stringify(assignedTasks)
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

async function UpdateChildPassCode(updateInfo:IChildPassCode)
{
    let res = await fetch(`${link}/Dependent/UpdatePassCode`,{
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateInfo)
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


async function AddDefaultAvatar(Avatar:IAddAvatar)
{
    let res = await fetch(`${link}/Dependent/UpdatePassCode`,{
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Avatar)
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

async function AddDefaultUserSpace(newDefaultSpace:IDefaultSpace)
{
    let res = await fetch(`${link}/DefaultCollection/CreateUserDefaultSchedule`,{
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDefaultSpace)
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

async function CreateChildDefaultSchedule(newDefaultSpace:IDefaultSpaceChild)
{
    let res = await fetch(`${link}/DefaultCollectionDependent/CreateChildDefaultSchedule`,{
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDefaultSpace)
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

async function UpdateChildCoinsAndPoints(UpdateChildCoinsAndPoints:IchildCoinAndPoint)
{
    let res = await fetch(`${link}/Dependent/UpdateDependentCoinsAndPoints`,{
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(UpdateChildCoinsAndPoints)
    });
    if(!res.ok)
    {
        const message = `An Error has Occured ${res.status}`
        throw new Error (message)
    }
    let data:any = await res.json();
    console.log(data)
    return data;
}

async function DeleteSpaceCollectionById(spaceId:number)
{
    let res = await fetch(`${link}/SpaceCollection/DeleteSpaceCollectionById/ ${spaceId}`,{
        method: "Post",
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
    let data:boolean = await res.json();
    console.log(data)
    return data;
}



async function DeleteInvitationByInvitedInviter(invitedUsername:string, inviterUsername:string)
{
    let res = await fetch(`${link}/SpaceCollection/DeleteInvitation/ ${invitedUsername}/${inviterUsername}`,{
        method: "Post",
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
    let data:boolean = await res.json();
    console.log(data)
    return data;
}

async function UpdateChildName(NewName:any)
{
    let res = await fetch(`${link}/Dependent/ChangeChildName`,{
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({NewName})
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





export {UserLogin, CreateAccount, UpdateName, DeleteUser, AddNewRoom, UpdatePassword, AddChild, GetSpaceCollectionByUserId, GetUserByUsername, GetDependantByUserId, GetAllSpaceItems, AddSelectedTask, AllInvitesByInvitedUsername, InviteUser,  GetSpacesByCollectionID, AddNewSpace, AcceptInvite, ChildFreeSwitch, GetSelectedTasksByUserID, GetAllTasks, GetInvitationByUsername, DeleteInvite, GetTasksByRoomId, GetUserData, RedeemCoinsUser, RedeemCoinsChild, GetSharedSpacesById, DeleteInvitation, NewCoinAmountDependent, NewCoinAmountNotDependent, AddChildAssignedTasks, AddUserAssignedTasks, UpdateChildPassCode, GetUserDefaultSchedule, AddDefaultAvatar, GetChildDefaultSchedule, UpdateUserTaskToCompleted, ApproveTaskForCompletionChild, SubmitTaskChildApproval, AddDefaultUserSpace,  CreateSharedSpaces, GetSharedSpacesByUserId, GetSharedSpacesByInvitedAndInviterUsername, DeleteSharedSpacesById, GetDependantDTOByChildId, CreateChildDefaultSchedule, DeleteSpaceCollectionById, GetAllTasksHistoryForMembers, DeleteInvitationByInvitedInviter, UpdateChildName, UpdateChildCoinsAndPoints }

