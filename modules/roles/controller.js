module.exports = function(Model) {
  var Roles = {
  	create: create,
  	get: get,
  	update: update,
  	remove: remove
  };

  /**
   * Create a role
   */
  function create(req,res) {
    if (!req.body.name) res.status(412).send({success: false, message: 'Param name are required'});
    else {
      var role = new Model({
        name: req.body.name
      });

      role.save(function(err, newRole) {
        if (err) throw err;
        else res.status(200).send({success: true, role: newRole});
      });
    }
  }

  /**
   * Get the list of roles. If id is avaialble,
   * fetch the specific role
   */
  function get(id, res) {
    if (id) {
      Model.find({name: id}, function(err, role) {
        if (err) throw err;
        if (!role.length) res.status(404).send({success: false, message: 'Role not found'});
        else if (role.length) res.status(200).send({success: true, role: role});
      });
    } else {
      Model.find({}, function(err, roles) {
        if (err) throw err;
        if (!roles) res.status(404).send({success: false, message: 'No roles found'});
        else if (roles) res.status(200).send({success: true, roles: roles});
      });
    }
  }

  /**
   * Update a role
   */
  function update(id, role) {
    console.log('controller update role : ' + id + ' with field : ', role);
  }

  /**
   * Remove a role
   */
  function remove(id) {
    console.log('controller remove role : ' + id);
  }

  return Roles;
};