function getNetsuiteDateTimeString() {
  var date = new Date();
  var ampm = 'am';
  if(date.getHours() >= 12) {
    ampm = 'pm';
  }

  var hours = date.getHours()

  if(hours > 12) {
    hours = hours - 12
  }

  var dateTimeString = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'  '+hours+':'+date.getMinutes()+':'+date.getSeconds()+' '+ampm

  return dateTimeString

}

exports.getNetsuiteDateTimeString = getNetsuiteDateTimeString;
