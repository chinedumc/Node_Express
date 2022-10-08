const EventEmitter = require('events')

const url = 'http://mylogger.io/log'

class Logger extends EventEmitter {
  flog(message) {
    //Send an HTTP request
    console.log(message)

    //Raise an event
    this.emit('messageLogged', {id: 1, url})
  }
}

module.exports = Logger