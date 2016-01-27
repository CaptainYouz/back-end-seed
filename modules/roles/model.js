var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = function() {
  var Role = mongoose.model('Role', new Schema({
    name: String
  }));

  return Role;
};