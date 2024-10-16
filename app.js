const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML form)
app.use(express.static('public'));

// MongoDB connection string (use Azure Cosmos DB connection string)
const mongoURI = process.env.MONGODB_URI || 'mongodb://ckcosmosdb:88gzkeJgEZjdRtSJDI6KF3I80AkWYZk3UYrzgNN9Yf1fKibAQlXZwdjxyA7AHd9TIL4IUcOGqSzbACDbIrDbXw==@ckcosmosdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@ckcosmosdb@';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Route for handling form submission
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  newUser.save()
    .then(() => res.send('User registered successfully!'))
    .catch((err) => res.status(500).send('Failed to register user: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
