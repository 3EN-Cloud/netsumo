var nlobjSubRecord = function (recordtype, internalid) {
  var nlobjRecord = require('../modules/nlobjRecord.js')
  var record = new nlobjRecord(recordtype, internalid);

  record.commit = function() {
    console.log('commit');
  }

  record.cancel = function() {
    console.log('cancel');
  }

  return record

}

module.exports = nlobjSubRecord
