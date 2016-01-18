var fs         = require('fs');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var system = {
  modules: [],
  modulesPath: __dirname + '/modules/',
  loadModules: function(app) {
    var modulesPath  = this.modulesPath;
    var modulesList = fs.readdirSync(modulesPath);

    modulesList.forEach(function(folder) {
      var m = require(modulesPath + folder)(app);
      m.init(app);
      system.modules.push(m);
    });
  },
  init: function(app) {
    this.loadModules(app);
  }
};

system.init(app);

var server = app.listen(3000, function () {
  console.log('Listening on port %s...', server.address().port);
});
