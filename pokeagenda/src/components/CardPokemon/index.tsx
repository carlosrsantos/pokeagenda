import { useEffect, useState } from "react";
import { pokeApi } from "../../services/api";
import './styles.css';

interface Pokemon{
  id: number; 
  name: string;
  picture: string;
  types: { type: { name: string }}[];
  
}

export default function CardPokemon(){
  const [pokemon, setPokemon] = useState<Pokemon>({
    id:0,
    name: '',
    picture: '',
    types: [],
  
  });

  useEffect(()=>{
    pokeApi.get(`/1`).then((p => {
      setPokemon({
        id:p.data.id,
        name: p.data.name,       
        picture: p.data.sprites.other.dream_world.front_default,
        types: p.data.types,
      
    })
  }
  ));      
  },[]);

  async function anteriorPokemon () {
    let pokeId = pokemon.id;

    if(pokemon.id >= 1) {
      pokeId-=1;
      pokeApi.get(`/${pokeId}`).then((p => {
        setPokemon({
          id:p.data.id,
          name: p.data.name,       
          picture: p.data.sprites.other.dream_world.front_default,
          types: p.data.types,
          
      })
    }
    ));      
  }
  else {
    document.getElementById('anterior')?.setAttribute("disabled","true")

    }

  }

  async function proximoPokemon () {
    let pokeId = pokemon.id;

   if(pokemon.id < 151) {
      pokeId+=1;

      pokeApi.get(`/${pokeId}`).then((p => {
        setPokemon({
          id:p.data.id,
          name: p.data.name,       
          picture: p.data.sprites.other.dream_world.front_default,
          types: p.data.types,
          // type_secondary: p.data.types[1].type.name,
      })
    }
    )); 
 }
}
  

  return (
    <main>
      <div className="card">
        <h3>{`${pokemon.name} #${pokemon.id}` }</h3>

        <img className="sprite" src={pokemon.picture} alt={pokemon.name} /> 
         Types:
         {pokemon.types.length > 1 ? <p>{pokemon.types[0].type.name} & {pokemon.types[1].type.name}</p>
           : <p>{pokemon.types[0].type.name}</p>
         }
        
        
        <div className="buttons">
          
          <button id="anterior" onClick={anteriorPokemon}>
            <span className="material-icons">
            arrow_back
            </span>
          </button>
          <button onClick={proximoPokemon}>
            <span className="material-icons">
            arrow_forward
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}