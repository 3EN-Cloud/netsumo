var nlobjSearchResult = function () {

  var id = ''
  var recordType = ''
  var values = {}

  var getAllColumns = function() {
    return Object.keys(values)
  }

  var getId = function() {
    return id
  }

  var setId = function(identifier) {
    id = identifier
  }

  var getRecordType = function() {
    return recordType
  }

  var setRecordType = function(recType) {
    recordType = recType
  }

  var setValue = function(column, value) {
    values[column] = value
  }

  var getValue = function(column) {

    if(column.getName != null || typeof column.getName != 'undefined') {
      return values[column.getName()]
    }

    return values[column]
  }

  return {
    getAllColumns:getAllColumns,
    getId:getId,
    setId:setId,
    getRecordType:getRecordType,
    setRecordType:setRecordType,
    setValue:setValue,
    getValue:getValue,
    getText:getValue
  }

}

module.exports = nlobjSearchResult
