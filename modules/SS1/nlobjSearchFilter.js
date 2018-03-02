var Operator = require('../utils/Operators');

var nlobjSearchFilter = function (name, join, operator, value1, value2) {

  var name = name
  var join = join
  var operator = operator
  var value1 = value1
  var value2 = value2
  var operatorIns = new Operator();

  var getName = function() {
    return name
  }

  var getJoin = function() {
    return join
  }

  var getOperator = function() {
    return operator
  }

  //netsumo use only function, not available in suitescript
  var getValue1 = function() {
    return value1
  }

  //netsumo use only function, not available in suitescript
  var getValue2 = function() {
    return value2
  }

  //netsumo use only function, not available in suitescript
  var matchesRecord = function(record) {

    try{
      operatorIns[operator](record, name, join, value1, value2);
    }catch(err){
      throw new Error('NETSIM ERROR: '+operator+' is unsupported.');
    }
  }

  function getNetsuiteDateTimeString() {
    var date = new Date();
    var ampm = 'am';
    if(date.getHours() >= 12) {
      ampm = 'pm';
    }

    var hours = date.getHours()

    if(hours > 12) {
      hours = hours - 12
    }

    var dateTimeString = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'  '+hours+':'+date.getMinutes()+':'+date.getSeconds()+' '+ampm

    return dateTimeString

  }

  return {
    getName:getName,
    getJoin:getJoin,
    getOperator:getOperator,
    getValue1:getValue1,
    getValue2:getValue2,
    matchesRecord:matchesRecord
  }

}

module.exports = nlobjSearchFilter
