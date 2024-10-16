// Import necessary modules
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
// const auth = require("./router/auth");
const mongoose = require("mongoose");

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

// ###########################################################################################



// const http = require("http");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// // const auth = require("./router/auth");
// const mongoose = require("mongoose");
// // const cookieParser = require("cookie-parser");

// const app = express();
// mongoose.connect(
//   "mongodb://0.0.0.0:27017/techzar",
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("connected to db success");
//   }
// );
// // const corsOptions ={
// //   origin:'*',
// //   credentials:true, //access-control-allow-credentials:true
// //    optionSuccessStatus:200,
// // }
// app.set("trust proxy", 1);
// // app.use(cookieParser());

// const path = require("path");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use("/", auth);
// app.use(express.static("public"));
// app.use("/uploads", express.static("uploads"));
// app.listen(4000, () => console.log("bas"));

