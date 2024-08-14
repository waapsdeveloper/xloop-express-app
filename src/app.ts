// src/app.ts
import express from 'express';

import apiRouter from './routes/apis/index';

import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8100', // Ionic Angular project URL
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Enable credentials (e.g., cookies)
  }),
);

app.use(express.json());

app.use('/api', apiRouter);

export default app;
