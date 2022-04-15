import React, {createContext, FC, ReactNode} from 'react'
import UseUser from '../hooks/use-user';

const UserContext = createContext<any>(UseUser);

export default UserContext;

export const UserProvider: FC <ReactNode> = ({children})=>{
    return(
        <UserContext.Provider value={UseUser()}>
        {children}
        </UserContext.Provider>
    )
}
