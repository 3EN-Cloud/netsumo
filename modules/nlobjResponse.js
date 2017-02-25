var require('../modules/nlobjError');

var nlobjResponse = function () {

	var headers = {'': ''};
	var code = '';
	var error = new nlobjError('', '');
	var CDNCachingType = undefined;
	var encodingType = undefined;
	var response = '';
  
	var addHeader = function(name, value) {
		this.headers[name] = value;
	}

	var getAllHeaders = function() {
		return this.headers;
	}

	var getBody = function() {
		return this.response;
	}

	var getCode = function() {
		return this.code;
	}

	var getError = function() {
		return this.error;
	}

	var getHeader = function(name) {
		return this.headers[name];
	}

	var getHeaders = function(name) {
		// Pre: Assumes that parameter value is comma delimited

	  	if (!this.headers[name])
	  		return [];

	    return this.headers[name].split(',');
	}

	var renderPDF = function(xmlString) {
		return undefined;
	}

	var setCDNCacheable = function(type) {
		this.CDNCachingType = type;
	}

	var setContentType = function(type, name, disposition) {
		
	}

	var setEncoding = function(encodingType) {
		this.encodingType = encodingType;
	}

	var setHeader = function(name, value) {
		this.headers[name] = value;
	}

	var sendRedirect = function(type, identifier, id, editmode, parameters) {
		return undefined;
	}

	var write = function(output) {
		this.response += output;
	}

	var writeLine = function(output) {
		this.response += output + '\n';
	}

	var writePage = function(pageobject) {
		return undefined;
	}
  
  return {
	addHeader: addHeader, 
	getAllHeaders: getAllHeaders,
	getBody: getBody,
	getCode: getCode,
	getError: getError,
	getHeader: getHeader,
	getHeaders: getHeaders,
	renderPDF: renderPDF,
	setCDNCacheable: setCDNCacheable,
	setContentType: setContentType,
	setEncoding: setEncoding,
	setHeader: setHeader,
	sendRedirect: sendRedirect,
	write: write, 
	writeLine: writeLine,
	writePage: writePage,

	// expose properties because nlobjResponse has no constructor params
    headers: headers,
  	code: code,
	error: error,
	CDNCachingType: CDNCachingType,
	encodingType: encodingType,
	response: response
  }
}

module.exports = nlobjResponse
