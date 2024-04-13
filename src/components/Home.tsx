import { useContext, useEffect } from "react"
import UserContext from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage";

export default function Home(){
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        if(user === null){
            navigate("/login");
        }
    }, [navigate, user])
    return <>{user && user.username}

    </>
}