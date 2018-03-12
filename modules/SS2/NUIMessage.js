const Message = require('./Message')

module.exports = class NUIMessage {
  constructor() {
    this.Type = {
      CONFIRMATION:"confirmation",
      INFORMATION:"information",
      WARNING:"warning",
      ERROR:"error"
    }
  }

  create(options){
    return new Message(options);
  }

}
