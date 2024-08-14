import express from 'express';

import authRouter from './auth';
import jobRouter from './jobs';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// Apply the prefix to the userRouter
router.use('/auth', authRouter);
router.use('/job', authMiddleware, jobRouter);

export default router;
