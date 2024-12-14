import express from 'express';
import Statement from '../db/models/statement.js';

const dbRouter = express.Router();

// dbRouter.get('/', async (req, res) => {
//   try {
//     const collection = await client.collection('statement');
//     const results = await collection.find({}).limit(50).toArray();

//     res.send(results).status(200);
//     console.log('response sent');
//   } catch (error) {
//     res.send(error).status(500);
//   }
// });

dbRouter.post('/', (req, res) => {
  try {
    const statement = new Statement({
      createOn: new Date.now(),
      createdBy: 'akash',
      bank: 'ICICI',
      fromPeriod: new Date.now(),
      toPeriod: new Date.now(),
      records: {
        date: new Date.now(),
        description: String,
        withrawAmount: 0,
        depositNumber: 0,
        balance: 0
      }
    });

    statement.save()
      .then(() => console.log("Save Successfully"))
      .catch(err => console.log(err));
  } catch (error) {
    res.send(error).status(500);
  }
});

export default dbRouter;
