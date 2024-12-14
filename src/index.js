import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from 'passport';

import initializeDB from './db/connection.js';
import userRouter from './routes/auth.js';
import passportRouter from './middleware/passport.js';
import statementRouter from './routes/statement.js';

function startServer() {
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(cors());

  try {
    initializeDB();
  } catch (error) {
    console.log('Error initializing DB', error);
  }

  app.use(express.json());

  app.get('/', (req, res) => res.status(200).send('ok'));

  // load routes
  app.use(userRouter);
  app.use(passportRouter);
  app.use(passport.authenticate('local'));
  app.use('/statement', statementRouter);

  // Load the /posts routes
  // app.use('/test', dbRouter);

  // Global error handling
  // app.use((err, _req, res, next) => {
  //   res.status(500).send('An unexpected error occured.');
  // })

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

startServer();
