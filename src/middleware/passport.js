import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { ObjectId } from 'mongodb';
import User from '../db/models/user.js';

const passportRouter = express.Router();

passportRouter.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

passportRouter.use(passport.initialize());
passportRouter.use(passport.session());

const authenticateUser = (username, password, done) => {
  return User.findOne({ username })
    .then((user) => {
      if (user.validPassword(password, user.password)) {
        return done(null, user);
      }
      return done(new Error('Unauthorised'));
    }).catch(err => done(err));
};

passport.use(new LocalStrategy(authenticateUser));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

passportRouter.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.status(200).send('ok');
  });

export default passportRouter;
