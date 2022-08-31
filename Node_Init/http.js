const http =require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/'){
    res.write('Hello World')
    res.end()
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]))
    res.end()
  }
})

//Register a listener
// server.on('connection', (socket) => {
//   console.log('New connection...')
// })




//Raise an Event
server.listen(3000)

console.log('Listening on port 3000...')