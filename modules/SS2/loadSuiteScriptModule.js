const fs = require('fs');
const Module = require('module');

function define(modules, factory) {
  return (requiredModules) => {

    var modulesToImport = modules.map((module=>{
      return requiredModules[module];
    }))

    return factory.apply(null, modulesToImport)
  }
}

function loadSuiteScriptModule(filePath) {

  const contentsToReplace = "define";
  const replacementExport = "module.exports = define"

  //global netsuite objects
  const log = "const log = {debug: (title,details)=>{},audit: (title,details)=>{},emergency: (title,details)=>{},error: (title,details)=>{}};"

  var contents = fs.readFileSync(filePath, 'utf8');
  contents = contents.replace(contentsToReplace,`${log} ${define.toString()} ${replacementExport}`);
  var m = new Module();
  m._compile(contents, filePath);
  return m.exports;
}

module.exports = loadSuiteScriptModule;
