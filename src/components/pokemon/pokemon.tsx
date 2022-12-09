import { useEffect, useState } from "react";
import "./styles.css";

const noImageURL =
  "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=";

interface IPokemon {
  sprites: {
    front_default: string;
  };
}

interface IPokemonProps {
  name: string;
  imageURL?: string;
}

const Pokemon = (props: IPokemonProps) => {
  const { name, imageURL } = props;
  const [pokemon, setPokemon] = useState<undefined | IPokemon>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (imageURL) {
      fetch(imageURL)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return isLoading || !pokemon ? (
    <div className="pokemon">
      <img src={noImageURL} width={74} height={74} />
      <h4>{name}</h4>
    </div>
  ) : (
    <div className="pokemon">
      <img src={pokemon.sprites.front_default} alt={name} />
      <h4>{name}</h4>
    </div>
  );
};

export default Pokemon;
