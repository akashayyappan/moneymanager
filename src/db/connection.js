import mongoose from 'mongoose';

const initializeDB = () => {
  // Mongo DB Connection String
  const uri = process.env.MONGO_DB_URL || '';
  return mongoose.connect(uri)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('Error connecting to DB', err));
}

export default initializeDB;
