import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import initializeDB from './db/connection.js';
import userRouter from './routes/auth.js';
import statementRouter from './routes/statement.js';
import accountRouter from './routes/account.js';
import validateUserRoute from './middleware/validateUser.js';
import vendorRouter from './routes/vendor.js';

function startServer() {
  try {
    initializeDB();
  } catch (error) {
    console.log('Error initializing DB', error);
  }

  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(fileUpload());

  // load routes
  app.use(userRouter);
  app.use(validateUserRoute);
  app.use('/statement', statementRouter);
  app.use('/account', accountRouter);
  app.use('/vendor', vendorRouter);

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
