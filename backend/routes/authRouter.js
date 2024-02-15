import express from 'express';
import { login, logout, signup } from '../controller/authController.js';

// Create a new router instance
const router = express.Router();

// Define routes for signup, login, and logout
router.post('/signup', signup); // Route for user signup
router.post('/login', login);   // Route for user login
router.post('/logout', logout); // Route for user logout

// Export the router instance
export default router;
