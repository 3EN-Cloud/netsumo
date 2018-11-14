const Record = require('../modules/SS2/Record.js')
const should = require('chai').should();

describe('Record', function() {

  describe('_findIndexOf()', function() {
    const record = new Record({id: 1});

    it('returns -1 when array is empty', () => {
      record._findIndexOf([], 'test', 'test').should.equal(-1);
    });

    it('returns -1 when key is not present', () => {
      record._findIndexOf([{}], 'test', undefined).should.equal(-1);
    });

    it('returns -1 when value does not match', () => {
      record._findIndexOf([{'test': 'something'}], 'test', undefined).should.equal(-1);
    });

    it('returns correct index when value matches', () => {
      const input = [
        {'test': 'something'},
        {'test': 'somethingElse'},
        {'test': 'shouldMatch'},
      ]
      record._findIndexOf(input, 'test', 'shouldMatch').should.equal(2);
    });
  })

  describe('findSublistLineWithValue()', function() {
    const record = new Record({
      id: 1,
      sublists: {
        'addressbook': [
          {
            id: 100,
            label: 'Office'
          }, {
            id: 101,
            label: 'Warehouse'
          },
        ]
      }
    });

    it('returns -1 when sublist is not defined', () => {
      const options = {
        sublistId: 'missing',
        fieldId: 'id',
        value: 100,
      };
      record.findSublistLineWithValue(options).should.equal(-1);
    });

    it('returns -1 when field is missing', () => {
      const options = {
        sublistId: 'addressbook',
        fieldId: 'missing',
        value: 100,
      };
      record.findSublistLineWithValue(options).should.equal(-1);
    });

    it('returns -1 when value does not match any entry', () => {
      const options = {
        sublistId: 'addressbook',
        fieldId: 'id',
        value: 200,
      };
      record.findSublistLineWithValue(options).should.equal(-1);
    });

    it('returns correct index when value matches an entry', () => {
      const options = {
        sublistId: 'addressbook',
        fieldId: 'id',
        value: 101,
      };
      record.findSublistLineWithValue(options).should.equal(1);
    });

  })
})
