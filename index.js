var bodyParser = require('body-parser');
var express    = require('express');
var fs         = require('fs');
var morgan     = require('morgan');
var app        = express();

// App config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

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

var server = app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port %s...', server.address().port);
});
