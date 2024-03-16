import {useRef} from "react"

export default function LoginPage() {
       const usernameRef=useRef(null);        
        const passwordRef=useRef(null)
        const handleSubmit=(event: React.FormEvent)=>{
            event.preventDefault();
            const username=usernameRef.current?.value;
            const password=passwordRef.current?.value;
            if(username && password){
            alert(`Username: ${username} Password: ${password}`)
            } else{
                alert(`Please insert value`)
            } 
        }
    return <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameRef}></input>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" ref={passwordRef}></input>
        <button type="submit">Login</button>
    </form>
    </>
}