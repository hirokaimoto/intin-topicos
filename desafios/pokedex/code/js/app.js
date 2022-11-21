// TODO
const pokedexSection = document.querySelector('.pokedex')
const filterName = document.querySelector('#filter-name')
const filterType = document.querySelector('#filter-type')


async function getAllPokemon() {
    let response = await fetch('/data/pokedex.json')
    let data = await response.json()
    return data
}

function getPokemonHtml(aPokemon) {
  
  if (aPokemon.type.length > 1) {
    return `
    <div class="pokemon" data-name="${aPokemon.name}" data-type="${aPokemon.type}" tabindex="1">
  <figure class="pokemon-figure">
    <img src="img/${aPokemon.name.replaceAll('. ', '-').replace('\'', '')}.png" alt="Bulbasaur">
  </figure>
  <section class="pokemon-description">
    <span class="pokemon-id">${aPokemon.id}</span>
    <h1 class="pokemon-name">${aPokemon.name}</h1>
    <div class="pokemon-types">
      <span class="pokemon-type background-${aPokemon.type[0]}">${aPokemon.type[0]}</span>
      <span class="pokemon-type background-${aPokemon.type[1]}">${aPokemon.type[1]}</span>
    </div>
  </section>
  <section class="pokemon-stats">
    <div class="stat-row">
      <div>hp</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.hp / 250 * 100}%">${aPokemon.stats.hp}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>attack</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.attack / 250 * 100}%">${aPokemon.stats.attack}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>defense</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.defense / 250 * 100}%">${aPokemon.stats.defense}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>sp-atk</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats['sp-atk'] / 250 * 100}%">${aPokemon.stats['sp-atk']}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>sp-def</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats['sp-def'] / 250 * 100}%">${aPokemon.stats['sp-def']}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>speed</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.speed / 250 * 100}%">${aPokemon.stats.speed}</div>
      </div>
    </div>
  </section>
</div>
    `
  } else {
  return  `
  <div class="pokemon" data-name="${aPokemon.name}" data-type="${aPokemon.type}" tabindex="1">
  <figure class="pokemon-figure">
    <img src="img/${aPokemon.name.replaceAll('. ', '-').replace('\'', '')}.png" alt="Bulbasaur">
  </figure>
  <section class="pokemon-description">
    <span class="pokemon-id">${aPokemon.id}</span>
    <h1 class="pokemon-name">${aPokemon.name}</h1>
    <div class="pokemon-types">
      <span class="pokemon-type background-${aPokemon.type[0]}">${aPokemon.type[0]}</span>
    </div>
  </section>
  <section class="pokemon-stats">
    <div class="stat-row">
      <div>hp</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.hp / 250 * 100}%">${aPokemon.stats.hp}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>attack</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.attack / 250 * 100}%">${aPokemon.stats.attack}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>defense</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.defense / 250 * 100}%">${aPokemon.stats.defense}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>sp-atk</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats['sp-atk'] / 250 * 100}%">${aPokemon.stats['sp-atk']}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>sp-def</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats['sp-def'] / 250 * 100}%">${aPokemon.stats['sp-def']}</div>
      </div>
    </div>
    <div class="stat-row">
      <div>speed</div>
      <div class="stat-bar">
        <div class="stat-bar-bg" style="width: ${aPokemon.stats.speed / 250 * 100}%">${aPokemon.stats.speed}</div>
      </div>
    </div>
  </section>
</div>
    `
    
}
}

getAllPokemon().then(displayPokedex)


function displayPokedex(allPokemon) {
    pokedexSection.innerHTML = allPokemon.map(getPokemonHtml).join('')
}

function getPokemonType(aPokemon) {
  console.log(aPokemon.type)
  

  let newType = document.createElement('Option')
  newType.value = aPokemon.type
  newType.textContent = aPokemon.type
  filterType.appendChild(newType)
}
getAllPokemon().then(aPoke => {
  let result = []
  aPoke.forEach(element => {
    result = result.concat(element.type)
  });
  // let result2 = []
  // result.forEach(element => {
  //   result2 = result2.concat(element)
  // })
  

  const filterTypes = new Set(result)
  filterTypes.forEach(element => {
    let newType = document.createElement('Option')
    newType.value = element
    newType.textContent = element
    filterType.appendChild(newType)
  })
})


filterName.addEventListener('keyup', function(event) {
  let searchQuery = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();
  let allNamesDOMCollection = document.getElementsByClassName('pokemon-name');
  let pokemonDesc = document.getElementsByClassName('pokemon-description')
  let dataName = document.getElementsByClassName('pokemon')

  for (let counter = 0; counter < allNamesDOMCollection.length; counter++) {
    const currentName = allNamesDOMCollection[counter].textContent.charAt(0).toUpperCase() + allNamesDOMCollection[counter].textContent.slice(1).toLowerCase()

    if (currentName.includes(searchQuery)) {
      allNamesDOMCollection[counter].style.display = 'block'
      pokemonDesc[counter].style.display = 'block'
      dataName[counter].style.display = 'block'
    } else {
      allNamesDOMCollection[counter].style.display = 'none'
      pokemonDesc[counter].style.display = 'none'
      dataName[counter].style.display = 'none'
    }
  }
})

function typeFilter() {
  let searchQuery = (this.value)
  let pokemonTypes = document.getElementsByClassName('pokemon-types');
  let dataName = document.getElementsByClassName('pokemon')
  let pokemonDesc = document.getElementsByClassName('pokemon-description')
  for (let counter = 0; counter < pokemonTypes.length; counter++) {
    const currentName = pokemonTypes[counter].textContent
    if (currentName.includes(searchQuery)) {
      pokemonTypes[counter].style.display = 'block'
      pokemonDesc[counter].style.display = 'block'
      
      dataName[counter].style.display = 'block'
    } else {
      pokemonTypes[counter].style.display = 'none'
      pokemonDesc[counter].style.display = 'none'
      
      dataName[counter].style.display = 'none'
    }
  }
}

filterType.addEventListener('change', typeFilter)
