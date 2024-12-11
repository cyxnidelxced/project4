//APIs
const spellsAPI = "https://hp-api.herokuapp.com/api/spells";
const elixirsAPI = [
    "https://wizard-world-api.herokuapp.com/Elixirs?Difficulty=Beginner",
    "https://wizard-world-api.herokuapp.com/Elixirs?Difficulty=Moderate",
    "https://wizard-world-api.herokuapp.com/Elixirs?Difficulty=Advanced"
];
const charactersAPI = "https://hp-api.herokuapp.com/api/characters";

// Store favorites in localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || {
  spells: [],
  elixirs: [],
  characters: []
};

// Function to show the Spells section
function showSpells() {
document.getElementById('spells-section').style.display = 'block';
document.getElementById('elixirs-section').style.display = 'none';
document.getElementById('spells-btn').classList.add('active');
document.getElementById('elixirs-btn').classList.remove('active');
displaySpells(); // Populate spells dynamically
}

// Function to show the Elixirs section
function showElixirs() {
document.getElementById('spells-section').style.display = 'none';
document.getElementById('elixirs-section').style.display = 'block';
document.getElementById('spells-btn').classList.remove('active');
document.getElementById('elixirs-btn').classList.add('active');
displayElixirs(); // Populate elixirs dynamically
}

// Function to display spells dynamically
function displaySpells() {
const container = document.getElementById('spells-container');
container.innerHTML = ''; // Clear the container before adding new items

spells.forEach((spell, index) => {
  const card = document.createElement('div');
  card.classList.add('spell-card');
  card.innerHTML = `
    <h3>${spell.name}</h3>
    <p>${spell.description}</p>
    <button class="favorite-btn" onclick="toggleFavorite(${index}, 'spell')">&#9825;</button>
  `;
  container.appendChild(card);
});
}

// Function to display elixirs dynamically
function displayElixirs() {
const container = document.getElementById('elixirs-container');
container.innerHTML = ''; // Clear the container before adding new items

elixirs.forEach((elixir, index) => {
  const card = document.createElement('div');
  card.classList.add('elixir-card');
  card.innerHTML = `
    <h3>${elixir.name}</h3>
    <p>${elixir.description}</p>
    <button class="favorite-btn" onclick="toggleFavorite(${index}, 'elixir')">&#9825;</button>
  `;
  container.appendChild(card);
});
}

// Function to toggle favorite status
function toggleFavorite(index, type) {
const isSpell = type === 'spell';
const item = isSpell ? spells[index] : elixirs[index];
const heartButton = event.target;

// Check if item is already in favorites
const itemIndex = favorites.findIndex(fav => fav.type === type && fav.index === index);

if (itemIndex > -1) {
  // Item already in favorites, remove it
  favorites.splice(itemIndex, 1);
  heartButton.classList.remove('liked');
} else {
  // Add item to favorites
  favorites.push({ type, index });
  heartButton.classList.add('liked');
}

// Update favorites list dropdown
updateFavoritesDropdown();
}

// Function to update the favorites dropdown list
function updateFavoritesDropdown() {
const favoritesList = document.getElementById('favorites-list');
favoritesList.innerHTML = ''; // Clear the list

favorites.forEach(fav => {
  const item = fav.type === 'spell' ? spells[fav.index] : elixirs[fav.index];
  const listItem = document.createElement('li');
  listItem.textContent = item.name;
  favoritesList.appendChild(listItem);
});
}

// Toggle the favorites dropdown
function toggleFavoritesDropdown() {
const dropdown = document.getElementById('favorites-dropdown');
dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Clear all favorites and reset heart icons
function clearFavorites() {
favorites = [];
updateFavoritesDropdown(); // Update the dropdown
const heartButtons = document.querySelectorAll('.favorite-btn');
heartButtons.forEach(button => button.classList.remove('liked')); // Reset all hearts
}

// Initialize the page by showing the spells by default
window.onload = function() {
showSpells(); // Default to showing spells
};