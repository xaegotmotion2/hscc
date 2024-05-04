import {debounce} from "lodash"
import { useState } from "react"
export default function RegistrationPage() {
    const APIkey = import.meta.env.VITE_API_KEY //access apikey from .env file
    const [IsGood, setIsGood]=useState();
    const debounceUser= debounce(async (value)=>{
        const options = { //Gives access
            headers:{
            'Authorization': APIkey,
            'content-type': 'application/json'
        }}
        const data = await fetch(`
        https://blogpress.api.hscc.bdpa.org/v1/users/${value}`, options)
        const result = await data.json();
        console.log(result);
        setIsGood(!result.success);
        return !result.success
    },1000)
    const handleUserChange=async(e)=>{
        setIsGood(undefined);
        await debounceUser(e.target.value)
    }
    return <>
    <form>
        <label htmlFor="Username">Username:</label>
        <input type="text" id="Username" onChange={handleUserChange}/>
        {IsGood != undefined ? ((isGood) ? 'Username is good' : 'Username is not good'):("")} {}
        {/* nested if statement: if isGood not undefined and if isGood is acc good*/}
    </form>
    </>
}