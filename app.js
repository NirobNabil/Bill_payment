const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var config = require('./config'); 

//mongoose
mongoose.connect(
  'mongodb+srv://aliceparent:aliceisabadkid@cluster0.19fjt.mongodb.net/webdev_task',
  {useNewUrlParser: true, useUnifiedTopology : true}).then(() => {
    console.log('connected,,')
  }).catch((err)=> console.log(err));


// init cookie parser
app.use(cookieParser());

// configure app
app.use('*', cors());

//BodyParser
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true}));

//Routes
app.use('/login', require('./login_routes.js'))
app.use('/logged_in', passport.authenticate('jwt', { session: false }), require('./routes.js'));

app.listen(3000); 