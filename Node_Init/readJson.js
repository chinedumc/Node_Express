const express = require('express')
const http = require('http')
const fs = require('fs')

const app = express()
const server = http.createServer(app)

app.get('/', (req, res) => {
  res.send('<h1> Home</h1>')
})

app.get('/tasks', (req, res) => {
  fs.readFile('./db.json', (err, data) => {
    const tasks  = JSON.parse(data.toString()).tasks
    res.json(tasks)
  })
})

server.listen(3001, () => {
  console.log("Server listening on port 3001");
})