var clone = require('clone')
var nlobjField = require('./nlobjField.js')
var nlobjSubRecord = require('./nlobjSubRecord.js')

var nlobjRecord = function (recordtype, internalid) {

  if(!internalid) {
    internalid = parseInt((Math.random() * 100), 10)
  }

  var id = internalid;
  var type = recordtype;
  var sublists = {
    'item': [],
    'addressbook': []
  };
  var lineItems = sublists.item;
  var addressBookLines = sublists.addressbook;
  var fields = [];
  var fieldValues = {};
  var currentLineItems =  {
    'item':[],
    'addressbook':[]
  };


  var setFieldValue = function(name, value) {
    fieldValues[name] = value
  }

  setFieldValue('internalid', id)

  var setFieldText = function(name, text) {
    fieldValues[name] = text
  }

  var getFieldValue = function(name) {
    if(typeof fieldValues[name] !== 'undefined') {
      return fieldValues[name]
    }

    return undefined;
  }

  var getLineItemCount = function(group) {
    if(typeof sublists[group] !== 'undefined') {
      return sublists[group].length;
    }
    return 0;
  }

  var setLineItemValue = function(group,name,linenum,value) {
    sublists[group][linenum-1][name] = value;
  }

  var getLineItemValue = function(group,name,line) {
    return sublists[group][line-1][name];
  }

  var findLineItemValue = function(group,name,value) {
    var sublist = sublists[group];
    for(var i = 0; i < sublist.length; i++) {
      if(sublist[i][name] == value)
        return i+1
    }
    return -1
  }

  var selectNewLineItem = function(group) {
    if (typeof sublists[group] === 'undefined') {
      sublists[group] = [];
    }
    currentLineItems[group] = {
      'id': id+'_'+getLineItemCount(group),
      'line': getLineItemCount(group),
    }

    if (group === 'addressbook') {
      currentLineItems[group]['addressbookaddress'] = [];
    }
  }

  var createCurrentLineItemSubrecord = function(sublist,fldname) {
    var subRecord = new nlobjSubRecord(fldname);
    currentLineItems[sublist][fldname].push(subRecord);
    return subRecord;
  }

  var selectLineItem = function(group, linenum) {
    currentLineItems[group] = sublists[group][linenum-1]
  }

  var viewCurrentLineItemSubrecord = function(sublist,fldname) {
    return currentLineItems[sublist][fldname][0]
  }

  var setCurrentLineItemValue = function(group,name,value) {
    currentLineItems[group][name] = value
  }

  var commitLineItem = function(group,ignoreRecalc) {
    var sublist = sublists[group]
    if (sublist.indexOf(currentLineItems[group]) === -1) {
      sublist.push(currentLineItems[group])
    }
  }

  var getRecordType = function() {
    return type
  }

  var getId = function() {
    return id
  }

  var getField = function(fldnam) {
    for(var i = 0; i < fields.length; i++) {
      var field = fields[i]
      if(field.getName() == fldnam) {
        return field;
      }
    }
  }

  //This funtion is for netsim use only, do not use as part of a suitescript
  //as it is not part of the netsuite api.
  var addField = function(name,type,label,source,group) {
    fields.push(new nlobjField(name));
  }

  //This funtion is for netsim use only, do not use as part of a suitescript
  //as it is not part of the netsuite api.
  var transform = function(transformType, newRecordId) {
    var clonedLineItems = clone(lineItems)
    var clonedRecord = nlobjRecord(transformType,newRecordId)

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
    setFieldText : setFieldText,
    getFieldValue : getFieldValue,
    getLineItemCount : getLineItemCount,
    setLineItemValue : setLineItemValue,
    getLineItemValue : getLineItemValue,
    findLineItemValue : findLineItemValue,
    selectNewLineItem : selectNewLineItem,
    setCurrentLineItemValue : setCurrentLineItemValue,
    commitLineItem : commitLineItem,
    getRecordType : getRecordType,
    getId : getId,
    transform : transform,
    createCurrentLineItemSubrecord:createCurrentLineItemSubrecord,
    getField:getField,
    addField:addField,
    selectLineItem:selectLineItem,
    viewCurrentLineItemSubrecord:viewCurrentLineItemSubrecord
  }

}

module.exports = nlobjRecord
