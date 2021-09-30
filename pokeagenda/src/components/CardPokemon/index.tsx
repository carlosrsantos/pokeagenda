import { useEffect, useState } from "react";
import { pokeApi } from "../../services/api";
import './styles.css';

interface Pokemon{
  id: number; 
  name: string;
  picture: string;
  type_main: string;
  type_secondary?: string;
}

export default function CardPokemon(){
  const [pokemon, setPokemon] = useState<Pokemon>({
    id:0,
    name: '',
    picture: '',
    type_main: '',
    type_secondary:'',
  });

  useEffect(()=>{
    pokeApi.get(`/25`).then((p => {
      setPokemon({
        id:p.data.id,
        name: p.data.name,       
        picture: p.data.sprites.other.dream_world.front_default,
        type_main: p.data.types[0].type.name,
      
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
          type_main: p.data.types[0].type.name,
          
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

    // if(pokemon.id <= 151) {
      pokeId+=1;

      pokeApi.get(`/${pokeId}`).then((p => {
        setPokemon({
          id:p.data.id,
          name: p.data.name,       
          picture: p.data.sprites.other.dream_world.front_default,
          type_main: p.data.types[0].type.name,
          // type_secondary: p.data.types[1].type.name,
      })
    }
    ));      

    // }

  }
  

  return (
    <main>
      <div className="card">
        <h3>{`${pokemon.name} #${pokemon.id}` }</h3>

        <img className="sprite" src={pokemon.picture} alt={pokemon.name} /> 
        
          <span>{`type: ${pokemon.type_main}`}</span>    
          {pokemon.type_secondary && 
             <span>{`type: ${pokemon.type_secondary}`}</span>
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