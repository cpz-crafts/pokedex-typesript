import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import { fetchPokemonDetails } from '../services/PokemonService';
import { PokemonDetails } from "../types/PokemonTypes";

const DetailsPage = () => {
    const { pokemonName } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | undefined>(undefined)

    useEffect(() => {
        if (pokemonName) {
            fetchPokemonDetails(pokemonName)
            .then(data => setPokemonDetails(data))
            .catch(error => console.error('Failed to fetch pokemon details', error));
        }
       
    }, [pokemonName])
    return (
        <div>
            {pokemonDetails ? (
                <div>
                <h1>{pokemonDetails?.name}</h1>
                <ul>
                {pokemonDetails?.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
                <img src={pokemonDetails?.sprites?.front_default} alt={pokemonDetails?.name}
                 style={{ width: "200px", height: "200px" }} />
                </div>
            ) : (<p>Loading...</p>)}

        </div>
    )
}

export default DetailsPage;