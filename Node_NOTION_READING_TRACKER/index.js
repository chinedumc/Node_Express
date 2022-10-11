const express = require('express')
const getBooks = require('./services/notion')

const PORT = process.env.PORT || 5020

const app = express()

app.use(express.static('public'))

app.listen(PORT, console.log('listening on', PORT))

app.get('/books', async (req, res) => {
  const books = await getBooks()
  res.json(books)
})

// async function getAllBooks() {
//   const allBooks = await getBooks()
//   console.log(allBooks);
// }
// getAllBooks()
