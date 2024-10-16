//server.js
const express = require('express');
const dotenv = require('dotenv'); // Fixed the import from '.env' to 'dotenv'
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
