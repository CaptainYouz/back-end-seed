var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = function() {
  var userSchema = new Schema({
    email: {type: String, uniq: true, required: true},
    name: String,
    password: {type: String, required: true},
    role: {type: String, required: true}
  });

  var User = mongoose.model('User', userSchema);

  User._canBeUpdated = ['name'];

  return User;
};