var _ = require('lodash');

module.exports = function(Model, RES) {
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
        if (err) RES.error(res, 500, err.message);
        else RES.success(res, 'User created', newUser);
      });
    }
  }

  /**
   * Get the list of users. If id is avaialble,
   * fetch the specific user
   */
  function get(id, res) {
    if (id) {
      Model.find({_id: id}, function(err, user) {
        if (err) RES.error(res, 404, 'User not found');
        else if (user.length) RES.success(res, 'User with id' + id, user[0]);
      });
    } else {
      Model.find({}, function(err, users) {
        if (err) RES.error(res, 404, 'Users not found');
        else if (users.length) RES.success(res, 'List of users', users);
      });
    }
  }

  /**
   * Update a user
   */
  function update(id, body, res) {
    if (id && !_.isEmpty(body)) {
      Model.find({_id: id}, function(err, user) {
        if (err || !user.length) RES.error(res, 404, 'User not found');
        else if (user.length) {
          Model._canBeUpdated.forEach(function(field) {
            if (body[field] !== undefined) user[0][field] = body[field];
          });

          user[0].save(function(err, updatedUser) {
            if (err) RES.error(res, 404, err.message);
            else RES.success(res, 'Updated user', updatedUser);
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
      Model.find({_id: id}, function(err, user) {
        if (err || !user.length) RES.error(res, 404, 'User not found');
        else if (user.length) {
          user[0].remove(function (err, deletedUser) {
            if (err) RES.error(res, 404, err.message);
            else RES.success(res, 'Deleted user', deletedUser);
          });
        }
      });
    }
  }

  return Users;
};