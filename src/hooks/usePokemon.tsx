import { useState, useEffect } from "react";

interface IPokemon {
  sprites: {
    front_default: string;
  };
}

interface LocalState {
  pokemon?: IPokemon;
  isLoading: boolean;
  error: string | undefined;
}

interface Props {
  enabled?: boolean;
  pokemonAPI?: string;
}

const usePokemon = (props: Props) => {
  const { enabled = true, pokemonAPI } = props;

  const [state, setState] = useState<LocalState>({
    pokemon: undefined,
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    if (enabled && pokemonAPI) {
      fetch(pokemonAPI)
        .then((res) => res.json())
        .then((data) => {
          setState({
            pokemon: data,
            isLoading: false,
            error: undefined,
          });
        })
        .catch((err) => {
          setState({
            pokemon: undefined,
            isLoading: false,
            error: err.message,
          });
        });
    }
  }, [enabled]);

  return {
    pokemon: state.pokemon,
    isLoading: state.isLoading,
    error: state.error,
  };
};

export default usePokemon;
