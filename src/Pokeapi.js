import React from 'react';
import { useState } from 'react';
import Logo from "./img/logo.png";
import Pokepic from "./img/pokemon1.png";
import Axios from "axios";

function Pokeapi() {

   
    const [search, setsearch] = useState("");
    const [pokeinfo, setPokeInfo] = useState({img:"", name:"", type: "", attack:"", defense:""});
    const [displayCharacter, setDisplayCharacter] =useState(false);
   
    //Grab the input value
    const searchName = (event)=>{
        let currentSearch = event.target.value
         console.log(currentSearch)
          setsearch(currentSearch.toLowerCase())
         
    }


    const displayInfo = (currentSearch)=>{
       
        
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`).then((response)=>{
            console.log(response.data)
        setPokeInfo(
            {img: response.data.sprites.other.dream_world.front_default,
             name: search, 
             type: response.data.types[0].type.name,
             attack: response.data.stats[1].base_stat,
             defense: response.data.stats[2].base_stat})
             
         setDisplayCharacter(true);
         currentSearch = "";
         setsearch(currentSearch)
    })
    
    
    }
    
    
    return (
    
    
        
      <body className='background'> 
      <div className='container' >
             <div className='search-container' >
           <img className='logo'  src={Logo} alt="pokémon logo"/>
                 <input onChange={searchName} type="text" value={search} placeholder="Buscar personaje" />
                 <button onClick={displayInfo}>Buscar</button>
             </div>
             {!displayCharacter ? 
             <div className='display'> 
                 <img src={Pokepic} alt="Charmander"/>
               
               <h1 className='character'>Busca un personaje...</h1>
               </div>
               
            : <div className='card-container'>
                <div className='card'>
                    <img src={pokeinfo.img} alt={search}/>
                    <h2><span>Nombre:</span> {pokeinfo.name}</h2>
                    <h3><span>Ataque:</span> {pokeinfo.attack}</h3>
                    <h3><span>Tipo:</span> {pokeinfo.type} </h3>
                    <h3><span>Defensa:</span> {pokeinfo.defense}</h3>
                </div>
               
                  
            </div>
                 
             }
             
        </div>
            
               
     </body>
       
      
  )
}

export default Pokeapi;