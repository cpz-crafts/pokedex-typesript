import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemon = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?limit=${limit}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};
