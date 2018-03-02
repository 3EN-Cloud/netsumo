module.exports = class NFile {
  constructor() {

  }

  load(options) {
    return {
      url:`/core/media/media.nl?id=${options.id}`
    }
  }

}
