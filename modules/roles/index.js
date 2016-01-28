module.exports = function(app) {
  var Model      = require('./model.js')();
  var Controller = require('./controller.js')(Model);

  var obj = {
    moduleName: 'roles',
    model: Model,
    permissions: 'all',
    controller: Controller,
    init: init
  };

  function init(app) {
    require('./routes.js')(this, app);
  }

  return obj;
};