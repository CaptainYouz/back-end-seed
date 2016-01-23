var express = require('express');

/**
 * Small custom router that fetch the url
 * and call the associate CRUD method from
 * front the controller
 */
module.exports = function(moduleName, app, controller) {
  var routes = express.Router();

  // CREATE
  app.post('/' + moduleName, function(req, res) {
    controller.create(req, res);
  });

  routes.use(function(req, res, next) {
    app.__getModule('auth').controller.isAuth(req,res,next);
  });

  // READ
  routes.get('/', function(req, res) {
    controller.get(false, res);
  });

  routes.get('/:id', function(req, res) {
    controller.get(req.params.id, res);
  });

  // UPDATE
  routes.put('/:id', function(req, res) {
    controller.update(req.params.id, req.body);
  });

  // DELETE
  routes.delete('/:id', function(req, res) {
    controller.remove(req.params.id);
  });

  app.use('/' + moduleName, routes);
};