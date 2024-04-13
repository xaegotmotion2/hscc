import { Children, ReactNode, useState } from "react";
import UserContext from "./UseContext";

interface Props{
    children: ReactNode
}

export default function UserContextProvider({children}: Props){
    const defaultUser=JSON.parse(window.localStorage.getItem("user"));
    const [user, setUser]=useState(()=>defaultUser);
    return<UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}