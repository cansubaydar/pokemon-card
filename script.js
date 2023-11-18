// colors from https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
const colors = {
  normal: '#a8a878',
  fighting: '#c03028',
  flying: '#a890f0',
  poison: '#a040a0',
  ground: '#e0c068',
  rock: '#b8a038',
  bug: '#a8b820',
  ghost: '#705898',
  steel: '#b8b8d0',
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  psychic: '#f85888',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  fairy: '#ee99ac'
}

const pokemonTypes = Object.keys(colors)
const btn = document.getElementById('button')
const container = document.querySelector('.container')

// fetch pokemon data 
async function getPokemon() {
  try {
    // get a random number from the first generation of pokemon (ID 1-151)
    let pokeId = Math.floor(Math.random()* 150) + 1 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    
    if(!response.ok) {
      const message = `${response.status}`
      throw new Error(message)
    }

    const pokemonData = await response.json() 
    createPokemonCard(pokemonData) 

  } catch (error) {
    console.log(error)
  }
}

// create card pokemon 
let createPokemonCard = (pokemon) => {
  // assign pokemon informations to associated variables
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const id = pokemon.id
  const img = pokemon.sprites.other.dream_world.front_default
  const type = pokemon.types.map(i => i.type.name)
  const pokeType  = type.filter(i => pokemonTypes.includes(i)).map(e => colors[e])
  const hp = pokemon.stats[0].base_stat
  const attack = pokemon.stats[1].base_stat
  const defense = pokemon.stats[2].base_stat
  const speed = pokemon.stats[5].base_stat

  // pokemon card template
  container.innerHTML = `
  <div class="poke-hp">
    <p>HP <span>${hp}</span></p>
  </div>

  <div class="poke-img">
   <img src=${img}>
  </div>

  <div class="poke-info">
    <div class="poke-name">
      <p class="poke-id">#${id}</p>
      <h2>${name}</h2>
    </div>
    <div class="poke-type">
    </div>
    <div class="poke-stats">
      <ul class="poke-attack">
        <li>${attack}</li>
        <li>Attack</li>
      </ul>
      <ul class="poke-defense">
        <li>${defense}</li>
        <li>Defense</li>
      </ul>
      <ul class="poke-speed">
        <li>${speed}</li>
        <li>Speed</li>
      </ul>
    </div>
  </div>`

  // add styling associated with pokemon type
  if(type.length > 1) {
    container.style.background = `linear-gradient(to left top, ${pokeType[1]}, ${pokeType[0]})`
  } else {
    container.style.background = `${pokeType[0]}`
  }

  const pokeTypeContainer = document.querySelector('.poke-type')
  type.forEach((t, i) => {
    const span = document.createElement('span')
    span.textContent = `${t}`
    span.style.borderColor = `${pokeType[i]}`
    pokeTypeContainer.append(span)
  })
}

btn.addEventListener('click', (e) => {
  e.preventDefault()  
  getPokemon()
})
 
// run the function when page loads
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault() 
  getPokemon()
})