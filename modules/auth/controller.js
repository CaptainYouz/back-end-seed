var jwt = require('jsonwebtoken');

module.exports = function(app) {
  var Auth = {
    login: login,
    isAuth: isAuth
  };

  function login(req, res) {
    if (!req.body.email) res.status(412).send({success: false, message: 'You need to provide an email'});
    else {
      var UserModel = app.__getModule('user').model;

      UserModel.findOne({email: req.body.email}, function(err, user) {
        if (err) throw err;
        if (!user) res.json({success: false, message: 'User not found with email ' + req.body.email});
        else if (user) {
          if (user.password != req.body.password) res.json({success: false, message: 'Password dont match !'});
          else {
            var token = jwt.sign(user, app.__config.access.secretKey, { expiresIn: 1440 });
            res.json({success: true, user: user, token: token});
          }
        }
      });
    }
  }

  function isAuth(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) res.status(403).send({success: false, message: 'No token provided'});
    else {
      jwt.verify(token, app.__config.access.secretKey, function(err,decoded) {
        if (err) return res.json({success: false, message: 'Failed to authenticate.'});
        else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }

  return Auth;
};