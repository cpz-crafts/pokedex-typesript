export type Pokemon = {
    name: string;
    url: string; 
  };

  export type Ability = {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };

  
export type PokemonDetails = {
  name: string;
  sprites: { front_default: string}
  abilities: Ability[];

}