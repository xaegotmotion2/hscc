import { useContext, useRef } from "react";
import useAuth from "../Hooks/useAuth";
import React from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const handleSubmit = async (event: React.FormEvent) => {
        // event.preventDeault will prevent the page to refresh after the alert
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (username && password) {
            const [isAuthorized, user] = await useAuth(password, username);
            if (isAuthorized) {
                setUser && setUser(user);
                window.localStorage.setItem("user", JSON.stringify(user))
                navigate("/home");
            }
            alert(`Username: ${username}` + ` Password: ${password}`)
        } else {
            alert(`Please insert value`)
        }
    }
    return (
        // HW: Create Registration Page
        <>
            {user && user.username}
            <center><h1>Login to inBDPA</h1></center>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" ref={usernameRef} placeholder="Enter User" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" ref={passwordRef} placeholder="Enter Password" />
                    </div>
                    <button className="btn btn-dark" type="submit">Login</button>
                </form>
            </div>

        </>
    )
}