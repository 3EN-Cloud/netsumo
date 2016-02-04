var nlobjRecord = require('../modules/nlobjRecord.js')

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

  return {
    nlapiLogExecution : nlapiLogExecution,
    nlapiCreateError : nlapiCreateError,
    nlapiGetRecordId : nlapiGetRecordId,
    nlapiSetRecordId : nlapiSetRecordId,
    nlapiGetRecordType : nlapiGetRecordType,
    nlapiSetRecordType : nlapiSetRecordType,
    nlapiSubmitRecord : nlapiSubmitRecord,
    nlapiLoadRecord : nlapiLoadRecord,
    nlapiTransformRecord : nlapiTransformRecord
  };

}
