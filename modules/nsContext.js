var nlobjRecord = require('../modules/nlobjRecord.js')
var nlobjSearchFilter = require('../modules/nlobjSearchFilter.js')
var nlobjSearchColumn = require('../modules/nlobjSearchColumn.js')
var nlobjSearchResult = require('../modules/nlobjSearchResult.js')

exports.getDefaultContext = function() {

  var recordsArray = []
  var recordId = 0
  var recordType = ''

  var nlapiLogExecution = function(type,title,details) {
    console.log("TYPE: "+type+" | TITLE: "+title+" | DETAILS: "+details)
  }

  var nlapiCreateError = function(code,details,suppressNotification) {
    console.log("NLAPI ERROR CODE: "+code+" | DETAILS: "+details+" | SUPPRESS NOTIFICATION: "+suppressNotification)
    return new Error("NLAPI ERROR CODE: "+code+" | DETAILS: "+details+" | SUPPRESS NOTIFICATION: "+suppressNotification)
  }

  var nlapiGetRecordId = function() {
    return recordId
  }

  var nlapiSetRecordId = function(id) {
    recordId = id
  }

  var nlapiGetRecordType = function() {
    return recordType
  }

  var nlapiSetRecordType = function(type) {
    recordType = type
  }

  var nlapiSubmitRecord = function(record,doSourcing,ignoreMandatoryFields) {

    var updatedExistingRecord = false;
    for(var i = 0; i < recordsArray.length; i++) {
      var storedRecord = recordsArray[i];
      if(storedRecord.getId() == record.getId()) {
        recordsArray[i] == record
        updatedExistingRecord = true;
        break
      }
    }

    if(!updatedExistingRecord) {
      recordsArray.push(record)
    }

    return record.getId()
  }

  var nlapiLoadRecord = function(type,id,initializeValues) {
    for(var i = 0; i < recordsArray.length; i++) {
      var record = recordsArray[i];
      if(record.getRecordType() == type && record.getId() == id) {
        return record
      }
    }
    throw new Error('NETSIM ERROR: Couldnt find any record matching id:'+id+' with type: '+type);
  }

  var nlapiTransformRecord = function(type,id,transformType,transformValues) {

    var record = nlapiLoadRecord(type,id)
    var transformedRecord = record.transform(transformType)

    return transformedRecord
  }

  var nlapiSearchRecord = function(type,id,filters,columns) {

    var matchingResults = [];

    if(!id || id == null || id == '' || id == undefined) {

      recordsArray.forEach(function(record){

        var matchingRecord = true;

        filters.forEach(function(filter){

          if(!filter.matchesRecord(record)) {
            matchingRecord = false
          }

        })

        if(matchingRecord) {
          matchingResults.push(record)
        }

      })

    }


    var searchResults = []

    if(matchingResults.length > 0) {
      matchingResults.forEach(function(matchingResult) {

        var searchResult = new nlobjSearchResult()
        searchResult.setId(matchingResult.getId())
        searchResult.setRecordType(matchingResult.getRecordType())

        columns.forEach(function(column) {
          var value = matchingResult.getFieldValue(column.getName())
          searchResult.setValue(column.getName(), value)
        })

        searchResults.push(searchResult)
      })
    }

    return searchResults
  }

  return {
    nlapiLogExecution : nlapiLogExecution,
    nlapiCreateError : nlapiCreateError,
    nlapiGetRecordId : nlapiGetRecordId,
    nlapiSetRecordId : nlapiSetRecordId,
    nlapiGetRecordType : nlapiGetRecordType,
    nlapiSetRecordType : nlapiSetRecordType,
    nlapiSubmitRecord : nlapiSubmitRecord,
    nlapiLoadRecord : nlapiLoadRecord,
    nlapiTransformRecord : nlapiTransformRecord,
    nlobjSearchFilter : nlobjSearchFilter,
    nlobjSearchColumn : nlobjSearchColumn,
    nlapiSearchRecord : nlapiSearchRecord
  };

}
