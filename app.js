const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser')
var config = require('./config'); 

//mongoose
mongoose.connect(
  'mongodb+srv://aliceparent:aliceisabadkid@cluster0.mrvha.mongodb.net/Bill_payment?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology : true}).then(() => {
    console.log('connected,,')
  }).catch((err)=> console.log(err));

// configure app
app.use('*', cors());

//BodyParser
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true}));

//Routes
app.use('/login', require('./login_routes.js'))
app.use('/logged_in', passport.authenticate('jwt', { session: false }), require('./routes.js'));

app.listen(3000); 