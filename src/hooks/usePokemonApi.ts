import { useEffect, useState } from "react";
interface Pokemon{
    name: string,
    url: string
}
interface PokemonApiResponse {
    count: number,
    next: string,
    previous: string,
    results: Pokemon[]
}
type Direction = "previous" | "next"
//gets a string that that only be previous or next

export default function usePokemonApi() {
    const [jsonData, setJsonData] = useState <PokemonApiResponse | null>(null);
    const [url, setUrl] = useState ("https://pokeapi.co/api/v2/pokemon/")
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url);
            const data = await res.json();
            setJsonData(data);
        }
        fetchData();
    }, [url])
    function pagination(direction : Direction){
        if(jsonData){
            setUrl(jsonData[direction])
        }
    }
    return { jsonData, pagination}

}

/*getPokemon(id) retrives the data from the poke api and calls the data to the */
export function getPokemon(id) {
    const [pokemon, setPokemon] = useState();
    useEffect(()=>{
        async function fetchData() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await res.json();
            setPokemon(data);
        }
        fetchData();
    },[id])
    return pokemon;
}