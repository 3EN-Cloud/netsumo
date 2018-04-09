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
    this.records = [];
  }

  create(options) {

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
