var nlobjFile = require('../modules/nlobjFile.js')

var nlobjRequest = function () {
  
  var file = new nlobjFile();
  var headers = {'': ''};
  var parameters = {'': ''};
  var body = '';
  var method = '';
  var url = '';

  var getAllHeaders = function() {
    return this.headers;
  }

  var getAllParameters = function() {
    return this.parameters;
  }

  var getBody = function() {
    return this.body;
  }

  var getFile = function(id) {
    return this.file;
  }

  var getHeader = function(name) {
    return this.headers[name];
  }

  var getLineItemCount = function(group) {
    return -1; // ???
  }

  var getLineItemValue = function(group, name, line) {
    return undefined; // ???
  }

  var getMethod = function() {
    return this.method;
  }

  var getParameter = function(name) {
    return this.parameters[name];
  }

  var getParameterValues = function(name) {
    // Pre: Assumes that parameter value is comma delimited

  	if (!this.parameters[name])
  		return [];

    return this.parameters[name].split(',');
  }

  var getURL = function() {
    return this.url;
  }

  return {
    getAllHeaders: getAllHeaders,
    getAllParameters: getAllParameters,
    getBody: getBody,
    getFile: getFile,
    getHeader: getHeader,
    getLineItemCount: getLineItemCount,
    getLineItemValue: getLineItemValue,
    getMethod: getMethod,
    getParameter: getParameter,
    getParameterValues: getParameterValues,
    getURL: getUrl,

    // expose properties because nlobjRequest has no constructor params
    nlobjFile: nlobjFile,
    headers: headers,
    parameters: parameters,
    body: body,
    method: method,
    url: url
  }
}

module.exports = nlobjRequest
