// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

/* Register */
exports.register = async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // Check if the email already exists
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Database error.' });
        }
  
        // If email exists, return an error
        if (results.length > 0) {
          return res.status(400).json({ error: 'Email is already registered. Please use a different email.' });
        }
  
        // If email is not registered, proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, email, role: 'user' };
  
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
  
          // Registration successful
          res.status(201).json({ id: result.insertId, username });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user.' });
    }
  };



// Log-In
exports.login = (req, res) => {
  const { email, password } = req.body; // Ensure you're using email, not username

  // Debug log to check if email is being passed correctly
  console.log('Email received:', email);
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
          console.log('No user found with this email:', email);
          return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const user = results[0];
      console.log('User found:', user); // Debug log

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid); // Debug log

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
  });
};

