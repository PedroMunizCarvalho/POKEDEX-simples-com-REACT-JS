import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState('');

  const getPokemons = (id) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        const pokemon = response.data;
        setPokemons((prevPokemons) => [...prevPokemons, pokemon]);
      });
  };

  useEffect(() => {
    for (let i = 1; i <= 150; i++) {
      getPokemons(i);
    }
  }, []);

  const buscarPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(busca.toLowerCase()) ||
      pokemon.id === parseInt(busca)
  );

  return (
    <div className="container">
      <h1>Pokedex</h1>


      <ul className="pokemons">
        {buscarPokemons.map((item) => (
          <li key={item.id}>
            <h2>
              {item.id}. {item.name}
            </h2>
            <img
              className="card-image"
              src={item.sprites.front_default}
              alt={item.name}
            />
            <p className="type">
              {item.types.map((type) => type.type.name).join(' // ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
