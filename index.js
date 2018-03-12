var nlobjRecord = require('./modules/SS1/nlobjRecord.js')
var nsContext = require('./modules/SS1/nsContext.js')
var nsLoader = require('./modules/SS1/nsLoader.js')

//SuiteScript 1.0
exports.nlobjRecord = nlobjRecord
exports.nsContext = nsContext
exports.nsLoader = nsLoader

//SuiteScript 2.0
exports.loadSuiteScriptModule = require("./modules/SS2/loadSuiteScriptModule")
exports.NSearch = require("./modules/SS2/NSearch")
exports.NRecord = require("./modules/SS2/NRecord")
exports.NFile = require("./modules/SS2/NFile")
exports.NError = require("./modules/SS2/NError")
exports.NHttps = require("./modules/SS2/NHttps")
exports.NSSO = require("./modules/SS2/NSSO")
exports.NUIMessage = require("./modules/SS2/NUIMessage")
