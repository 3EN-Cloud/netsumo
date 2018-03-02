var nlobjSelectOption = require('./nlobjSelectOption.js')

var nlobjField = function (name, join, summary) {

  var selectOptions = [];

  var addSelectOption = function(value, text, selected) {
    selectOptions.push(new nlobjSelectOption(value, text))
  }

  var getName = function() {
    return name;
  }

  var getSelectOptions = function(filter, filteroperator) {

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
