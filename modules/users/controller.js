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
  function create(user) {
    console.log('controller create user :', user);
    if (user.email && user.firstname && user.lastname) {
      var newUser = new Model({
        name: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      });

      newUser.save(function(err) {
        if (err) throw err;
        console.log('User ' + user.email + ' saved !');
        res.json({success: true});
      });
    }
  }

  /**
   * Get the list of users. If id is avaialble,
   * fetch the specific user
   */
  function get(id) {
    if (id) console.log('controller get user : ' + id);
    else console.log('controller get list of users');
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