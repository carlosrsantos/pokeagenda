import { useEffect, useState } from "react";
import { pokeApi } from "../../services/api";
import './styles.css';

interface Pokemon{
  id: number; 
  name: string;
  picture: string;
}

interface TypePokemon{
  type: {name: string;}
}

export default function CardPokemon(){
  const [pokemon, setPokemon] = useState<Pokemon>({
    id:0,
    name: '',
    picture: '',
  });

  useEffect(()=>{
    pokeApi.get(`/25`).then((p => {
      setPokemon({
        id:p.data.id,
        name: p.data.name,       
        picture: p.data.sprites.other.dream_world.front_default,
    })
  }
  ));
      
  },[]);

  

  return (
    <main>
      <div className="card">
        <h3>{`${pokemon.name} #${pokemon.id}` }</h3>

        <img src={pokemon.picture} alt={pokemon.name} />       
        <div className="buttons">
          <button>
            <span className="material-icons">
            arrow_back
            </span>
          </button>
          <button>
            <span className="material-icons">
            arrow_forward
            </span>
          </button>
        </div>
      </div>
    </main>
  );

}