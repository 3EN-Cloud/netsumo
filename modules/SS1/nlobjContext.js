var clone = require('clone')
//comment comment
var nlobjContext = function () {

  var name = '';
  var user = undefined;

  var getName = function() {
    return name;
  }

  var getUser = function() {
    return user;
  }

  var setName = function(name) {
    return name = this.name;
  }

  var setUser = function(user) {
    return user = this.user;
  }
}
