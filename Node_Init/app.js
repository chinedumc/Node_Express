const express = require("express");
const  path  = require('path');

const app = express();

const aboutPage = "./htmlFile/about.html"
// const aboutPage = "./docs2/largeText.txt"

app.get("/", (req, res) => {
	res.status(200).send("<h1>Home page</h1>");
});

app.get("/about", (req, res) => {
  // res.setHeader('Content-Type','text/html')
	res.sendFile(path.resolve(__dirname, aboutPage))
});

app.listen(5000,()=>{
console.log('Server listening on port 5000');
})