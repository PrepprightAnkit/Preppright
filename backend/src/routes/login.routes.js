import express from 'express';
import { loginUser } from '../controllers/login.controller.js';

const router = express.Router();

// POST /api/v1/users/login
router.post('/login', loginUser);

export default router;
