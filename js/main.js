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

// Show Spells
async function showSpells() {
  try {
      const response = await fetch(spellsAPI);
      if (!response.ok) {  // Check if response is successful (status code 200-299)
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const spells = await response.json();
      const container = document.getElementById("spells-container");
      container.innerHTML = "";

      spells.forEach(spell => {
          const card = document.createElement("div");
          card.className = "spell-card";
          card.innerHTML = `
              <h3>${spell.name}</h3>
              <p>${spell.description || "No description available"}</p>
              <button class="favorite-btn ${favorites.spells.includes(spell.name) ? "liked" : ""}" onclick="toggleFavorite('spells', '${spell.name}')">♡</button>
          `;
          container.appendChild(card);
      });

      document.getElementById("spells-section").style.display = "block";
      document.getElementById("elixirs-section").style.display = "none";
      document.getElementById("characters-section").style.display = "none";

      updateFavoritesDropdown();  // Update dropdown when a new section is shown

  } catch (error) {
      console.error("Failed to fetch spells:", error);
      alert("Sorry, there was an error loading the spells. Please try again later.");
  }
}

// Show Elixirs
async function showElixirs() {
  try {
      let allElixirs = [];
      for (let api of elixirsAPI) {
          const response = await fetch(api);
          if (!response.ok) {  // Check if response is successful
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const elixirs = await response.json();
          allElixirs = [...allElixirs, ...elixirs];
      }
      const container = document.getElementById("elixirs-container");
      container.innerHTML = "";

      allElixirs.forEach(elixir => {
          const card = document.createElement("div");
          card.className = "elixir-card";
          card.innerHTML = `
              <h3>${elixir.name}</h3>
              <p>Difficulty: ${elixir.difficulty}</p>
              <p>Ingredients: ${elixir.ingredients.length > 0 ? elixir.ingredients.map(ingredient => ingredient.name).join(", ") : "N/A"}</p>
              <button class="favorite-btn ${favorites.elixirs.includes(elixir.name) ? "liked" : ""}" onclick="toggleFavorite('elixirs', '${elixir.name}')">♡</button>
          `;
          container.appendChild(card);
      });

      document.getElementById("spells-section").style.display = "none";
      document.getElementById("elixirs-section").style.display = "block";
      document.getElementById("characters-section").style.display = "none";

      updateFavoritesDropdown();  // Update dropdown when a new section is shown

  } catch (error) {
      console.error("Failed to fetch elixirs:", error);
      alert("Sorry, there was an error loading the elixirs. Please try again later.");
  }
}

// Show Characters
async function showCharacters() {
  try {
      const response = await fetch(charactersAPI);
      if (!response.ok) {  // Check if response is successful
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const characters = await response.json();
      const container = document.getElementById("characters-container");
      container.innerHTML = "";

      characters.forEach(character => {
          const card = document.createElement("div");
          card.className = "character-card";
          card.innerHTML = `
              <h3>${character.name}</h3>
              <p>Gender: ${character.gender}</p>
              <p>Birth: ${character.dateOfBirth}</p>
              <p>Ancestry: ${character.ancestry}</p>
              <p>Wand: ${character.wand.wood} (${character.wand.core})</p>
              <button class="favorite-btn ${favorites.characters.includes(character.name) ? "liked" : ""}" onclick="toggleFavorite('characters', '${character.name}')">♡</button>
          `;
          container.appendChild(card);
      });

      document.getElementById("spells-section").style.display = "none";
      document.getElementById("elixirs-section").style.display = "none";
      document.getElementById("characters-section").style.display = "block";

      updateFavoritesDropdown();  // Update dropdown when a new section is shown

  } catch (error) {
      console.error("Failed to fetch characters:", error);
      alert("Sorry, there was an error loading the characters. Please try again later.");
  }
}

// Toggle Favorite
function toggleFavorite(type, name) {
  const index = favorites[type].indexOf(name);
  if (index === -1) {
      favorites[type].push(name);
  } else {
      favorites[type].splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Update the heart icon immediately
  const heartBtn = document.querySelector(`button[onclick="toggleFavorite('${type}', '${name}')"]`);
  heartBtn.classList.toggle("liked", favorites[type].includes(name));

  updateFavoritesDropdown();  // Update dropdown whenever favorites are toggled
}

// Show and update Favorites Dropdown
function updateFavoritesDropdown() {
  const favoritesList = document.getElementById("favorites-list");
  favoritesList.innerHTML = "";

  for (const type of ["spells", "elixirs", "characters"]) {
      favorites[type].forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          favoritesList.appendChild(li);
      });
  }
}

// Toggle Favorites Dropdown visibility
function toggleFavoritesDropdown() {
  const dropdown = document.getElementById("favorites-dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Clear All Favorites
function clearFavorites() {
  // Clear favorites from localStorage
  localStorage.removeItem("favorites");
  
  // Reset favorites in memory
  favorites.spells = [];
  favorites.elixirs = [];
  favorites.characters = [];

  // Reset heart icons to unfilled state
  const allFavoriteButtons = document.querySelectorAll('.favorite-btn');
  allFavoriteButtons.forEach(button => {
      button.classList.remove("liked"); // Remove "liked" class (red heart)
  });

  // Update the favorites dropdown
  updateFavoritesDropdown();
}

// Set default section
window.onload = function() {
  showSpells();
  updateFavoritesDropdown();  // Ensure dropdown is populated on page load
}
