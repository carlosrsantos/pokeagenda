import { useEffect, useState } from "react";
import { pokeApi } from "../../services/api";

interface Pokemon{
  id: number; 
  name: string;
  types: TypePokemon[];
  picture: string;
}

interface TypePokemon{
  type: {name: string;}
}

export default function CardPokemon(){
  const [pokemon, setPokemon] = useState<Pokemon>({
    id:0,
    name: '',
    types:[],
    
    picture: '',
  });

  useEffect(()=>{
    pokeApi.get(`/1`).then((p => {
      setPokemon({
        id:p.data.id,
        name: p.data.name,
        types:p.data.types,
        picture: '',
        }  )  
    }));
      
  },[]);

  

  return (
    <main>
      <div>
        <h3>{pokemon.name}</h3>

        <img src={pokemon.picture} alt={pokemon.name} />

        {pokemon.types.forEach( p => {
          <strong>{p.type.name}</strong> 
        })}

      </div>
    </main>
  );

}