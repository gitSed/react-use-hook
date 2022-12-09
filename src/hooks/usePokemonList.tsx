import { use } from "react";
import { cache } from "../utils";

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

interface Props {
  enabled?: boolean;
}

const usePokemonList = (props: Props) => {
  const { enabled = true } = props;

  if (!enabled) {
    return { pokemonList: [], isLoading: true, error: undefined };
  }

  const { data, status } = use(cache(pokemonAPI));

  return {
    pokemonList: status === 200 ? data.results : [],
    isLoading: false,
    error: status === 200 ? undefined : "Something went wrong",
  };
};

export default usePokemonList;
