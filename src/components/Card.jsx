export default function Card({ pokemon, onClick }) {
  return (
    <div className="card" pokemon={pokemon} onClick={onClick}>
      <img src={pokemon.image} alt={pokemon.name} width="200px" />
      <p>{pokemon.name}</p>
      <p>{pokemon.type}</p>
    </div>
  );
}
