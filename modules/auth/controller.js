var jwt = require('jsonwebtoken');

module.exports = function(app) {
  var Auth = {
    login: login,
    hasAccess: hasAccess
  };

  /**
   * Search for the user on the database
   * if exist check if password match
   * if all ok return a jwt token
   */
  function login(req, res) {
    if (!req.body.email) res.status(412).send({success: false, message: 'You need to provide an email'});
    else {
      var UserModel = app.__getModule('users').model;

      UserModel.findOne({email: req.body.email}, function(err, user) {
        if (err) throw err;
        if (!user) res.status(404).send({success: false, message: 'User not found with email ' + req.body.email});
        else if (user) {
          if (user.password != req.body.password) res.status(412).send({success: false, message: 'Wrond password !'});
          else {
            var token = jwt.sign(user, app.__config.access.secretKey, { expiresIn: 11440 });
            res.json({success: true, user: user, token: token});
          }
        }
      });
    }
  }

  /**
   * Verify if the request has a token parameter and if yes
   * check the validity of it and the permissions for the next url
   */
  function hasAccess(requiredRoles, req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) res.status(403).send({success: false, message: 'No token provided'});
    else {
      jwt.verify(token, app.__config.access.secretKey, function(err, decoded) {
        if (err) return res.status(401).send({success: false, message: 'Token not valid.'});
        else {
          var hasPermission = requiredRoles.some(function (reqRole) { return reqRole === decoded._doc.role; });

          if (hasPermission) next();
          else res.status(401).send({success: false, message: 'Unauthorized'});
        }
      });
    }
  }

  return Auth;
};