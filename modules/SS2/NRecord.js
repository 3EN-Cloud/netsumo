const Record = require("./Record")

module.exports = class NRecord {
  constructor() {
    this.Record = Record;
    this.Type = {
      ITEM_FULFILLMENT:"itemfulfillment",
      CUSTOMER:"customer",
      ITEM:"item"
    }
    this.records = [];
  }

  create(options) {
    return new Record(options);
  }

  load(options) {
    var records = this.records.filter(record => (record.id == options.id && record.type == options.type));
    if(records && records.length > 0) {
      return records[0]
    }
  }

  addRecord(record) {
    this.records.push(record)
  }

}
