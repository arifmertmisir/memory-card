export default function Card({ pokemon, onClick }) {
  return (
    <div
      className="w-48 text-center font-bold shadow-[0px_10px_20px_rgba(0,0,1,1)] rounded-xl bg-red-600 cursor-pointer duration-300 transition-transform hover:-translate-y-2.5 hover:scale-105 hover:shadow-[0px_20px_80px_rgba(255,203,5,0.4)] hover:bg-white/20"
      pokemon={pokemon}
      onClick={onClick}
    >
      <img
        className="w-full block hover:brightness-110 hover:drop-shadow-[0px_0px_10px_white]"
        src={pokemon.image}
        alt={pokemon.name}
      />
      <p>{pokemon.name}</p>
      <p>{pokemon.type}</p>
    </div>
  );
}
