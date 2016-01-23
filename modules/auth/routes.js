module.exports = function(app, controller) {
  app.post('/auth/login', function(req,res) {
    controller.login(req,res);
  });
};