var nlobjSubRecord = function (recordtype, internalid) {
  var nlobjRecord = require('../modules/nlobjRecord.js')
  var record = new nlobjRecord(recordtype, internalid);

  record.commit = function() {

  }

  record.cancel = function() {

  }

  return record

}

module.exports = nlobjSubRecord
