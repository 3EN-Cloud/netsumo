module.exports = class NFormat {
  constructor() {
    this.Type = {
      CCEXPDATE:"CCEXPDATE",
      CCNUMBER:"CCNUMBER",
      CCVALIDFROM:"CCVALIDFROM",
      CHECKBOX:"CHECKBOX",
      COLOR:"COLOR",
      CURRENCY:"CURRENCY",
      CURRENCY2:"CURRENCY2",
      DATE:"DATE",
      DATETIME:"DATETIME",
      DATETIMETZ:"DATETIMETZ",
      FLOAT:"FLOAT",
      FULLPHONE:"FULLPHONE",
      FUNCTION:"FUNCTION",
      IDENTIFIER:"IDENTIFIER",
      INTEGER:"INTEGER",
      MMYYDATE:"MMYYDATE",
      NONNEGCURRENCY:"NONNEGCURRENCY",
      NONNEGFLOAT:"NONNEGFLOAT",
      PERCENT:"PERCENT",
      PHONE:"PHONE",
      POSCURRENCY:"POSCURRENCY",
      POSFLOAT:"POSFLOAT",
      POSINTEGER:"POSINTEGER",
      RATE:"RATE",
      RATEHIGHPRECISION:"RATEHIGHPRECISION",
      TIME:"TIME",
      TIMEOFDAY:"TIMEOFDAY",
      TIMETRACK:"TIMETRACK",
      URL:"URL"
    }
    this.Timezone = {
      EUROPE_LONDON:"EUROPE_LONDON"
    }
  }

  format(options){
    return options.value.toString()
  }

  parse(options){
    return options.value;
  }
}
