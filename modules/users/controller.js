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
  function create(req,res) {
    if (!(req.body.name && req.body.email && req.body.password)) res.status(412).send({success: false, message: 'Param name, email and password are required'});
    else {
      var user = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
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
        if (!users) res.status(404).send({success: false, message: 'No users found'});
        else if (users) res.status(200).send({success: true, users: users});
      });
    }
  }

  /**
   * Update a user
   */
  function update(id, user) {
    console.log('controller update user : ' + id + ' with field : ', user);
  }

  /**
   * Remove a user
   */
  function remove(id) {
    console.log('controller remove user : ' + id);
  }

  return Users;
};