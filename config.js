const User = require("./model.js");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);


passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'Alices\'jwtsecret',
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('secret_token'),
        ExtractJWT.fromBodyField('secret_token')
      ])
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const User = require("./models.js");

// module.exports = function(passport) {
//   passport.use(
//     new LocalStrategy({usernameField : 'email'},(email,password,done)=> {
//       //match user
//       User.findOne({email : email})
//       .then((user)=>{
//         if(!user) {
//           return done(null,false,{message : 'that email is not registered'});
//         }
//         //match pass
//         bcrypt.compare(password,user.password,(err,isMatch)=>{
//           if(err) throw err;

//           if(isMatch) {
//             return done(null,user);
//           } else {
//             return done(null,false,{message : 'pass incorrect'});
//           }
//         })
//       })
//       .catch((err)=> {console.log(err)})
//     })
//   )
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   }); 
// }; 