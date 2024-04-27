import {debounce} from 'lodash'
import { useState } from 'react'
export default function RegistrationPage() {
    const apiKey = import.meta.env.VITE_API_KEY
    const [isGood, setIsGood]= useState()
    const debounceUser=debounce(async(value)=>{
        alert(value)
        const options= {
            headers: {
                "Authorization":apiKey,
                "content-type": "application/json"
            }
        }
        const data = await fetch (`https://blogpress.api.hssc.bdpa.org/v1/users/${value}`, options)
        const result =await data.json()
        return !result.success

    
    },1000)
    
    }
        
    const handleUserChange= async (e)=> {
        setIsGood(undefined)
        setIsGood(await debounceUser(e.target.value))
    }
    
    return <>
        <form>
            <input type="text" id='username' onchange={handleUserChange}placeholder='Enter Your Username' />
            {isGood!=undefined ?((isGood) "username is good": "username is not good"):("")}
        </form>


         <div className="container">
            <div className="row">
                <div className="col-mod-3">

                </div>
                <div className="col-md-6 main">
                    <form action="/sign_up" method="POST">
                        <h2> Registration Form</h2>
                        <input type="text" className="box" id="name" name="name" placeholder="Name" required />
                        <br />
                        <input type="text" className="box" id="age" name="age" placeholder="Age" required />
                        <br />
                        <input type="text" className="box" id="email" name="email" placeholder="EmailId" required />
                        <br />
                        <input type="text" className="box" id="phno" name="phno" placeholder="Mobile" required />
                        <br />
                        <input type="text" className="box" id="gender" name="gender" placeholder="Gender" required />
                        <br />
                        <input type="text" className="box" id="password" name="password" placeholder="Password" required />
                        <br />
                        <input type="submit" value="Submit" id="submit" />

                    </form>
                </div>
            </div>
        </div> 
    </>
}