//authController.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');  // Import SendGrid package
const multer = require('multer'); // For handling file uploads
const path = require('path');


// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* Register */
exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error.' });
            }
            if (results.length > 0) {
                return res.status(400).json({ error: 'Email is already registered.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { username, password: hashedPassword, email, role: 'user' };

            db.query('INSERT INTO users SET ?', newUser, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: result.insertId, username });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

// Log-In
exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
          token,
          user: {
              id: user.id,
              email: user.email,
              role: user.role // Include role in the response
          }
        });
    });
};

// Request password reset (send email with token)
exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No user found with this email.' });
        }

        const user = results[0];
        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpire = Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRATION);

        db.query('UPDATE users SET resetToken = ?, resetTokenExpire = ? WHERE id = ?', [token, tokenExpire, user.id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save reset token.' });
            }

            const resetLink = `http://localhost:3000/reset-password/${token}`;

            const msg = {
                to: email,
                from: process.env.EMAIL_USER,  // Verified email sender
                subject: 'Password Reset Request',
                text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
            };

            sgMail.send(msg)
                .then(() => {
                    res.json({ message: 'Password reset link sent to your email.' });
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    res.status(500).json({ error: 'Failed to send email.' });
                });
        });
    });
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    db.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpire > ?', [token, Date.now()], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }
        const user = results[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpire = NULL WHERE id = ?', [hashedPassword, user.id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to reset password.' });
            }

            res.json({ message: 'Password reset successfully.' });
        });
    });
};



// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Uploads folder for storing images
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
          return cb(null, true);
      } else {
          cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
}).single('image'); // Single file upload

// Controller to create a blog
exports.createBlog = (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err); // Log any upload errors
            return res.status(400).json({ error: err.message });
        }
  
        const { headline, description, author, publishDate, category} = req.body;
        const image = req.file ? req.file.filename : null;
  
        if (!headline || !description || !author || !publishDate || !category) {
            return res.status(400).json({ error: 'All fields are required!' });
        }
  
        const sql = 'INSERT INTO blogs (headline, description, author, publishDate, image, category) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [headline, description, author, publishDate, image, category], (err, result) => {
            if (err) {
                console.error('Database error:', err); // Log database errors
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Blog created successfully!' });
            console.log("Blog created successfully!")
        });
    });
  };


