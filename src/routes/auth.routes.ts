import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', validateBody(registerSchema), registerUser);

// @route   POST /api/auth/login
router.post('/login', validateBody(loginSchema), loginUser);

// @route   GET /api/auth/me
router.get('/me', protect, getUserProfile);

export default router;