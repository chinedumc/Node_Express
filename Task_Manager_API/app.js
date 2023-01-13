require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

app.use(express.json())

app.use('/api/v1/tasks', tasks) 

//routes
// app.get('/api/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id')
// app.patch('/api/v1/tasks/:id')
// app.delete('/api/v1/tasks/:id')

const port = 5000

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)})