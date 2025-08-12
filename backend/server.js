require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = require('./src/app');

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
