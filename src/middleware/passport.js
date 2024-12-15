import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../db/models/user.js';

const passportRouter = express.Router();
const LocalStrategy = passportLocal.Strategy;
console.log(LocalStrategy);

passportRouter.use(session({
  secret: "secret1",
  resave: false,
  saveUninitialized: false,
}));

passportRouter.use(passport.initialize());
passportRouter.use(passport.session());

const authenticateUser = (username, password, done) => {
  return User.findOne({ username })
    .then((user) => {
      console.log(user);
      if (user.validPassword(password, user.password)) {
        return done(null, user);
      }
      return done(null, false);
    }).catch(err => done(null, false));
};

passport.use(new LocalStrategy(authenticateUser));

passport.serializeUser((user, done) => {
  console.log('serialize user');
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log('deserialize user', id);
  const user = await User.findOne({ _id: id });
  console.log(user);
  if (!user) done(new Error('User not found'));
  done(null, user);
});

passportRouter.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
  }), (req, res) => {
    res.send('ok');
  });

export default passportRouter;
