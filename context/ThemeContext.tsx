import React, { FC, ReactNode } from 'react'
import { createContext } from "react";
import UseTheme from '../hooks/use-theme'



export const ThemeContext = createContext<any>(UseTheme);


export const ThemeProvider: FC <ReactNode> = ({children})=>{
    return(
        <ThemeContext.Provider value={UseTheme()}>
        {children}
        </ThemeContext.Provider>
    )
}
