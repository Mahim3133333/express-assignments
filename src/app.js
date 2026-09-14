import express from 'express';
import apiRouter from './api/index.js';

const app = express();

app.use(express.json());

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my Cat API!');
});

app.use('/api/v1', apiRouter);

export default app;