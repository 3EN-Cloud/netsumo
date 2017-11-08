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
    if(name == 'recordType') {
      return (record.getRecordType() == value1)
    } else {
      var value = record.getFieldValue(name)

      return (value == value1)
    }
    return false;
  }

  var equalto = function(record, name, join, value1, value2){

    var lineCount = record.getLineItemCount('item')
    for (var line = 1; line<=lineCount; line++ ) {
      var quantity = record.getLineItemValue('item','quantity',line);

      if(quantity == value1) {
        return true;
      }

    }
    return false;

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
    // TODO: test it
    if (record.getFieldValue(name) <= value1) {
      return true;
    }
    return false;
  }

  var greaterthan = function(record, name, join, value1, value2){
    // TODO: test it
    if (record.getFieldValue(name) > value1) {
      return true;
    }
    return false;
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