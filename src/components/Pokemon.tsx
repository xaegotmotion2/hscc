import { NavLink, Outlet } from "react-router-dom";
import usePokemonApi from "../Hooks/usePokemonApi"
import { Spinner } from "react-bootstrap";

export default function Pokemon() {
    const { jsonData, pagination, isLoading } = usePokemonApi();
    console.log(isLoading);

    if (isLoading) {
        return <>
        <div className = "Spinner">
            <Spinner></Spinner>
        </div>
        </>
    }
    return <>
        <h1>Pokemon</h1>
        <ul>
            {jsonData?.results.map((pokemon)=>{
                const number = pokemon.url.split("/")[6];
                console.log(number);
                return<li key={pokemon.name}>
                    <NavLink to = {`/pokemon/${number}`}>
                    {"#" + number} {pokemon.name}
                    </NavLink>
                    </li>
            })}
        </ul>
        <button onClick={()=>{pagination("previous")}}>Previous</button>
        <button onClick={()=>{pagination("next")}}>Next</button>
        <Outlet></Outlet>
    </>
}
