const sinon = require('sinon')

module.exports = class NSearch {
  constructor() {
    this.Type = {
      CUSTOMER:"customer",
      ITEM:"item",
      LOCATION:"location"
    }
    this.Sort = {
      ASC:"asc",
      DESC:"desc"
    }
    this.Operator = {
      AFTER:"AFTER",
      ALLOF:"ALLOF",
      ANY:"ANY",
      ANYOF:"ANYOF",
      BEFORE:"BEFORE",
      BETWEEN:"BETWEEN",
      CONTAINS:"CONTAINS",
      DOESNOTCONTAIN:"DOESNOTCONTAIN",
      DOESNOTSTARTWITH:"DOESNOTSTARTWITH",
      EQUALTO:"EQUALTO",
      GREATERTHAN:"GREATERTHAN",
      GREATERTHANOREQUALTO:"GREATERTHANOREQUALTO",
      HASKEYWORDS:"HASKEYWORDS",
      IS:"IS",
      ISEMPTY:"ISEMPTY",
      ISNOT:"ISNOT",
      ISNOTEMPTY:"ISNOTEMPTY",
      LESSTHAN:"LESSTHAN",
      LESSTHANOREQUALTO:"LESSTHANOREQUALTO",
      NONEOF:"NONEOF",
      NOTAFTER:"NOTAFTER",
      NOTALLOF:"NOTALLOF",
      NOTBEFORE:"NOTBEFORE",
      NOTBETWEEN:"NOTBETWEEN",
      NOTEQUALTO:"NOTEQUALTO",
      NOTGREATERTHAN:"NOTGREATERTHAN",
      NOTGREATERTHANOREQUALTO:"NOTGREATERTHANOREQUALTO",
      NOTLESSTHAN:"NOTLESSTHAN",
      NOTLESSTHANOREQUALT:"ONOTLESSTHANOREQUALTO",
      NOTON:"NOTON",
      NOTONORAFTER:"NOTONORAFTER",
      NOTONORBEFORE:"NOTONORBEFORE",
      NOTWITHIN:"NOTWITHIN",
      ON:"ON",
      ONORAFTER:"ONORAFTER",
      ONORBEFORE:"ONORBEFORE",
      STARTSWITH:"STARTSWITH",
      WITHIN:"WITHIN"
    }
    this.Summary = {
      GROUP:"GROUP",
      COUNT:"COUNT",
      SUM:"SUM",
      AVG:"AVG",
      MIN:"MIN",
      MAX:"MAX"
    }
    this.records = [];
  }

  create(options) {

  }

  searchShouldYield(objectToReturn) {
    var run = sinon.stub();
    var each = sinon.stub();
    each.yields(objectToReturn)

    run.returns({
      each:each
    })

    this.create = sinon.stub();
    this.create.returns({
      run:run
    })
  }

  searchShouldYieldMultipleResults(results) {
    var run = sinon.stub();
    var each = sinon.stub();

    results.forEach((result,index) => {
      each.onCall(index).yields(result)
    })

    run.returns({
      each:each
    })

    this.create = sinon.stub();
    this.create.returns({
      run:run
    })
  }

  searchShouldYieldNoResults() {
    var run = sinon.stub();
    var each = sinon.stub();

    run.returns({
      each:each
    })

    this.create = sinon.stub();
    this.create.returns({
      run:run
    })
  }

  lookupFields(data) {
    var records = this.records.filter(record => (record.id == data.id && record.type == data.type));
    var response = {};
    if(records && records.length > 0) {
      var record = records[0];
      for(let column of data.columns) {
          response[column] = record.getValue(column)
      }
    }

    return response;
  }

  addRecord(record) {
    this.records.push(record)
  }
}
