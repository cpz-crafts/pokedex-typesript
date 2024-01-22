import React, { useEffect, useState } from 'react';
import { fetchAllPokemon } from '../services/PokemonService';
import { Pokemon } from '../types/PokemonTypes';
import PokemonSprite from "./PokemonSprite";
import Pagination from './Pagination';
import { Link, useNavigate, useSearchParams } from "react-router-dom"; 
import { Card, CardContent, Typography, Box, IconButton, Grid, Paper } from '@mui/material';

const MainPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [itemsPerPage] = useState(12);
  const navigate = useNavigate();

  const onPageChange = (pageNumber: number) => {
    // Update the URL
    setCurrentPage(pageNumber)
    navigate(`?page=${pageNumber}`);
  };

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    fetchAllPokemon(itemsPerPage, offset)
      .then(data => setPokemonList(data))
      .catch(error => console.error('Failed to fetch Pokémon', error));
  }, [currentPage, itemsPerPage]);

  return (
    <Paper sx={{ margin: 20 , p: 10, borderRadius: 15}}>
        <Typography 
            variant="h3" 
            sx={{ 
                fontWeight: 'bold', 
                color: 'grey', 
                marginBottom: 3
            }}>
         Pokédex
        </Typography>
      <Grid container spacing={2}> 
        {pokemonList.map((pokemon, index) => (
          <Grid item xs={12} sm={6} key={index}> {/* breakpoints */}
            <Card sx={{ display: 'flex', Width: 345, backgroundColor: 'black',  '&:hover': {
                transform: 'translateY(-5px)', // Moves the card up by 5px on hover
                transition: 'transform 0.3s ease-in-out' // Smooth transition for the movement
              }}}>

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
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '40px',  display: 'flex', justifyContent: 'center' }}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={1118}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </Box>
    </Paper>
  );
};

export default MainPage;
