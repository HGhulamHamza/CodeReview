require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = require('./src/app');

// ✅ Parse JSON body
app.use(express.json());

// ✅ Enable CORS for both local + deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://code-review-kodl.vercel.app/" // replace with actual frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
