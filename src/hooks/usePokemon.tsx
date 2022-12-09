import { use } from "react";

interface Props {
  enabled?: boolean;
  pokemonAPI?: string;
}

interface IPokemon {
  sprites: {
    front_default: string;
  };
}

interface IPokemonResponse {
  status: number;
  data: IPokemon | string;
}

const cachedFetches: Record<string, Promise<IPokemonResponse>> = {};
const cachedFetch = (url: string): Promise<IPokemonResponse> => {
  if (!cachedFetches[url]) {
    cachedFetches[url] = fetch(url).then(async (res) => ({
      status: res.status,
      data: res.status === 200 ? await res.json() : null,
    }));
  }

  return cachedFetches[url];
};

const usePokemon = (props: Props) => {
  const { enabled = true, pokemonAPI } = props;

  if (!enabled || !pokemonAPI) {
    return { pokemon: undefined, isLoading: true, error: undefined };
  }

  const { data, status } = use(cachedFetch(pokemonAPI));

  return {
    pokemon: status === 200 ? (data as IPokemon) : undefined,
    isLoading: false,
    error: status === 200 ? undefined : "Something went wrong",
  };
};

export default usePokemon;
