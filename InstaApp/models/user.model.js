var mongoose = require('mongoose');
var config = require('../config');

var User = mongoose.model('User', new mongoose.Schema({

	instagramId: {
		type: String,
		index: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		select: false
	},
	username: String,
	fullName: String,
	picture: String,
	accessToken: String

}
));

module.exports = User;