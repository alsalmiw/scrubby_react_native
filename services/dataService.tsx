import INewUser from '../Interfaces/INewUser';
import IUserLogin from '../Interfaces/IUserLogin'


async function UserLogin(userData:IUserLogin){
    let res= await fetch('https://scrubbyapi.azurewebsites.net/User/Login', {
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
    let res= await fetch('https://scrubbyapi.azurewebsites.net/User/AddUser', {
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


async function UpdateName(Name:string, Username:string) {
    let res= await fetch(`https://scrubbyapi.azurewebsites.net/User/UpdateName/${Username}/${Name}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //might be wrong
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

async function DeleteUser(id:number) {
    let res= await fetch(`https://scrubbyapi.azurewebsites.net/User/UpdateUserInfo/${id}`, {
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


export {UserLogin, CreateAccount, UpdateName, DeleteUser }