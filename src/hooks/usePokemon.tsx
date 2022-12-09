import { use } from "react";
import { cache } from "../utils";

interface IPokemon {
  sprites: {
    front_default: string;
  };
}

interface Props {
  enabled?: boolean;
  pokemonAPI?: string;
}

const usePokemon = (props: Props) => {
  const { enabled = true, pokemonAPI } = props;

  if (!enabled || !pokemonAPI) {
    return { pokemon: undefined, isLoading: true, error: undefined };
  }

  const { data, status } = use(cache(pokemonAPI));

  return {
    pokemon: status === 200 ? (data as IPokemon) : undefined,
    isLoading: false,
    error: status === 200 ? undefined : "Something went wrong",
  };
};

export default usePokemon;
