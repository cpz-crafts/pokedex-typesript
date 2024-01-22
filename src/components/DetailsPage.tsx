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
        <Paper sx={{ margin: 20, p: 10, borderRadius: 15 }}>
            {pokemonDetails ? (
                <Card sx={{ p: 5, backgroundColor: 'black', color: 'white' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">{pokemonDetails.name}</Typography>
                            <ul>
                                {pokemonDetails.abilities.map((ability, index) => (
                                    <li key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name}
                                style={{ width: "200px", height: "200px" }} />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: 'gray', '&:hover': { backgroundColor: 'darkgray' } }}
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

