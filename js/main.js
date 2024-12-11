// Data for spells and elixirs
const spells = [
  { name: "Expelliarmus", description: "Disarming charm, used to disarm an opponent." },
  { name: "Lumos", description: "Charm that produces light at the tip of the wand." },
  { name: "Accio", description: "Summoning charm, used to bring objects to the caster." },
  { name: "Wingardium Leviosa", description: "Levitation charm, used to lift objects." },
  { name: "Expecto Patronum", description: "Charm to summon a Patronus to protect from Dementors." }
];

const elixirs = [
  { name: "Felix Felicis", description: "Liquid luck; causes the drinker to experience good luck." },
  { name: "Amortentia", description: "The most powerful love potion in the world." },
  { name: "Veritaserum", description: "Truth serum that compels the drinker to speak the truth." },
  { name: "Polyjuice Potion", description: "Potion that allows the drinker to take on the appearance of someone else." }
];

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

// Initialize the page by showing the spells by default
window.onload = function() {
  showSpells(); // Default to showing spells
  };
  