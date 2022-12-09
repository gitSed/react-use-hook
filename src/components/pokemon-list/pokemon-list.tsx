import { useEffect, useState } from "react";
import { Pokemon } from "..";
import "./styles.css";

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(pokemonAPI);

      if (response.ok) {
        const data = await response.json();
        setPokemonList(data.results);
        setIsLoading(false);
      } else {
        setError(response.statusText);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
