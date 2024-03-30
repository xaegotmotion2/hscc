import { useParams} from "react-router-dom"
import { getPokemon } from "../hooks/usePokemonApi";

export default function PokemonId() {
    const {id}=useParams();
    const pokemon=getPokemon(id);
    console.log(pokemon)
    return<>
    <img src={pokemon?.sprites.front_default}></img>
     </>
}