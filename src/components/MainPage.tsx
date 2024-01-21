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
    <Box sx={{ marginLeft: '20px' }}>
      <h1>Pokedex</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {pokemonList.map((pokemon, index) => (
          <Card key={index} sx={{ display: 'flex', Width: 345, backgroundColor: 'black'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" color={'white'}>
                  {pokemon.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                <Link to={`/detail/${pokemon.name}`} style={{ color: 'grey', textDecoration: 'none' }}>
  View Details
</Link>
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
      </Box>
      <Box  sx={{ marginTop: '20px' }}>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={1118} 
        onPageChange={onPageChange}
        currentPage={currentPage}
       
      />
      </Box>
    </Box>
  );
};

export default MainPage;
