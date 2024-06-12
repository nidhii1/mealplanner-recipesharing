const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const url = 'mongodb://127.0.0.1:27017';
const database = 'Recipe_Meal_Planner';
const client = new MongoClient(url);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function insertRecipeData(recipeData) {
  try {
    let db = client.db(database);
    let collection = db.collection('Recipes'); // Assuming you have a 'Recipes' collection in your database
    await collection.insertOne(recipeData);
    console.log('Recipe data inserted into MongoDB');
  } catch (error) {
    console.error('Error inserting recipe data:', error);
  }
}

// Initialize the database connection when the server starts
async function initializeDatabase() {
  await connectToMongoDB();
  console.log('Connected to MongoDB');
}

// Call the initialization function when the server starts
initializeDatabase();

app.get('/',(req,res)=>{
  res.render('http://127.0.0.1:5500/Gharka_Swaad/Gharka_Swaad/addrecipe.html')
})

app.post('/add_recipe', async (req, res) => {
  console.log('Received POST request to /add-recipe');
  const recipe_name = req.body.recipe_name;
  const recipe_category = req.body.recipe_category;
  const recipe_ingredients = req.body.recipe_ingredients;
  const recipe_steps = req.body.recipe_steps;
  console.log(recipe_name);
  const recipe = {
    recipe_name,
    recipe_category,
    recipe_ingredients,
    recipe_steps
    // You can add more fields like image here
  };
  await connectToMongoDB();
  // Insert the recipe data into the MongoDB database
  await insertRecipeData(recipe);
  res.redirect('http://127.0.0.1:5500/Gharka_Swaad/Gharka_Swaad/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
