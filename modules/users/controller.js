module.exports = function() {
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