import React, {useEffect, useState} from "react";
import { fetchPokemonDetails } from '../services/PokemonService';
import { PokemonDetails } from "../types/PokemonTypes";


interface PokemonSpriteProps {
    pokemonName: string;
  }
  

const PokemonSprite: React.FC<PokemonSpriteProps> = ({ pokemonName }) => {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | undefined>(undefined)

    useEffect(() => {
        if (pokemonName) {
            fetchPokemonDetails(pokemonName)
            .then(data => setPokemonDetails(data))
            .catch(error => console.error('Failed to fetch pokemon details', error));
        }
       
    }, [pokemonName])
     return (
        <img src={pokemonDetails?.sprites?.front_default} alt={pokemonDetails?.name}/>
     )
}

export default PokemonSprite;