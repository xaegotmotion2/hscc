import {useRef} from "react"

export default function LoginPage() {
       const usernameRef=useRef(null);        
        const passwordRef=useRef(null)
        const handleSubmit=(event: React.FormEvent)=>{
            event.preventDefault();
            const username=usernameRef.current?.value;
            const password=passwordRef.current?.value;
            if(username && password){
            alert(`Username: ${username} Password: ${password}`);
            } else{
                alert(`Please insert value`);
            } 
        }
    return <>
            {/*<form>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" ></input>
                    <br></br>
                    <br></br>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" ></input>
                    <br></br>
                    <br></br>
                    <button type="submit">Login</button>
                    <br></br>
            */}
            <div className="container">
                <center><h1>Login to Google</h1></center>
            </div>
            <form onSubmit={handleSubmit}>
        <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="email;" className="form-control" id="inputEmail3" ref={usernameRef}></input>
            </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" ref={passwordRef}></input>
            </div>
        </div>
        <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
        </fieldset>
        <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
                </label>

            </div>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
    </>
}