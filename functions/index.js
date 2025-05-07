const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

exports.searchFood = functions.https.onCall(async (data, context) => {
  const query = data.query;
  const apiKey = "alaEKgrAzTT7PQJEGaSaVOi3pPHaInmVh02ceYe1";
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
    query
  )}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const items = response.data.foods.map((food) => ({
      id: food.fdcId,
      name: food.description,
      calories: getCalories(food.foodNutrients),
    }));
    return items;
  } catch (error) {
    console.error("USDA search error:", error.message);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to fetch from USDA"
    );
  }
});

function getCalories(nutrients) {
  const kcal = nutrients.find(
    (n) => n.nutrientName === "Energy" && n.unitName === "KCAL"
  );
  return kcal ? kcal.value : 0;
}
