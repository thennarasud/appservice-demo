// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://ckcosmosdb:88gzkeJgEZjdRtSJDI6KF3I80AkWYZk3UYrzgNN9Yf1fKibAQlXZwdjxyA7AHd9TIL4IUcOGqSzbACDbIrDbXw==@ckcosmosdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@ckcosmosdb@';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Define a route for user registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    res.send('User registered successfully!');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Failed to register user: ' + err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
