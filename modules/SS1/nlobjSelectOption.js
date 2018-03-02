var nlobjSelectOption = function (id, text) {

  var getId = function() {
    return id;
  }

  var getText = function() {
    return text;
  }

  return {
    getId:getId,
    getText:getText
  }

}

module.exports = nlobjSelectOption
