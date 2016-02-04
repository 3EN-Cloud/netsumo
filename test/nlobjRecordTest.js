var nlobjRecord = require('../modules/nlobjRecord.js')
var should = require('chai').should();

describe('nlobjRecord', function() {

  describe('#setFieldValue', function() {

    it('Sets the integer value of a field by name', function() {

      var record = nlobjRecord('customrecord', 1);
      record.setFieldValue('testname',124);

      record.getFieldValue('testname').should.equal(124)
      record.getFieldValue('testname').should.be.an.int

    })

    it('Sets the string value of a field by name', function() {

      var record = nlobjRecord('customrecord', 1);
      record.setFieldValue('testname','hello world');

      record.getFieldValue('testname').should.equal('hello world')
      record.getFieldValue('testname').should.be.a.string

    })

  })

  describe('#getFieldValue', function() {

    it('Returns the integer value of a field by name', function() {

      var record = nlobjRecord('customrecord', 1);
      record.setFieldValue('testname',124);

      record.getFieldValue('testname').should.equal(124)
      record.getFieldValue('testname').should.be.an.int

    })

    it('Returns the string value of a field by name', function() {

      var record = nlobjRecord('customrecord', 1);
      record.setFieldValue('testname','hello world');

      record.getFieldValue('testname').should.equal('hello world')
      record.getFieldValue('testname').should.be.a.string

    })

  })

  describe('#getLineItemCount', function() {

    it('Gets number of lines in the item group', function() {

      var record = nlobjRecord('customrecord', 4);

      record.selectNewLineItem('item');
      record.commitLineItem('item');

      record.getLineItemCount('item').should.equal(1)

      record.selectNewLineItem('item');
      record.commitLineItem('item');

      record.getLineItemCount('item').should.equal(2)

      record.selectNewLineItem('item');
      record.commitLineItem('item');

      record.getLineItemCount('item').should.equal(3)

      record.selectNewLineItem('item');
      record.commitLineItem('item');

      record.getLineItemCount('item').should.equal(4)
    })

    it('Gets returns 0 when there are no lines in the specified group', function() {

      var record = nlobjRecord('customrecord', 4);

      record.getLineItemCount('bananna').should.equal(0)

    })


  })

})
