var nlobjSelectOption = require('../modules/nlobjSelectOption.js')

var nlobjField = function (name, join, summary) {

  var selectOptions = [];

  var addSelectOption = function(value, text, selected) {
    console.log("adding select option");
    selectOptions.push(new nlobjSelectOption(value, text))
    console.log(selectOptions)
  }

  var getName = function() {
    return name;
  }

  var getSelectOptions = function(filter, filteroperator) {

    console.log(selectOptions)

    if(filter == null) {
      return selectOptions;
    }

    var filteredSelectOptions = [];

    selectOptions.forEach(function(selectOption) {

      if(filteroperator == null || filteroperator == 'contains') {
        if(selectOption.getText().indexOf(filter) > -1) {
          filteredSelectOptions.push(selectOption)
        }
      } else if(filteroperator == 'is' && selectOption.getText() == filter) {
        filteredSelectOptions.push(selectOption)
      }

    })

    return filteredSelectOptions;

  }

  return {
    addSelectOption:addSelectOption,
    getName:getName,
    getSelectOptions:getSelectOptions
  }

}

module.exports = nlobjField
