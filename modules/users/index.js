module.exports = function(app) {
  var Model      = require('./model.js')();
  var Controller = require('./controller.js')(Model, app.__res);

  var obj = {
    moduleName: 'users',
    permissions: ['admin'],
    model: Model,
    controller: Controller,
    init: init
  };

  function init(app) {
    require('./routes.js')(this, app, this.controller);
  }

  return obj;
};