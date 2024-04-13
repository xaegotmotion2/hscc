import { ReactNode, useState } from "react";
import UserContext from "./UserContext"

interface Props{
    children: ReactNode
}

export default function UserContextProvider({children}: Props){
    const [user, setUser] = useState();
    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}