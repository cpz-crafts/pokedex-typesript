import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemon = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}?limit=1118`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};
