const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// routes
app.get("/", (req, res) => {
	res.redirect("/blogs");

	//parsing data into a view
	// const blogs = [
	// 	{
	// 		title: "Lorem ipsum dolor",
	// 		snippet: "sit amet consectetur adipisicing elit. Cupiditate, vero.",
	// 	},
	// 	{
	// 		title: "Explicabo a suscipit",
	// 		snippet: "asperiores vero eveniet neque ipsa soluta esse accusantium",
	// 	},
	// 	{
	// 		title: "dolorem aliquid iure",
	// 		snippet: "voluptatibus alias. Sunt consectetur voluptatibus ullam.",
	// 	},
	// ];
	// res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

//redirects
app.get("/about-us", (req, res) => {
	res.redirect("/about");
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
