var express = require('express');

/**
 * Small custom router that fetch the url
 * and call the associate CRUD method from
 * front the controller
 */
module.exports = function(app, controller) {
  var routes = express.Router();

  // CREATE
  routes.post('/', function(req, res) {
    controller.create(req, res);
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

  app.use('/users', routes);
};