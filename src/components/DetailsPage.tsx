import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetails } from '../services/PokemonService';
import { PokemonDetails } from "../types/PokemonTypes";
import { Paper, Card, Typography, Button, Grid, Box } from '@mui/material';

const DetailsPage = () => {
    const { pokemonName } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (pokemonName) {
            fetchPokemonDetails(pokemonName)
                .then(data => setPokemonDetails(data))
                .catch(error => console.error('Failed to fetch pokemon details', error));
        }
    }, [pokemonName]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Paper sx={{ 
            margin: { xs: 2, sm: 3, md: 10, lg:20, xl: 50}, 
            p: { xs: 2, sm: 5, md: 10 }, 
            borderRadius: 15, 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center', 
            height: '100%' 
        }}>
            {pokemonDetails ? (
                               <Card sx={{ 
                                p: { xs: 4, sm: 5, md: 9, lg:10, xl: 20}, 
                                backgroundColor: 'black', 
                                color: 'white', 
                                borderRadius: 10,
                                maxWidth: { sm: '100%', md: '100%'  }, 
                                m: 2 
                            }}>
            
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                                {pokemonDetails.name}
                            </Typography>
                            <ul>
                                {pokemonDetails.abilities.map((ability, index) => (
                                    <li key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name}
                                style={{ width: "100%", maxWidth: "200px", height: "auto" }} />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: 'black' } }}
                            onClick={goBack}>
                            Go Back
                        </Button>
                    </Box>
                </Card>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Paper>
    );
};

export default DetailsPage;

