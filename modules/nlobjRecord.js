var clone = require('clone')

var nlobjRecord = function (recordtype, internalid) {

  if(!internalid) {
    internalid = parseInt((Math.random() * 100), 10)
  }

  var id = internalid;
  var type = recordtype;
  var lineItems = [];
  var currentLineItems =  {'item':[]}
  var fieldValues = {}


  var setFieldValue = function(name, value) {
    fieldValues[name] = value
  }

  setFieldValue('internalid', id)

  var getFieldValue = function(name) {
    if(fieldValues[name]) {
      return fieldValues[name]
    }
  }

  var getLineItemCount = function(group) {
    if(group == 'item') {
      return lineItems.length
    } else {
      return 0
    }
  }

  var setLineItemValue = function(group,name,linenum,value) {
    if(group == 'item') {
      lineItems[linenum-1][name] = value
    } else {
      throw new Error('NETSIM ERROR: Line item group: '+group+' is unsupported.');
    }
  }

  var getLineItemValue = function(group,name,line) {
    if(group == 'item') {
      return lineItems[line-1][name]
    } else {
      throw new Error('NETSIM ERROR: Line item group: '+group+' is unsupported.');
    }
  }

  var selectNewLineItem = function(group) {
    currentLineItems[group] = {}
  }

  var setCurrentLineItemValue = function(group,name,value) {
    currentLineItems[group][name] = value
  }

  var commitLineItem = function(group,ignoreRecalc) {
    if(group == 'item') {
      lineItems.push(currentLineItems[group])
    } else {
      throw new Error('NETSIM ERROR: Line item group: '+group+' is unsupported.');
    }
  }

  var getRecordType = function() {
    return type
  }

  var getId = function() {
    return id
  }

  //This funtion is for netsim use only, do not use as part of a suitescript
  //as it is not part of the netsuite api.
  var transform = function(transformType) {
    var clonedLineItems = clone(lineItems)
    var clonedRecord = nlobjRecord(transformType,id+1)

    for(var i = 0; i < clonedLineItems.length; i++) {
      clonedRecord.selectNewLineItem('item')

      var lineItem = clonedLineItems[i];
      var lineItemKeys = Object.keys(lineItem)

      for(var x = 0; x < lineItemKeys.length; x++) {
        var name = lineItemKeys[x]
        var value = lineItem[name]

        clonedRecord.setCurrentLineItemValue('item', name, value)
      }

      clonedRecord.commitLineItem('item')


    }

    return clonedRecord
  }

  return {
    setFieldValue : setFieldValue,
    getFieldValue : getFieldValue,
    getLineItemCount : getLineItemCount,
    setLineItemValue : setLineItemValue,
    getLineItemValue : getLineItemValue,
    selectNewLineItem : selectNewLineItem,
    setCurrentLineItemValue : setCurrentLineItemValue,
    commitLineItem : commitLineItem,
    getRecordType : getRecordType,
    getId : getId,
    transform : transform
  }

}

module.exports = nlobjRecord
