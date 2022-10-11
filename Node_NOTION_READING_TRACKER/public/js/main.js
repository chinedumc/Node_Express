const booksEl = document.querySelector('#books')
const loadingEl = document.querySelector('#loading')

let loading = false

const getBooksFromBackend = async () => {
  loading = true
  const res = await fetch('http://localhost:5020/books') 
  const data = await res.json()
  // console.log(data, 'data');
  loading = false
  return data
}

const addBooksToDom = async () => {
  const books = await getBooksFromBackend()

  if(!loading) {
    loadingEl.innerHTML = ''
  }

  books.forEach(book => {
    const div = document.createElement('div')
    div.className = 'book'
    div.innerHTML = `
      <h3>${book.title}</h3>
      <ul>
        <li><strong>Author: </strong> ${book.author}</li>
        <li><strong>Pages: </strong> ${book.pages}</li>
        <li><strong>To Start: </strong> ${book.date}</li>
      </ul>
    `
    booksEl.appendChild(div)
  })
}

addBooksToDom()