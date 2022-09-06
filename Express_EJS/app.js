const express = require('express')

//express app
const app = express()

//register view engine
app.set('view engine', 'ejs')
app.set('views', 'htmlFiles')

//listen for requests
app.listen(3002)

app.get('/', (req, res) => {

  //parsing data into a view
  const blogs = [
    {title: 'Lorem ipsum dolor', snippet: 'sit amet consectetur adipisicing elit. Cupiditate, vero.'},
    {title: 'Explicabo a suscipit', snippet: 'asperiores vero eveniet neque ipsa soluta esse accusantium'},
    {title: 'dolorem aliquid iure', snippet: 'voluptatibus alias. Sunt consectetur voluptatibus ullam.'},
  ]
  res.render("index", { title: "Home", blogs });
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create A New Blog Post'})
})

//redirects 
app.get('/about-us', (req, res) => {
  res.redirect('/about')
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
})