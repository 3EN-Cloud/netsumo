module.exports = class NError {
  constructor() {
  }

  create(options){
    return Error(`${options.name} : ${options.message}`)
  }

}
