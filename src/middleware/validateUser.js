import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';
import Response from '../model/response.js';

const validateUserRoute = express.Router();

validateUserRoute.use((req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).send(Response('Unauthorised'));
    return;
  }
  let jwtToken = null;
  try {
    jwtToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    res.status(401).send(Response('Unauthorised'));
    return;
  }
  if (!jwtToken) {
    res.status(401).send(Response('Unauthorised'));
    return;
  }
  User.findOne({ _id: jwtToken.id }).then((user) => {
    req.user = user;
    next();
  }).catch((err) => res.status(401).send(Response('Unauthorised')));
})

export default validateUserRoute;
