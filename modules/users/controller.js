var _ = require('lodash');

module.exports = function(Model) {
  var Users = {
  	create: create,
  	get: get,
  	update: update,
  	remove: remove
  };

  /**
   * Create a user
   */
  function create(req, res) {
    if (!(req.body.name && req.body.email && req.body.password && req.body.role)) res.status(412).send({success: false, message: 'Param name, email, role and password are required'});
    else {
      var user = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      user.save(function(err, newUser) {
        if (err) throw err;
        else res.status(200).send({success: true, user: newUser});
      });
    }
  }

  /**
   * Get the list of users. If id is avaialble,
   * fetch the specific user
   */
  function get(id, res) {
    if (id) {
      Model.find({email: id}, function(err, user) {
        if (err) throw err;
        if (!user.length) res.status(404).send({success: false, message: 'User not found'});
        else if (user.length) res.status(200).send({success: true, user: user});
      });
    } else {
      Model.find({}, function(err, users) {
        if (err) throw err;
        if (!users.length) res.status(404).send({success: false, message: 'No users found'});
        else if (users.length) res.status(200).send({success: true, users: users});
      });
    }
  }

  /**
   * Update a user
   */
  function update(id, body, res) {
    if (id && !_.isEmpty(body)) {
      Model.find({email: id}, function(err, user) {
        if (err) throw err;
        if (!user.length) res.status(404).send({success: false, message: 'User not found'});
        else if (user.length) {
          Model._canBeUpdated.forEach(function(field) {
            if (body[field] !== undefined) user[0][field] = body[field];
          });
          user[0].save(function(err, savedUser) {
            if (err) throw err;
            else res.status(200).send({success: true, user: savedUser});
          });
        }
      });
    } else res.status(412).send({success: false, message: 'You need to provide an id and a body to update corresponding fields'});
  }

  /**
   * Remove a user
   */
  function remove(id, res) {
    if (id) {
      Model.find({email: id}, function(err, user) {
        if (err) throw err;
        if (!user.length) res.status(404).send({success: false, message: 'User not found'});
        else if (user.length) {
          user[0].remove(function (err) {
            if (err) res.status(404).send({success: false, message: 'Error on delete'});
            else res.status(200).send({success: true, users: id + ' has been deleted.'});
          })
        }
      });
    }
  }

  return Users;
};