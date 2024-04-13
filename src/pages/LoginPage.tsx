import {useContext, useRef} from "react"
import UserContext from "../context/UseContext";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
       const {user, setUser}=useContext(UserContext)
       const navigate=useNavigate();
       const usernameRef=useRef(null);        
        const passwordRef=useRef(null)
        const handleSubmit=async(event: React.FormEvent)=>{
            event.preventDefault();
            const username=usernameRef.current?.value;
            const password=passwordRef.current?.value;
            if(username && password){
              const [isAuthorized,user]= await useAuth(password, username);
              if(isAuthorized){
                setUser&&setUser(user);
                window.localStorage.setItem("user", JSON.stringify(user))
                navigate("/home");
              }
              alert(`Username: ${username} Password: ${password}`)
            } else{
                alert(`Please insert value`)
            } 
        
    }
    return <>
    {/*<form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username"></input>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" ></input>
        <button type="submit">Login</button>
</form>*/}
    <>{user && user.username}</>
     <center><h1>Login into Google Here</h1></center>
    <div className="container">
    <form  onSubmit={handleSubmit}>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text" ref={usernameRef} className="form-control" id="inputEmail3"></input>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" ref={passwordRef} className="form-control" id="inputPassword3"></input>
    </div>
  </div>  
  <button type="submit" className="btn btn-primary">Sign in</button>
</form>
</div>
    </>
}