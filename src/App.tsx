import { useState, useEffect } from "react";
import pokemons from "./PokemonDetails";
import Card from "./components/Card";
import "./styles/App.css";
import type { Pokemon } from "./types/Pokemon"

export default function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [clickedIds, setClickedIds] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const fetchAll:Promise<Pokemon>[] = pokemons.map((p:Omit<Pokemon,"image">):Promise<Pokemon> =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
        .then((res:Response):Promise<any> => res.json())
        .then((data):Pokemon => ({
          id: p.id,
          name: p.name,
          type: p.type,
          image: data.sprites.other["official-artwork"].front_default,
        })),
    );

    Promise.all(fetchAll).then((results:Pokemon[]):void => {
      console.log(results);
      setPokemonList(results);
    });
  }, []);

  function handleCardClick(pokemon:Pokemon):void {
    if (clickedIds.includes(pokemon.id)) {
      if (score > totalScore) {
        setTotalScore(score);
      }

      setScore(0);
      setClickedIds([]);
    } else {
      setClickedIds([...clickedIds, pokemon.id]);
      setScore(score + 1);
      setPokemonList([...pokemonList].sort(() => Math.random() - 0.5));
    }
  }

  return (
    <main>
      <h1>Pokemon Memory Game</h1>
      <h2>
        Get points by clicking on an image but don't click on any more than
        once!
      </h2>
      <div className="flex justify-center font-bold my-4">
        <table className="bg-black">
          <thead>
            <tr>
              <th
                className="border-2 border-solid border-yellow-400 p-2"
                colSpan={2}
              >
                Scoreboard
              </th>
            </tr>
            <tr>
              <th className="border-2 border-solid border-yellow-400 p-2">
                Current Score
              </th>
              <th className="border-2 border-solid border-yellow-400 p-2">
                Best Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-solid border-yellow-400 p-2">
                {score}
              </td>
              <td className="border-2 border-solid border-yellow-400 p-2">
                {totalScore}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>
    </main>
  );
}
