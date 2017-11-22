var nlobjResponse = function (body) {
  this.body = body;
  var headers = {};

  var addHeader =function(name, value){
    headers[name] = value
  }
  var getAllHeaders =function(){
    let returnValues = [];
    for(var key in headers){
      if(headers.hasOwnKey(key)){
        var obj = {};
        obj[key] = headers[key];
        returnValues.push(obj);
      }
    }
    return returnValues;
  }
  var getBody =function(){
    return this.body;
  }
  var getCode =function(){
    return 200
  }
  var getError =function(){
  }
  var getHeader =function(name){
    for(var key in headers){
      if(headers.hasOwnKey(key) &&  key == name){
        return header[name];
      }
    }
    throw new Error('Header '+ name + ' not found');
  }
  var getHeaders =function(name){
    
  }
  var renderPDF =function(xmlString){

  }
  var setCDNCacheable =function(type){

  }
  var setContentType =function(type, name, disposition){

  }
  var setEncoding =function(encodingType){

  }
  var setHeader =function(name, value){

  }
  var sendRedirect =function(type, identifier, id, editmode, parameters){

  }
  var write =function(output){

  }
  var writeLine =function(output){

  }
  var writePage =function(pageobject){

  }

  return {
    body: this.body,
    addHeader: addHeader,
    getAllHeaders: getAllHeaders,
    getBody: getBody,
    getCode: getCode,
    getError: getError,
    getHeader: getHeader
  }

}

module.exports = nlobjResponse