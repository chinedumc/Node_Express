const http = require('http')

const server = http.createServer((req, res) => {
  // console.log('request made')
  // console.log(req.url, req.method)
  if (req.url === '/'){
    res.setHeader('Content-Type', 'text/plain')
    res.write('Hello World')

    // res.setHeader('Content-Type', 'text/html')
    // res.write('<p>Hello world paragraph</p>')
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
server.listen(3000, 'localhost', () => {
  console.log('Listening on port 3000...')
})  
