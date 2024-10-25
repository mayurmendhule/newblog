// routes/authRoutes.js
const express = require('express');
const { register, login, forgotPassword, resetPassword, createBlog } = require('../controllers/authController'); // Adjusted import
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/create', createBlog); // Correct function name for blog creation

module.exports = router;


//mayurblogapp23
//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