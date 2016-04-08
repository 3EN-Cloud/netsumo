var util = require('util');

var nlobjError = function (code, details) {

  var getCode = function() {
    return code
  }

  var getDetails = function() {
    return details
  }

  var getId = function() {

  }

  var getInternalId = function() {

  }

  var getStackTrace = function() {

  }

  var getUserEvent = function() {

  }

  return {
    getCode:getCode,
    getDetails:getDetails
  }

}

util.inherits(nlobjError, Error);

module.exports = nlobjError
