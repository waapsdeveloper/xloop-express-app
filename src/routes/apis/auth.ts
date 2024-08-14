// src/routes/authRoutes.ts
import express from 'express';
import * as ctrl from '../../controllers/authController';

const router = express.Router();

router.post('/login', ctrl.loginUser);

export default router;
