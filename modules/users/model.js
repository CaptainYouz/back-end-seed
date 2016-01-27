var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = function() {
  var User = mongoose.model('User', new Schema({
    email: String,
    name: String,
    password: String,
    role: String
  }));

  return User;
};