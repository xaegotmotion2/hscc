import { useRef, useState } from "react";
import { useSearchPokemon } from "../hooks/usePokemonApi";


export default function SearchPage(){
    const searchRef = useRef(null)
    const [pokemonName, setPokemonName] = useState(undefined)
    const pokemon = useSearchPokemon(pokemonName);
    const handleSubmit=(event)=>{
        event.preventDefault();
        setPokemonName(searchRef.current?.value);
    }
        return <>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={searchRef}></input>
            </form>
            {pokemon && pokemon.name}
            <img src={pokemon?.sprites.front_default}></img>
    
               </>
}

function setPokemon(value: any) {
    throw new Error("Function not implemented.");
}
