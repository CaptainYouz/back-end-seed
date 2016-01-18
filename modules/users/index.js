module.exports = function(app) {
  var obj = {
    moduleName: 'user',
    controller: require('./controller.js')(),
    init: init
  };

  function init(app) {
    require('./routes.js')(app, this.controller);
  }

  return obj;
};