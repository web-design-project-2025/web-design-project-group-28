document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  // Search button logic
  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
      resultsContainer.innerHTML = "<p>Please enter a food item.</p>";
      return;
    }

    resultsContainer.innerHTML = "<p>Loading...</p>";
    try {
      const response = await fetch(
        `https://wger.de/api/v2/ingredient/search/?term=${encodeURIComponent(
          query
        )}`
      ); // API implementation
      const data = await response.json();

      if (data.suggestions.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      const ingredientId = data.suggestions[0].data.id;
      const nutritionResponse = await fetch(
        `https://wger.de/api/v2/ingredient/${ingredientId}/`
      ); // Fetching data from the API
      const nutrition = await nutritionResponse.json();

      resultsContainer.innerHTML = `
        <div class="nutrition-card">
          <h2>${nutrition.name}</h2>
          <p><strong>Calories:</strong> ${nutrition.energy} kcal</p>
          <p><strong>Protein:</strong> ${nutrition.protein} g</p>
          <p><strong>Carbohydrates:</strong> ${nutrition.carbohydrates} g</p>
          <p><strong>Fat:</strong> ${nutrition.fat} g</p>
        </div>
      `;
    } catch (err) {
      console.error("Error fetching nutrition data:", err);
      resultsContainer.innerHTML =
        "<p>Error retrieving data. Please try again.</p>";
    }
  });

  function addToFavorites(name, protein, carbs, fat) {
    const favorites = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
    if (!favorites.find((f) => f.name === name)) {
      favorites.push({ name, protein, carbs, fat });
      localStorage.setItem("favoriteMeals", JSON.stringify(favorites));
      renderFavorites();
    }
  }

  function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
    const favContainer = document.getElementById("favorite-meals");
    favContainer.innerHTML = "";

    if (favorites.length === 0) {
      favContainer.innerHTML = "<p>No favorite meals yet.</p>";
      return;
    }

    favorites.forEach((meal) => {
      favContainer.innerHTML += `
        <div class="nutrition-card">
          <h2>${meal.name}</h2>
          <p><strong>Protein:</strong> ${meal.protein} g</p>
          <p><strong>Carbs:</strong> ${meal.carbs} g</p>
          <p><strong>Fat:</strong> ${meal.fat} g</p>
        </div>
      `;
    });
  }

  let weeklyPlans = {};

  async function loadWeeklyMealPlans() {
    try {
      const response = await fetch("data/nutrition_guide.json");
      weeklyPlans = await response.json();
      showMealPlan("vegetarian");
      highlightActiveTab("category-vegetarian");
    } catch (err) {
      console.error("Failed to load meal plans:", err);
    }
  }

  function showMealPlan(category) {
    const planContainer = document.getElementById("meal-plan-output");
    planContainer.innerHTML = "";

    const data = weeklyPlans[category];
    if (!data) {
      planContainer.innerHTML = `<p>No data for ${category} category.</p>`;
      return;
    }

    for (const [day, meals] of Object.entries(data)) {
      planContainer.innerHTML += `
        <div class="meal-day-card">
          <h3>${day}</h3>
          <ul>
            <li><strong>Breakfast:</strong> ${meals.Breakfast.name} (${meals.Breakfast.protein}g P / ${meals.Breakfast.carbs}g C / ${meals.Breakfast.fat}g F)</li>
            <li><strong>Lunch:</strong> ${meals.Lunch.name} (${meals.Lunch.protein}g P / ${meals.Lunch.carbs}g C / ${meals.Lunch.fat}g F)</li>
            <li><strong>Dinner:</strong> ${meals.Dinner.name} (${meals.Dinner.protein}g P / ${meals.Dinner.carbs}g C / ${meals.Dinner.fat}g F)</li>
          </ul>
        </div>
      `;
    }
  }

  function highlightActiveTab(activeId) {
    const tabs = ["category-vegan", "category-vegetarian", "category-nonveg"];
    tabs.forEach((id) => {
      document.getElementById(id).classList.remove("active-tab");
    });
    document.getElementById(activeId).classList.add("active-tab");
  }

  document.getElementById("category-vegan").addEventListener("click", () => {
    showMealPlan("vegan");
    highlightActiveTab("category-vegan");
  });

  document
    .getElementById("category-vegetarian")
    .addEventListener("click", () => {
      showMealPlan("vegetarian");
      highlightActiveTab("category-vegetarian");
    });

  document.getElementById("category-nonveg").addEventListener("click", () => {
    showMealPlan("non_vegetarian");
    highlightActiveTab("category-nonveg");
  });

  renderFavorites();
  loadWeeklyMealPlans();

  // Mobile Navigation code
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});
