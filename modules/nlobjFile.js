
var nlobjFile = function () {

  var name = '';
  var folderId = -1;
  var encoding = '';
  var online = false;
  var active = false;
  var description = '';
  var id = -1;
  var byteSize = -1;
  var url = '';
  var type = '';
  var value = '';
  
  var getName = function() {
    return this.name;
  }

  var setName = function( name )  {
    this.name = name;
  }

  var getFolder = function( )  {
    return this.folderId;
  }

  var setFolder = function( folder )  {
    this.folderId = folder;
  }

  var setEncoding = function( encoding )  {
    this.encoding = encoding;
  }

  var isOnline = function( )  {
    return this.online;
  }

  var setIsOnline = function( online )  {
    this.online = online;
  }

  var isInactive = function( )  {
    return this.active;
  }

  var setIsInactive = function( inactive )  {
    this.active = inactive
  }

  var getDescription = function( )  {
    return this.description;
  }

  var setDescription = function( descr )  {
    this.description = descr;
  }

  var getId = function( )  {
    return this.id;
  }

  var getSize = function( )  {
    return this.byteSize;
  }

  var getURL = function( )  {
    return this.url;
  }

  var getType = function( )  {
    return this.type;
  }

  var getValue = function( )  {
    return this.value;
  }

  return {
    
    getName: getName,
    setName: setName,
    getFolder: getFolder,
    setFolder: setFolder,
    setEncoding: setEncoding,
    isOnline: isOnline,
    setIsOnline: setIsOnline,
    isInactive: isInactive,
    setIsInactive: setIsInactive,
    getDescription: getDescription,
    setDescription: setDescription,
    getId: getId,
    getSize: getSize,
    getURL: getURL,
    getType: getType,
    getValue: getValue,

    // expose properties because nlobjFile has no constructor params
    name: name,
    folderId: folderId,
    encoding: encoding,
    online: online,
    active: active,
    description: description,
    id: id,
    byteSize: byteSize,
    url: url,
    type: type,
    value: value
  }
}

module.exports = nlobjFile
