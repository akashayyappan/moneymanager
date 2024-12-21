import express from 'express';
import User from '../db/models/user.js';
import Response from '../model/response.js';
import jwt from 'jsonwebtoken';
import validateUserRoute from '../middleware/validateUser.js';

const userRouter = express.Router();

userRouter.post('/register', function (req, res) {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new User({
    username, lastName, firstName
  });

  newUser.password = newUser.generateHash(password);
  newUser.save()
    .then(() => {
      res.status(200).send(Response('User created successfully'));
    })
    .catch(err => {
      res.status(500).send(Response('User not created'));
    });
});


userRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (user.validPassword(password)) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 60 * 60 });
      res.status(200).send(Response('User logged in', { token }));
    } else {
      res.status(401).send(Response('Invalid username or password'));
    }
  }).catch(err => {
    res.status(404).send(Response('User not found'));
  });
});

userRouter.get('/user', validateUserRoute, (req, res) => {
  const user = req.user;
  if (user) {
    delete user.password;
    res.send(Response('User successfuly retireved', {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }));
  } else {
    res.status(401).send(Response('Not Authorised'));
  }
})

export default userRouter;
