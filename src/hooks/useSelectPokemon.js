import { useState } from "react";

export const useSelectPokemon = () => {
  const [selectedPokemon, setSelectedPokemon] = useState('');

  const onSelectedPokemon = (props) => {
    const { id, pokemonData, onOpen } = props;

    const targetPokemon = pokemonData.find((pokemon) => pokemon.id === id);
    console.log(targetPokemon);
    setSelectedPokemon(targetPokemon);
    onOpen();
  };

  return { selectedPokemon, onSelectedPokemon };
};
