import usePokemonApi from "../hooks/usePokemonApi"

export default function Pokemon() {
    const { jsonData, pagination } = usePokemonApi();
    console.log(jsonData);
    return <>
        <h1>Pokemon</h1>
        <ul>
            {jsonData?.results.map((pokemon)=>{
                return <li key={pokemon.name}>{pokemon.name}</li>
            })}
        </ul>
        <button onClick={()=>{pagination("previous")}}>Previous</button>
        <button onClick={()=>{pagination("next")}}>Next</button>
    </>
}
