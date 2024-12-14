import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import dbRouter from './routes/dbroute.js';
import initializeDB from './db/connection.js';

function startServer() {
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(cors());
  app.use(express.json());

  try {
    initializeDB();
  } catch (error) {
    console.log('Error initializing DB', error);
  }

  // Load the /posts routes
  app.use('/db', dbRouter);

  // Global error handling
  app.use((err, _req, res, next) => {
    res.status(500).send('An unexpected error occured.')
  })

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

startServer();
