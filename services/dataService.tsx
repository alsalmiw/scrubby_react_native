import INewUser from '../Interfaces/INewUser';
import IUserLogin from '../Interfaces/IUserLogin'
import INewName from '../Interfaces/INewName'

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

async function GetUserByUsername(Username:string) {
    let res = await fetch(`${link}/User/GetUserByUsername/${Username}`);
    let data = await res.json();
    return data;
}


export {UserLogin, CreateAccount, UpdateName, DeleteUser, UpdatePassword, GetUserByUsername }