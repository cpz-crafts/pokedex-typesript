import React, { useEffect, useState } from 'react';
import { fetchAllPokemon } from '../services/PokemonService';
import { Pokemon } from '../types/PokemonTypes';
import PokemonSprite from "./PokemonSprite"
import Pagination from './Pagination';
import { Link } from "react-router-dom"; 

const MainPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);



  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    fetchAllPokemon(itemsPerPage, offset)
      .then(data => setPokemonList(data))
      .catch(error => console.error('Failed to fetch Pokémon', error));
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
      {pokemonList.map((pokemon, index) => (
    <li key={index}>

      <Link to={`/detail/${pokemon.name}`}>{pokemon.name}</Link>
      <PokemonSprite pokemonName={pokemon.name}/>
      
    </li>
  ))}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={1118} 
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default MainPage;
