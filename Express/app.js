const express = require("express");

//express app
const app = express();

// listen for requests
app.listen(3001);

app.get("/", (req, res) => {
	// res.send('<p>Home Page</p>')
  res.sendFile('./htmlfiles/index.html', {root: __dirname})
});
app.get("/about", (req, res) => {
	res.sendFile("./htmlfiles/about.html", { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about')
})

// 404 page
app.use((req, res) => {
  res.status(404).sendFile('./htmlfiles/404.html', {root: __dirname})
})