var nlobjSearchFilter = function (name, join, operator, value1, value2) {

  var name = name
  var join = join
  var operator = operator
  var value1 = value1
  var value2 = value2

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

    if(operator == 'contains') {
      var value = record.getFieldValue(name);
      return (value.indexOf(value1) > -1)
    } else if(operator == 'on') {

      if(value1 == 'today') {
        var value = record.getFieldValue(name);
        var today = getNetsuiteDateTimeString();

        var valueParts = value.split(' ')
        var todayParts = today.split(' ')

        return (valueParts[0] == todayParts[0])
      }

    } else if(operator == 'isempty') {

      var value = record.getFieldValue(name)

      return (!value || value == '' || value.length == 0)
      
    }

    return false
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
