import { NavLink, Outlet } from "react-router-dom";
import usePokemonApi from "../hooks/usePokemonApi"

export default function Pokemon() {
    const {jsonData, pagination }=usePokemonApi();
    console.log(jsonData);
    return <>
    <h1>Pokemon</h1>
    <ul>
        {jsonData?.results.map((pokemon)=>{
            const number=pokemon.url.split("/")[6]
            console.log(number);
            return <li key={pokemon.name}>
                <NavLink to= {`/pokemon/${number}`}>
                {"#" + number}{pokemon.name}
                </NavLink>
                </li>
        })}
    </ul>
    <button onClick={()=>{pagination("previous")}}>Previous</button>
    <button onClick={()=>{pagination("next")}}>Next</button>
    <Outlet></Outlet>
    </>
}
