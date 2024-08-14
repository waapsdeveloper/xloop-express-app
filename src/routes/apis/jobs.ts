import express from 'express';
import * as ctrl from '../../controllers/jobsController';

const router = express.Router();

router.get('/list', ctrl.jobList);

export default router;
