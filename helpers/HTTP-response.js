module.exports = function() {
  var obj = {
    success: success,
    error: error
  };

  function success(res, message, data) {
    res.status(200).send({success: true, message: message, content: data});
  }

  function error(res, status, message) {
    res.status(status).send({success: false, message: message});
  }

  return obj;
};