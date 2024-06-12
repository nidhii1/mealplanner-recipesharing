// const express = require('express');
// const { MongoClient } = require('mongodb');
// const url = 'mongodb://127.0.0.1:27017';
// const database = 'Recipe_Meal_Planner';
// const client = new MongoClient(url);

// const app = express();
// const port=3000

// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }


// async function getData() {
//   try {
//     let result = await client.connect();
//     let db = result.db(database);
//     let collection = db.collection('Signup');
//     let response = await collection.find({}).toArray();
//     console.log(response);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Call the getData function here to initiate the database connection and query
// getData();

// async function insertUserData(userData) {
//   try {
//     let db = client.db(database);
//     let collection = db.collection('Signup');
//     await collection.insertOne(userData);
//     console.log('User data inserted into MongoDB');
//   } catch (error) {
//     console.error('Error inserting user data:', error);
//   }
// }

// const dummyUser = {
//   username: 'sakshi',
//   email: 'sakshi@gmail.com',
//   password: 'hashed_dummy_password_here',
// };

// // Initialize the database with the dummy user
// async function initializeDatabase() {
//   await connectToMongoDB();
//   await insertUserData(dummyUser);
//   console.log('Dummy user data inserted into MongoDB');
// }

// // Call the initialization function when the server starts
// initializeDatabase();

// app.listen(port, () => {
//   connectToMongoDB();
//   console.log(`Server is running on port, ${port}`);
// });











const express = require('express');
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const database = 'Recipe_Meal_Planner';
const client = new MongoClient(url);

const app = express();
const port = 3000;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}



async function insertUserData(userData) {
  try {
    let db = client.db(database);
    let collection = db.collection('Signup');
    await collection.insertOne(userData);
    console.log('User data inserted into MongoDB');
  } catch (error) {
    console.error('Error inserting user data:', error);
  }
}

// Initialize the database connection when the server starts
async function initializeDatabase() {
  await connectToMongoDB();
  console.log('Connected to MongoDB');
}

// Call the initialization function when the server starts
initializeDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add JSON middleware for parsing JSON data

app.post('/submit', async (req, res) => {
  console.log('Received POST request to /submit')
  const userData = {
    username: req.body.txt,
    email: req.body.email,
    password: req.body.pswd, // You should hash the password before storing it
  };

  // Insert the user data into the MongoDB database
  await insertUserData(userData);
  res.redirect('http://127.0.0.1:5500/Gharka_Swaad/Gharka_Swaad/index.html');
  // res.send('Data submitted successfully');
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
