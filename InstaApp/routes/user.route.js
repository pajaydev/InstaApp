var express = require('express');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var User = require('../models/user.model');
var router = express.Router();
/* Post method to  sign in with Email */

router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: { email: 'Incorrect email' } });
    }

    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: { password: 'Incorrect password' } });
      }

      user = user.toObject();
      delete user.password;

      var token = createToken(user);
      res.send({ token: token, user: user });
    });
  });
});


/* post method to sign up new user */
router.post('/signup', function(req, res) {
  console.log("Sign up method");
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }

    var user = new User({
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;

        user.save(function() {
          var token = createToken(user);
          res.send({ token: token, user: user });
        });
      });
    });
  });
});


//create token method
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };

  return jwt.encode(payload, config.tokenSecret);
}

module.exports = router;
