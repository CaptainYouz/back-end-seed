/**
 * Small custom router that fetch the url
 * and call the associate CRUD method from
 * front the controller
 */
module.exports = function(app, controller) {
  // CREATE
  app.post('/users', function(req, res, next) {
    res.send('Hello create Users!');
    controller.create(req.body);
    next();
  });

  // READ
  app.get('/users', function(req, res, next) {
    res.send('Hello get Users!');
    controller.get();
    next();
  });

  app.get('/users/:id', function(req, res, next) {
    res.send('Hello get Users ' + req.params.id + '!');
    controller.get(req.params.id);
    next();
  });

  // UPDATE
  app.put('/users/:id', function(req, res, next) {
    res.send('Hello update Users ' + req.params.id + '!');
    controller.update(req.params.id, req.body);
    next();
  });

  // DELETE
  app.delete('/users/:id', function(req, res, next) {
    res.send('Hello delete ' + req.params.id + ' Users!');
    controller.remove(req.params.id);
    next();
  });
};