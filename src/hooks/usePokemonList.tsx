import { useState, useEffect } from "react";

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

interface Props {
  enabled?: boolean;
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

const usePokemonList = (props: Props) => {
  const { enabled = true } = props;

  const [state, setState] = useState({
    pokemonList: [],
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    if (enabled) {
      cachedFetch(pokemonAPI).then((res) => {
        if (res.status === 200) {
          setState({
            pokemonList: res.data.results,
            isLoading: false,
            error: undefined,
          });
        } else {
          setState({
            pokemonList: [],
            isLoading: false,
            error: res.error,
          });
        }
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
