import { useState, useEffect } from "react";
import pokemons from "./PokemonDetails";
import Card from "./components/Card";
import "./styles/App.css";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const fetchAll = pokemons.map((p) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
        .then((res) => res.json())
        .then((data) => ({
          id: p.id,
          name: p.name,
          type: p.type,
          image: data.sprites.other["official-artwork"].front_default,
        })),
    );

    // Tüm isteklerin bitmesini bekleyip state'i tek seferde güncelliyoruz
    Promise.all(fetchAll).then((results) => {
      console.log(results);
      setPokemonList(results);
    });
  }, []);

  function handleCardClick(pokemon) {
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
      <div className="score-board">
        <p>Score: {score}</p>
        <p>Best Score: {totalScore}</p>
      </div>
      <div className="card-container">
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
