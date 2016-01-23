module.exports = function(app) {
  var Controller = require('./controller.js')(app);

  var obj = {
    moduleName: 'auth',
    controller: Controller,
    init: init
  };

  function init() {
    require('./routes.js')(app, this.controller);
  }

  return obj;
};