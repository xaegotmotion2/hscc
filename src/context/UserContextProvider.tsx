import { ReactNode, useState } from "react"
import UserContext from "./UserContext"

interface Props {
    children: ReactNode
}

export default function UserContextProvider({ children }: Props) {
    const defaultUser = JSON.parse(window.localStorage.getItem("user"));
    const [user, setUser] = useState(()=>defaultUser);

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}