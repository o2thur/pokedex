const $header = document.getElementById("header");
const $navbar = document.getElementById("navbar");
const $content = document.getElementById("content");

let pokemonType = [];

function sortPokedex() {
  // Return an array with the pokedex alphabeticaly sorted
  return pokedex.slice().sort((a, b) => a.name.localeCompare(b.name));
}

function getFilteredPokemon(type) {
  // Using the sorted array, we filter it by pokemon type
  const sortedPokedex = sortPokedex();
  return sortedPokedex.filter((pokemon) => pokemon.type.includes(type));
}

function showAllPokemons() {
  const sortedPokedex = sortPokedex();

  // Clearing the screen
  $content.innerHTML = "";

  // Creating the content where the cards will be displayed
  const pokemonDisplay = document.createElement("div");
  pokemonDisplay.classList.add("pokemon-display");

  // Fragment where the cards will be stored
  const $fragment = document.createDocumentFragment();

  // Loop to create a card for each element ('pokemon' parameter) in the sortedPokedex array
  sortedPokedex.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon);
    $fragment.appendChild(pokemonCard);
  });

  pokemonDisplay.appendChild($fragment);
  $content.appendChild(pokemonDisplay);
}

function getPokemonType() {
  // Looping through the pokedex array

  pokedex.forEach((pokemon) => {
    const pokeType = pokemon.type;

    // Looping through the type property in each object (since it's an array, we can use forEach)
    pokeType.forEach((type) => {
      if (!pokemonType.includes(type)) {
        // If the pokemonType array does not have that type
        pokemonType.push(type); // Push to the array the type that was iterated
      }
    });
  });
  return pokemonType;
}

function createNavBar() {
  let ulNavBar = document.createElement("ul");

  // Loop to create a <li> element with a <a> for each pokemon type
  pokemonType.forEach((type) => {
    let liNavBar = document.createElement("li");
    let aNavBar = document.createElement("a");
    aNavBar.href = `#${type}`;
    aNavBar.textContent = type;

    // When there is a click, we show every pokemon for that type
    aNavBar.addEventListener("click", (e) => {
      e.preventDefault();
      showPokemonByType(type);
    });

    ulNavBar.appendChild(liNavBar);
    liNavBar.appendChild(aNavBar);
  });
  $navbar.appendChild(ulNavBar);
}

function showPokemonByType(type) {
  $content.innerHTML = "";
  const filteredPokemon = getFilteredPokemon(type);

  // Creating the content where the cards will be displayed

  const pokemonDisplay = document.createElement("div");
  pokemonDisplay.classList.add("pokemon-display");

  createTypeHeader(type, filteredPokemon.length);

  // Fragment where the cards will be stored
  const $fragment = document.createDocumentFragment();

  // Loop to create a card for each element ('pokemon' parameter) in the filteredPokedex array
  filteredPokemon.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon);
    $fragment.appendChild(pokemonCard);
  });
  pokemonDisplay.appendChild($fragment);
  $content.appendChild(pokemonDisplay);
}

function createTypeHeader(type, count) {
  const typeInfo = document.createElement("div");
  typeInfo.classList.add("type-info");

  const typeTitle = document.createElement("h2");
  typeTitle.textContent = `Type: ${type} (${count})`;

  // Sum the HP of all Pokemons in the array
  const typeHP = document.createElement("p");
  const filteredPokemon = getFilteredPokemon(type);
  const totalHP = filteredPokemon.reduce((total, pokemon) => {
    return total + pokemon.base.HP;
  }, 0);
  typeHP.textContent = `Total HP: ${totalHP}`;

  // Sum the ATTACK of all Pokemons in the array
  const typeAttack = document.createElement("p");
  const totalAttack = filteredPokemon.reduce((total, pokemon) => {
    return total + pokemon.base.Attack;
  }, 0);
  typeAttack.textContent = `Total Attack: ${totalAttack}`;

  // Display all Pokemons
  const $displayAll = document.createElement("p");
  $displayAll.classList.add("display-all");
  $displayAll.textContent = "Display All Pokemons";
  $displayAll.addEventListener("click", showAllPokemons);

  typeInfo.appendChild(typeTitle);
  typeInfo.appendChild(typeHP);
  typeInfo.appendChild(typeAttack);
  typeInfo.appendChild($displayAll);
  $content.appendChild(typeInfo);
}

function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  const pokemonCardContent = document.createElement("div");
  pokemonCardContent.classList.add("pokemon-card-content");

  const pokemonName = document.createElement("h1");
  pokemonName.textContent = pokemon.name;

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprite;

  const pokemonLink = document.createElement("a");
  pokemonLink.href = pokemon.url;
  pokemonLink.target = "_blank";

  const statsGrid = document.createElement("div");
  statsGrid.classList.add("stats-grid");

  // Loop to create a <p> element for each stat
  for (const stat in pokemon.base) {
    const statElement = document.createElement("p");
    statElement.classList.add("grid-item");
    statElement.innerHTML = `<strong>${stat}:</strong> ${pokemon.base[stat]}`;
    statsGrid.appendChild(statElement);
  }

  pokemonCardContent.appendChild(pokemonName);
  pokemonCardContent.appendChild(pokemonLink);
  pokemonLink.appendChild(pokemonImage);
  pokemonCardContent.appendChild(statsGrid);

  pokemonCard.appendChild(pokemonCardContent);

  return pokemonCard;
}

showAllPokemons();
getPokemonType();
createNavBar();
