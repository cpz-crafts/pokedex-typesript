import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemon = async (limit = 102, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?limit=${limit}&offset=${offset}`);
    console.log(response)
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};


export const fetchPokemonDetails = async (pokemonName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${pokemonName}`);
    console.log("POKEMON DETAILS")
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

