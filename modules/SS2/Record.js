module.exports = class Record {

  constructor(options) {
    this.id = options.id;
    this.isDynamic = options.isDynamic;
    this.type = options.type;

    this._populateDefaultValues(options);
    this._populateSubrecords(options);
    this._populateSublists(options);
  }

  _populateSubrecords(options) {
    if(options.subrecords) {
      this.subrecords = options.subrecords;
    }
  }

  _populateSublists(options) {
    if(options.sublists) {
      this.sublists = options.sublists;
    }
  }

  _populateDefaultValues(options) {
    if(options.defaultValues) {
      for (var defaultValueProp in options.defaultValues) {
        const defaultValue = options.defaultValues[defaultValueProp];
        if(defaultValue !== null && typeof defaultValue === 'object' ) {
          this[defaultValueProp] = {
            value:defaultValue.value,
            text:defaultValue.text ? defaultValue.text : defaultValue.value
          }
        } else {
          this[defaultValueProp] = {
            value:defaultValue,
            text:defaultValue
          }
        }
      }
    }
  }

  getValue(options){
    if( typeof options === 'string' || options instanceof String ) {
      if(this[options]) {
        return this[options].value;
      }
    }
  }

  getText(options){
    if( typeof options === 'string' || options instanceof String ) {
      if(this[options]) {
        return this[options].text;
      }
    }
  }

  getSubrecord(options){
    if( typeof options === 'string' || options instanceof String ) {
      return this.subrecords[options]
    }
  }

  getLineCount(options){
    const sublistId = options.sublistId;
    return this.sublists[sublistId] ? this.sublists[sublistId].length : 0
  }

  getSublistValue(options){
    const sublistId = options.sublistId;
    const index = options.line;
    const field = options.fieldId;
    return this.sublists[sublistId] ? this.sublists[sublistId][index][field] : undefined
  }

  cancelLine(options) {}
  commitLine(options) {}
  findMatrixSublistLineWithValue(options){}
  findSublistLineWithValue(options){}
  getCurrentMatrixSublistValue(options){}
  getCurrentSublistField(options){}
  getCurrentSublistIndex(options){}
  getCurrentSublistSubrecord(options){}
  getCurrentSublistText(options){}
  getCurrentSublistValue(options){}
  getField(options){}
  getFields(){}
  getMatrixHeaderCount(options){}
  getMatrixHeaderField(options){}
  getMatrixHeaderValue(options){}
  getMatrixSublistField(options){}
  getMatrixSublistValue(options){}
  getSublist(options){}
  getSublists(){}
  getSublistField(options){}
  getSublistFields(options){}
  getSublistSubrecord(options){}
  getSublistText(options){}
  hasCurrentSublistSubrecord(options){}
  hasSublistSubrecord(options){}
  hasSubrecord(options){}
  insertLine(options){}
  removeCurrentSublistSubrecord(options){}
  removeLine(options){}
  removeSublistSubrecord(options){}
  removeSubrecord(options){}
  save(options){}
  selectLine(options){}
  selectNewLine(options){}
  setCurrentMatrixSublistValue(options){}
  setCurrentSublistText(options){}
  setCurrentSublistValue(options){}
  setMatrixHeaderValue(options){}
  setMatrixSublistValue(options){}
  setSublistText(options){}
  setSublistValue(options){}
  setText(options){}
  setValue(options){}

}
