const express = require('express');
const router  = express.Router();
const path = require('path')
const passport = require('passport')
const jwt = require('jsonwebtoken');

router.post(
  '/',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');
            return next("authentication error");
          }
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'Alices\'jwtsecret');
              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;
