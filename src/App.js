import './App.css';
import { useState } from 'react';
import Axios from 'axios';
function App() {
  const [pokemonname, setpokemonname]=useState("");
  const [pokemonchosen, setpokemonchosen]=useState(false);
  const [pokemon, setpokemon]=useState({
    name: "",
    species: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    type: "",
  })
  const searchPokemon=()=>{
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`).
    then((response)=>{
      setpokemon({
        name: pokemonname,
        species: response.data.species.name, 
        img: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setpokemonchosen(true);
    })
  }
  return (
    <div className="App">
      <h1 className='title-head'>Pokedex</h1>
      <div className='title'>
        <input type="text" onChange={(e)=>{setpokemonname(e.target.value)}}></input>
        <br></br>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='display'>
        {!pokemonchosen ? 
          <h3>please choose a pokemon</h3>
        :
          <div className='display'>
            <div className='dis'>
              <h3>{pokemon.name.toUpperCase()}</h3>
              <img src={pokemon.img}></img>
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h3>HP: {pokemon.hp}</h3>
              <h3>Attack: {pokemon.attack}</h3>
              <h3>Defense: {pokemon.defense}</h3>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
