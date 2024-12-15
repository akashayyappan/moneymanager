import express from 'express';
import Account from '../db/models/account.js';
import Response from '../model/response.js';

const accountRouter = express.Router();

accountRouter.post('/', (req, res) => {
  const { name, shortName } = req.body;
  const userId = req.user._id;
  const account = new Account({
    name,
    createdBy: userId,
    shortName,
  });

  account.save().then((acc) => {
    res.status(200).send(Response('Account created', acc))
  }).catch(err => res.status(500).send(Response('Account creation failed')));
});

accountRouter.get('/', (req, res) => {
  Account.find().then((accountData) => {
    res.send(Response('Account retireved successfuly', accountData));
  }).catch(err => res.status(500).send(Response('Accounts cannot be retrieved')));
});

accountRouter.delete('/', (req, res) => {
  const { id } = req.body;
  const errFun = (err) => {
    res.status(500).send(Response('Failed to delete account data'));
  }

  Account.findOne({ _id: id }).then((account) => {
    account.deleteOne().then((accountResponse) => {
      res.send(Response('Account data deleted Successfuly'));
    }).catch(errFun);
  }).catch(errFun);
})

export default accountRouter;
