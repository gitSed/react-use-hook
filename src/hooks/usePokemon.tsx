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

const cachedFetches: Record<string, Promise<any>> = {};
const cachedFetch = (url: string): Promise<any> => {
  if (!cachedFetches[url]) {
    cachedFetches[url] = fetch(url)
      .then(async (res) => ({
        data: await res.json(),
        status: res.status,
        error: res.statusText,
      }))
      .catch((err) => ({
        data: undefined,
        status: 500,
        error: err.message,
      }));
  }

  return cachedFetches[url];
};

const usePokemon = (props: Props) => {
  const { enabled = true, pokemonAPI } = props;

  const [state, setState] = useState<LocalState>({
    pokemon: undefined,
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    if (enabled && pokemonAPI) {
      cachedFetch(pokemonAPI).then((res) => {
        if (res.status === 200) {
          setState({
            pokemon: res.data,
            isLoading: false,
            error: undefined,
          });
        } else {
          setState({
            pokemon: undefined,
            isLoading: false,
            error: res.error,
          });
        }
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
