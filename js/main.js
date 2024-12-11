// Data for spells and elixirs
const spells = [
  { name: "Expelliarmus", description: "Disarming charm, used to disarm an opponent." },
  { name: "Lumos", description: "Charm that produces light at the tip of the wand." },
  { name: "Accio", description: "Summoning charm, used to bring objects to the caster." },
  { name: "Wingardium Leviosa", description: "Levitation charm, used to lift objects." },
  { name: "Expecto Patronum", description: "Charm to summon a Patronus to protect from Dementors." }
];

// Function to show the Spells section
function showSpells() {
document.getElementById('spells-section').style.display = 'block';
document.getElementById('elixirs-section').style.display = 'none';
document.getElementById('spells-btn').classList.add('active');
document.getElementById('elixirs-btn').classList.remove('active');
displaySpells(); // Populate spells dynamically
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
  
  // Initialize the page by showing the spells by default
  window.onload = function() {
  showSpells(); // Default to showing spells
  };
  