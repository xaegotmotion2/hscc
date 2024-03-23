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
    return { jsonData, pagination }

}