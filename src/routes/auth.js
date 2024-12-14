import express from 'express';
import User from '../db/models/user.js';

const userRouter = express.Router();

userRouter.post('/register', function (req, res) {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new User({
    username, lastName, firstName
  });

  newUser.password = newUser.generateHash(password);
  newUser.save()
    .then(() => {
      console.log('User created Successfully')
      res.status(200).send('ok');
    })
    .catch(err => {
      console.log('Error while creating user', err)
      res.status(500).send('User not created');
    });
});


// userRouter.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   User.findOne({ username: username }).then((user) => {
//     if (user.validPassword(password, user.password)) {
//       res.status(200).send('ok');
//     } else {
//       res.status(401).send('Unauthorised', err);
//     }
//   }).catch(err => {
//     console.log('User not found', err)
//     res.status(404).send('Unauthorised');
//   });
// });

export default userRouter;
