const express = require("express");
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlendcoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

people = { people: [{ name: "Mmasom" }] };

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
	res.end();
});

app.get("/people", (req, res) => {
	res.json(people);
	res.end();
});

//post done from postman
app.post('/people', (req, res) => {
  // console.log(req.body);
  if (req.body && req.body.name) {
    people.people.push({name: req.body.name, age: req.body.age})
  }
  res.json(people)
  res.end()
})

app.get('/people/:name', (req, res) => {
  res.json({names: req.params.name})
  res.end()
})

app.listen(3000, () => {
	console.log("Listening");
});
