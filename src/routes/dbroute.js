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
  const statement = new Statement({
    createOn: Date.now(),
    createdBy: 'akash',
    bank: 'ICICI',
    fromPeriod: Date.now(),
    toPeriod: Date.now(),
    records: {
      date: Date.now(),
      description: 'something',
      withrawAmount: 0,
      depositNumber: 0,
      balance: 0
    }
  });

  statement.save()
    .then(() => {
      console.log('Save Successfully')
      res.send().status(200);
    })
    .catch(err => {
      console.log('Error', err);
      res.status(400).send(err);
    });
});

export default dbRouter;
