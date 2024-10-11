const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

let currentPokemonId = 25;

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`${API_URL}${pokemon}`);
    if (!response.ok) {
      throw new Error('Pokémon introuvable');
    }
    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayPokemon(data) {
  document.getElementById('pokemon-name').textContent = capitalizeFirstLetter(data.name);
  document.getElementById('pokemon-id').textContent = data.id;
  document.getElementById('pokemon-height').textContent = data.height / 10;
  document.getElementById('pokemon-weight').textContent = data.weight / 10;

  const types = data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ');
  document.getElementById('pokemon-types').textContent = types;

  const abilities = data.abilities.map(abilityInfo => capitalizeFirstLetter(abilityInfo.ability.name)).join(', ');
  document.getElementById('pokemon-abilities').textContent = abilities;

  currentPokemonId = data.id;
  toggleNavigationButtons();
}

function toggleNavigationButtons() {
  document.getElementById('prev-btn').disabled = currentPokemonId === 1;
  document.getElementById('next-btn').disabled = currentPokemonId >= 1025;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById('search-btn').addEventListener('click', () => {
  const searchInput = document.getElementById('pokemon-search').value.trim().toLowerCase();
  if (searchInput) {
    fetchPokemon(searchInput);
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  fetchPokemon(currentPokemonId + 1);
});

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPokemonId > 1) {
    fetchPokemon(currentPokemonId - 1);
  }
});

window.onload = () => {
  fetchPokemon(currentPokemonId);
};
