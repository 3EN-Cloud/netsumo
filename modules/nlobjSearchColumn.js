var nlobjSearchColumn = function (name, join, summary) {

  var name = name
  var join = join
  var summary = summary
  var sort = false;

  var getName = function() {
    return name;
  }

  var getJoin = function() {
    return join
  }

  var getSummary = function() {
    return summary
  }

  var setSort = function(order) {
    sort = order;
  }

  return {
    getName:getName,
    getJoin:getJoin,
    getSummary:getSummary
  }

}

module.exports = nlobjSearchColumn
