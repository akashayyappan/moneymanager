import mongoose from 'mongoose';

const url = 'mongodb+srv://akashayyappan:BVuHcGIGPWVGtLT5@moneymanager.kcyf9.mongodb.net/?retryWrites=true&w=majority&appName=moneymanager';

const initializeDB = () => {
  // Mongo DB Connection String
  const uri = process.env.MONGO_DB_URL || '';
  return mongoose.connect(url)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('Error connecting to DB', err));
}

export default initializeDB;
