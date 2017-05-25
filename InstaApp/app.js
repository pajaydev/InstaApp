/* Main file to load backend files(Express and Mongo)*/

var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var config = require('./config');
var app = express();

//connect to DB
//connecting to Mongoose db
console.log(config.db);
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});


app.set('port', process.env.PORT || 3000);
app.use(cors());

//bodyparser to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//To load front end files in public folder
app.use(express.static(path.join(__dirname, 'public')));

//including Routes for user
var routes = require('./routes/user.route');
app.use('/auth', routes);



app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});