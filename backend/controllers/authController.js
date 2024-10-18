// controllers/authController.js
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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



// Request password reset (send email with token)
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (results.length === 0) {
      return res.status(404).json({ message: 'No user found with this email.' });
    }
    const user = results[0];
    // Create a reset token (you can also use JWT)
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpire = Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRATION); // Using the value from .env

    // Store the token and expiration in the database
    db.query('UPDATE users SET resetToken = ?, resetTokenExpire = ? WHERE id = ?', [token, tokenExpire, user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save reset token.' });
      // Send email with the reset link
      const resetLink = `http://localhost:3000/resetpassword/${token}`;
      // Set up email transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Define the email
      const mailOptions = {
        from: 'noreply@example.com',
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      };
      // Send email
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to send email.' });
        }
        res.json({ message: 'Password reset link sent to your email.' });
      });
    });
  });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log('Reset token:', token); // Log the token
  console.log('New password:', password); // Log the new password

  db.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpire > ?', [token, Date.now()], async (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log the database error
      return res.status(500).json({ error: 'Database error.' });
    }
    
    if (results.length === 0) {
      console.log('No valid user found for this token.'); // Log if token is invalid or expired
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const user = results[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password and clear the reset token
    db.query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpire = NULL WHERE id = ?', [hashedPassword, user.id], (err) => {
      if (err) {
        console.error('Failed to reset password:', err); // Log the error
        return res.status(500).json({ error: 'Failed to reset password.' });
      }

      res.json({ message: 'Password reset successfully.' });
    });
  });
};
