import React, { useEffect, useState } from 'react';
import { fetchAllPokemon } from '../services/PokemonService';
import { Pokemon } from '../types/PokemonTypes';
import PokemonSprite from "./PokemonSprite"
import Pagination from './Pagination';
import { Link } from "react-router-dom"; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';


const MainPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);



  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    fetchAllPokemon(itemsPerPage, offset)
      .then(data => setPokemonList(data))
      .catch(error => console.error('Failed to fetch Pokémon', error));
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <h1>Pokedex</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {pokemonList.map((pokemon, index) => (
          <Card key={index} sx={{ display: 'flex', Width: 345 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {pokemon.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <Link to={`/detail/${pokemon.name}`}>View Details</Link>
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="more">
                </IconButton>
              </Box>
            </Box>
            <Box>
              <PokemonSprite pokemonName={pokemon.name} />
            </Box>
          </Card>
        ))}
      </div>
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
