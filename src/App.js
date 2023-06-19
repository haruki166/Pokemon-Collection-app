import { Center, Spinner, useDisclosure } from "@chakra-ui/react";

import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/card/Card";
import Navbar from "./components/Navbar/Navbar";
import PokemonModal from "./components/modal/PokemonModal";
import { useSelectPokemon } from "./hooks/useSelectPokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  const { selectedPokemon, onSelectedPokemon } = useSelectPokemon();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      //各ポケモンのデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //ポケモンひとつずつのデータ
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    console.log(_pokemonData);
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const onClickPokemon = useCallback(
    (id) => {
      onSelectedPokemon({ id, pokemonData, onOpen });
    },
    [pokemonData, onSelectedPokemon, onOpen]
  );

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <Center h='100vh'>
            <Spinner />
          </Center>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    id={pokemon.id}
                    pokemon={pokemon}
                    onClick={onClickPokemon}
                  />
                );
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
      <PokemonModal
        isOpen={isOpen}
        onClose={onClose}
        pokemon={selectedPokemon}
      />
    </>
  );
}

export default App;
