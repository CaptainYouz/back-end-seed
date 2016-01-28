var express = require('express');

/**
 * Small custom router that fetch the url
 * and call the associate CRUD method from
 * front the controller
 */
module.exports = function(mod, app) {
  var controller = mod.controller;
  var routes     = express.Router();

  function adminCreation(req, res, next) {
    if (req.body.role === 'admin') app.__getModule('auth').controller.hasAccess(['admin'],req,res,next);
    else next();
  }

  // CREATE
  app.post('/' + mod.moduleName, adminCreation, function(req, res) {
    controller.create(req, res);
  });

  routes.use(function(req, res, next) {
    app.__getModule('auth').controller.hasAccess(mod.permissions,req,res,next);
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
    controller.remove(req.params.id, res);
  });

  app.use('/' + mod.moduleName, routes);
};