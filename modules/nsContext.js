var nlobjRecord = require('../modules/nlobjRecord.js')
var nlobjSearchFilter = require('../modules/nlobjSearchFilter.js')
var nlobjSearchColumn = require('../modules/nlobjSearchColumn.js')
var nlobjSearchResult = require('../modules/nlobjSearchResult.js')
var nlobjContext = require('../modules/nlobjContext.js')
var nodemailer = require('nodemailer');
var pickupTransport = require('nodemailer-pickup-transport');

exports.getDefaultContext = function(opts) {

  var defaultContextOptions = opts
  var recordsArray = []
  var recordId = 0
  var recordType = ''
  var nlobjContext


  var nlapiLogExecution = function(type,title,details) {
    if(!opts.supressNlapiLogOutput) {
      console.log("TYPE: "+type+" | TITLE: "+title+" | DETAILS: "+details)
    }
  }

  var nlapiCreateError = function(code,details,suppressNotification) {
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

  var nlapiCreateRecord = function(type,initializeValues) {
    var record = new nlobjRecord(type);
    return record;
  }

  var nlapiDeleteRecord = function(type,id) {
    for(var i = 0; i < recordsArray.length; i++) {
      var record = recordsArray[i];
      if(record.getRecordType() == type && record.getId() == id) {
        recordsArray.splice(i, 1);
        break;
      }
    }
    throw new Error('NETSIM ERROR: Couldnt find any record matching id:'+id+' with type: '+type);
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
    var transformedRecord = record.transform(transformType, getNextAvailableRecordId())

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

  var nlapiSendEmail = function (author,recipient,subject,body,cc,bcc,records,attachments,notifySenderOnBounce,internalOnly,replyTo) {

    var mailOptions = {
        from: author,
        to: recipient,
        subject: subject,
        html: body
    };

    if(typeof defaultContextOptions.emailPath == 'undefined' || defaultContextOptions.emailPath == null) {
      console.log(mailOptions);
    } else {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport(pickupTransport({
          directory: defaultContextOptions.emailPath
      }));

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
      });
    }
  }

  var nlapiResolveURL = function(type,identifier,id,displayMode) {

    if(type == 'record' && identifier == 'returnauthorization') {
      return "https://system.na1.netsuite.com/app/accounting/transactions/rtnauth.nl?id="+id+"&whence="
    }

  }

  var getNextAvailableRecordId = function() {
    var maxRecordId = 0;

    for(var i = 0; i < recordsArray.length; i++) {
      var record = recordsArray[i]

      if(record.getId() > maxRecordId) {
        maxRecordId = record.getId();
      }
    }

    return maxRecordId + 1

  }

  var setNlobjContext = function(nlobjContext) {
    nlobjContext = this.nlobjContext;
  }

  var nlapiGetContext = function() {
    return nlobjContext;
  }

  var getAllRecords = function() {
    return recordsArray;
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
    nlapiSearchRecord : nlapiSearchRecord,
    nlapiSendEmail : nlapiSendEmail,
    nlapiResolveURL : nlapiResolveURL,
    nlapiDeleteRecord : nlapiDeleteRecord,
    nlapiCreateRecord : nlapiCreateRecord,
    getAllRecords : getAllRecords
  };

}
