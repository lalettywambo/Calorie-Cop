/* ============================================================
   Calorie Counter — script.js
   Handles adding, removing and resetting food items,
   and saves them to localStorage so the list survives
   a page refresh.
   ============================================================ */

// ---------- DOM elements ----------
const foodForm = document.querySelector('#food-form');
const foodNameInput = document.querySelector('#food-name');
const foodCaloriesInput = document.querySelector('#food-calories');
const foodList = document.querySelector('#food-list');
const totalCaloriesEl = document.querySelector('#total-calories');
const progressBar = document.querySelector('#progress-bar');
const emptyMessage = document.querySelector('#empty-message');
const resetBtn = document.querySelector('#reset-btn');
const lookupBtn = document.querySelector('#lookup-btn');
const lookupMessage = document.querySelector('#lookup-message');

// ---------- App state ----------
const STORAGE_KEY = 'calorieCounter.foods'; // key used in localStorage
const DAILY_GOAL = 2000;                    // daily calorie goal (kcal)

// `foods` is an array of objects, e.g. { id: 17283, name: 'Chapati', calories: 240 }
let foods = loadFoods();

// ---------- localStorage helpers ----------

/**
 * Load saved foods from localStorage.
 * Returns an empty array if nothing is saved yet.
 */
function loadFoods() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Save the current foods array to localStorage
 * so the list survives a page refresh.
 */
function saveFoods() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
}

// ---------- Core functions ----------

/**
 * Add a new food item to the list, then save and re-render.
 * @param {string} name - the food name
 * @param {number} calories - calories for that food
 */
function addFood(name, calories) {
  const newFood = {
    id: Date.now(), // simple unique id based on the current time
    name,
    calories,
  };

  foods.push(newFood);
  saveFoods();
  render();
}

/**
 * Remove one food item by its id.
 * @param {number} id - the id of the food to remove
 */
function removeFood(id) {
  foods = foods.filter((food) => food.id !== id);
  saveFoods();
  render();
}

/**
 * Clear everything to start a fresh day.
 */
function resetDay() {
  foods = [];
  saveFoods();
  render();
}

/**
 * Add up the calories of every food in the list.
 * @returns {number} total calories for the day
 */
function getTotalCalories() {
  return foods.reduce((total, food) => total + food.calories, 0);
}

// ---------- Rendering ----------

/**
 * Redraw the food list, the total and the progress bar
 * so the page always matches the `foods` array.
 */
function render() {
  // 1. Clear the current list
  foodList.innerHTML = '';

  // 2. Show or hide the "nothing logged yet" message
  emptyMessage.style.display = foods.length === 0 ? 'block' : 'none';

  // 3. Build one list item per food
  foods.forEach((food) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-3';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = food.name;
    nameSpan.className = 'font-medium';

    const rightSide = document.createElement('div');
    rightSide.className = 'flex items-center gap-4';

    const caloriesSpan = document.createElement('span');
    caloriesSpan.textContent = `${food.calories} kcal`;
    caloriesSpan.className = 'text-stone-500';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'font-bold text-blush-400 hover:text-blush-600';
    // store the food's id on the button so we know which one to delete
    deleteBtn.dataset.id = food.id;

    rightSide.append(caloriesSpan, deleteBtn);
    li.append(nameSpan, rightSide);
    foodList.append(li);
  });

  // 4. Update the total and the progress bar
  const total = getTotalCalories();
  totalCaloriesEl.textContent = total;

  const percent = Math.min((total / DAILY_GOAL) * 100, 100);
  progressBar.style.width = `${percent}%`;
}

// ---------- Fetch API: calorie lookup (simulated) ----------

// Mini calorie database (kcal per typical serving).
// A real app would get this from a food API — here we keep it
// local and use a placeholder API to simulate the request.
const FOOD_DATA = {
  chapati: 240,
  ugali: 180,
  mandazi: 200,
  githeri: 310,
  rice: 205,
  chicken: 280,
  'beef stew': 350,
  'sukuma wiki': 60,
  banana: 105,
  avocado: 160,
  egg: 78,
  bread: 80,
  'milk tea': 120,
  soda: 150,
  fries: 365,
};

/**
 * Look up calories for the food typed in the name input.
 * Uses the Fetch API with a placeholder API (jsonplaceholder)
 * to simulate requesting data from a real food API, then
 * fills in the calories from our mini database.
 */
async function lookupCalories() {
  const name = foodNameInput.value.trim().toLowerCase();

  if (!name) {
    lookupMessage.textContent = 'Type a food name first.';
    return;
  }

  lookupMessage.textContent = 'Looking it up...';

  try {
    // Simulated API call — jsonplaceholder returns fake data,
    // but it lets us practise a real network request.
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    await response.json(); // parse the (placeholder) response

    // Now answer from our mini database
    const kcal = FOOD_DATA[name];

    if (kcal) {
      foodCaloriesInput.value = kcal;
      lookupMessage.textContent = `Found it! ≈ ${kcal} kcal.`;
    } else {
      lookupMessage.textContent = 'Not in our database — enter the calories manually.';
    }
  } catch (error) {
    // show a friendly message instead of a broken page
    lookupMessage.textContent = 'Could not reach the food database. Check your connection and try again.';
    console.error('Lookup failed:', error);
  }
}

// ---------- Event listeners ----------

// Add a food when the form is submitted
foodForm.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading

  const name = foodNameInput.value.trim();
  const calories = Number(foodCaloriesInput.value);

  if (!name || calories <= 0) return; // basic validation

  addFood(name, calories);
  foodForm.reset();
  foodNameInput.focus();
});

// Delete a food when its ✕ button is clicked (event delegation:
// one listener on the list handles clicks for every delete button)
foodList.addEventListener('click', (event) => {
  if (event.target.matches('button[data-id]')) {
    removeFood(Number(event.target.dataset.id));
  }
});

// Reset the whole day
resetBtn.addEventListener('click', () => {
  const confirmed = confirm('Clear all food items and start a new day?');
  if (confirmed) resetDay();
});

// Calorie lookup button
lookupBtn.addEventListener('click', lookupCalories);

// ---------- Initial render on page load ----------
render();