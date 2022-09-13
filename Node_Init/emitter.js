const EventEmitter = require('events')
const emitter = new EventEmitter()

//can be:
const event = require('events')
const myEmitter = new event.EventEmitter()

myEmitter.on('readFile', () => {
  console.log('\nRead Event Occurred!');
})

//Register a listener
emitter.on('messageLogged', (arg) => {
  console.log('Listener called', arg)
})

// Raise/Emit an event
emitter.emit('messageLogged', {id: '1', url: 'http://'})