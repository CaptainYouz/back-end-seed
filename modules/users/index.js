module.exports = function(app) {
  var Model      = require('./model.js')();
  var Controller = require('./controller.js')(Model);

  var obj = {
    moduleName: 'user',
    model: Model,
    controller: Controller,
    init: init
  };

  function init(app) {
    require('./routes.js')(app, this.controller);
  }

  return obj;
};