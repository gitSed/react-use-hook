import { Suspense } from "react";
import { PokemonList } from "./components";

import "./App.css";

function App() {
  return (
    <Suspense>
      <PokemonList showPokemonList />
    </Suspense>
  );
}

export default App;
