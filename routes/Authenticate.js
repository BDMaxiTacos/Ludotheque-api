const express = require('express');
const router = express.Router();

const JWTConfig = require('../config/jwt.json');

/*
  CONFIGURATION DE PASSPORT-JWT
 */
const PassportJS = require('passport');
const { UserSchema } = require('../schema/UserSchema');

const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

PassportJS.serializeUser((user, done) => {
  done(null, user);
});

PassportJS.deserializeUser((user, done) => {
  UserSchema.find({ mail: user.mail }, (err, usrObj) => {
    done(err, usrObj);
  });
});

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

PassportJS.use(
  new JWTStrategy(
    {
      secretOrKey: JWTConfig.PRIVATE_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

PassportJS.use('login', new LocalStrategy({
  usernameField: 'mail',
  passwordField: 'password',
}, (mail, password, done) => {
  UserSchema.findOne({ mail }).then((response) => {
    if (!response) {
      console.log('NO USER FOUND');
      return done(null, false, { message: 'NO USER FOUND' });
    }

    console.log(password, response.password);

    if (!Bcrypt.compareSync(password, response.password)) {
      console.log('INVALID PASSWORD');
      return done(null, false, { message: 'INVALID PASSWORD' });
    }

    return done(null, response);
  });
}));

router.post('/authenticate', async (request, response, next) => {
  PassportJS.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');

          return next(error);
        }

        request.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const jsonObject = {
              user: {
                _id: user._id,
                mail: user.mail,
                roles: user.roles,
              },
            };
            const token = JWT.sign(jsonObject, JWTConfig.PRIVATE_KEY);

            return response.json({ token });
          },
        );
      } catch (error) {
        return next(error);
      }
    },
  )(request, response, next);
});

module.exports = router;
