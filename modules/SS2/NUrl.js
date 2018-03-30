module.exports = class NUrl {
  constructor() {
    this.HostType = {
      APPLICATION:'APPLICATION',
      CUSTOMER_CENTER:'CUSTOMER_CENTER',
      FORM:'FORM',
      RESTLET:'RESTLET',
      SUITETALK:'SUITETALK'
    }
  }

  format(options){}
  resolveDomain(options){}
  resolveRecord(options){}
  resolveScript(options){}
  resolveTaskLink(options){}

}
