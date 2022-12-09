import { useState, useEffect } from "react";

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

interface Props {
  enabled?: boolean;
}

const usePokemonList = (props: Props) => {
  const { enabled = true } = props;

  const [state, setState] = useState({
    pokemonList: [],
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    if (enabled) {
      fetch(pokemonAPI)
        .then((res) => res.json())
        .then((data) => {
          setState({
            pokemonList: data.results,
            isLoading: false,
            error: undefined,
          });
        })
        .catch((err) => {
          setState({
            pokemonList: [],
            isLoading: false,
            error: err.message,
          });
        });
    }
  }, [enabled]);

  return {
    pokemonList: state.pokemonList,
    isLoading: state.isLoading,
    error: state.error,
  };
};

export default usePokemonList;
