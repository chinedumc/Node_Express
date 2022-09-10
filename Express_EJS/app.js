const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog') 

//express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://blogAdmin:blogAdmin@nodeexpress.mb9jlq6.mongodb.net/blogdb?retryWrites=true&w=majority'
mongoose
	.connect(dbURI)
	.then((result) => app.listen(3002)) // listen for requests after the connection to the db is complete
	.catch((err) => console.log(err));

// mongooseand mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/single-blog', (req, res) => {
  Blog.findById("631cef139695a2fbf49d93c0")
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
})

//register view engine
app.set('view engine', 'ejs')
app.set('views', 'htmlfiles')


// middleware and static files
app.use(express.static('public'))


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