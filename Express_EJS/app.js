const express = require("express");
const { result } = require("lodash");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express();

// connect to mongodb
const dbURI =
	"mongodb+srv://blogAdmin:blogAdmin@nodeexpress.mb9jlq6.mongodb.net/blogdb?retryWrites=true&w=majority";
mongoose
	.connect(dbURI)
	.then((result) => app.listen(3002)) // listen for requests after the connection to the db is complete
	.catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
app.set("views", "htmlfiles");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))

// routes
app.get("/", (req, res) => {
	res.redirect("/blogs");

	//parsing data into a view
	const blogs = [
		{
			title: "Lorem ipsum dolor",
			snippet: "sit amet consectetur adipisicing elit. Cupiditate, vero.",
		},
		{
			title: "Explicabo a suscipit",
			snippet: "asperiores vero eveniet neque ipsa soluta esse accusantium",
		},
		{
			title: "dolorem aliquid iure",
			snippet: "voluptatibus alias. Sunt consectetur voluptatibus ullam.",
		},
	];
	res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

// blog routes

app.get("/blogs/create", (req, res) => {
	res.render("create", { title: "Create A New Blog Post" });
});

app.get("/blogs", (req, res) => {
	Blog.find().sort({createdAt: -1})
		.then((result) => {
			res.render("index", { title: "All Blogs", blogs: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
  .then((result) => {
    res.redirect('/blogs')
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id 
  Blog.findById(id)
  .then(result => {
    res.render('details', {blog: result, title: 'Blog details'})
  })
  .catch(err => {
    console.log(err);
  })
})

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
  .then(result => {
    res.json({redirect: '/blogs'})
  })
  .catch(err => {
    console.log(err);
  })
});



//redirects
app.get("/about-us", (req, res) => {
	res.redirect("/about");
});

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
