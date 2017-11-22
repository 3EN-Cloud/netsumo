var  Utils = require('./../utils/Utils');

var Operators = function(){
  
  var contains = function(record, name, join, value1, value2){
    var value = record.getFieldValue(name);
    return (value.indexOf(value1) > -1)
  }

  var on = function(record, name, join, value1, value2){
    if(value1 == 'today') {
      var value = record.getFieldValue(name);
      var today = Utils.getNetsuiteDateTimeString();

      var valueParts = value.split(' ')
      var todayParts = today.split(' ')

      return (valueParts[0] == todayParts[0])
    }
    return false;
  }

  var isempty = function(record, name, join, value1, value2){

     var value = record.getFieldValue(name)

      return (!value || value == '' || value.length == 0)

  }

  var is = function(record, name, join, value1, value2){
    let isMatch = false
    if(name == 'recordType') {
      isMatch = (record.getRecordType() == value1)
    }else if(Array.isArray(value1)){
      value1.forEach((element) =>{
        if(element == record.getFieldValue(name)){
          isMatch = true;
        }
      })
    } else {
      isMatch = value1 == record.getFieldValue(name)
    }
    return isMatch;
  }

  var equalto = function(record, name, join, value1, value2){

   return this.is(record, name, join, value1, value2)

  }

  var anyof = function(record, name, join, value1, value2){
    for(var i = 0; i < value1.length; i++) {
      var value = value1[i];
      if(record.getFieldValue(name) == value) {
        return true;
      }
    }
    return false;
  }
  var isnotempty = function(record, name, join, value1, value2){
    return record.getFieldValue(name) !== '';
  }
  var after = function(record, name, join, value1, value2){
    return record.getFieldValue(name) >  value1
  } 
  var lessthanorequalto = function(record, name, join, value1, value2){
    return record.getFieldValue(name) <= value1
  }

  var greaterthan = function(record, name, join, value1, value2){
    return record.getFieldValue(name) > value1;
  }

  var onOrAfter = function(record, name, join, value1, value2){
    if(!record.getFieldValue(name)){
      return false;
    }
    // convert to date if it isn't already
    var dateFrom = (typeof value1 == 'string' ? new Date(value1) : value1);
    var dateOnRecord = (typeof record.getFieldValue(name) == 'string' ? new Date(record.getFieldValue(name)): record.getFieldValue(name)); 
    return _daysBetween(dateFrom, dateOnRecord) >= 0;
  }
  var onOrBefore = function(){
    if(!record.getFieldValue(name)){
      return false;
    }
    // convert to date if it isn't already
    var dateFrom = (typeof value1 == 'string' ? new Date(value1) : value1);
    var dateOnRecord = (typeof record.getFieldValue(name) == 'string' ? new Date(record.getFieldValue(name)): record.getFieldValue(name)); 
    return _daysBetween(dateFrom, dateOnRecord) <= 0;
  }

  // counts the days 
  var _daysBetween = function(first, second) {

    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
  }


  return {
    contains: contains,
    on: on,
    isempty: isempty,
    is: is,
    equalto: equalto,
    anyof: anyof,
    isnotempty: isnotempty,
    after: after,
    lessthanorequalto: lessthanorequalto,
    greaterthan: greaterthan
  }
}
module.exports = Operators;