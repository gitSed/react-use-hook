import { use } from "react";

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

const pokemonListFetch = fetch(pokemonAPI).then(async (res) => ({
  status: res.status,
  data: res.status === 200 ? await res.json() : null,
}));

interface Props {
  enabled?: boolean;
}

const usePokemonList = (props: Props) => {
  const { enabled = true } = props;

  if (!enabled) {
    return { pokemonList: [], isLoading: true, error: undefined };
  }

  const { data, status } = use(pokemonListFetch);

  return {
    pokemonList: status === 200 ? data.results : [],
    isLoading: false,
    error: status === 200 ? undefined : "Something went wrong",
  };
};

export default usePokemonList;
