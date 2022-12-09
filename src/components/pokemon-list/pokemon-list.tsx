import { Pokemon } from "..";
import { usePokemonList } from "../../hooks";
import "./styles.css";

interface PokemonListProps {
  showPokemonList?: boolean;
}

const PokemonList = (props: PokemonListProps) => {
  const { showPokemonList = false } = props;

  const { isLoading, pokemonList } = usePokemonList({
    enabled: showPokemonList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Pokemons</h1>
      <div className="pokemon-container">
        {pokemonList.map((pokemon: any) => (
          <Pokemon
            key={pokemon.name}
            name={pokemon.name}
            imageURL={pokemon.url}
          />
        ))}
      </div>
    </>
  );
};

export default PokemonList;
