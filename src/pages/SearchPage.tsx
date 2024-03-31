import { useRef, useState } from "react"
import { useSearchPokemon } from "../Hooks/usePokemonApi";

export default function SearchPage(){
    const searchref = useRef(null);
    const [pokemonName, setPokemonName] = useState(undefined);
    const pokemon = useSearchPokemon(pokemonName);
    const handleSubmit = (event)=>{
        event.preventDefault();
        setPokemonName(searchref.current?.value);
    }
    return<>
        <form onSubmit={handleSubmit}>
            <input type="text" ref={searchref}></input>
        </form>
        {pokemon && pokemon.name}
    </>
}