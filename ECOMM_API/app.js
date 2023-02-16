require('dotenv').config()
const express = require("express");
const app = express();

const connectDB = require('./db/connect')

app.use(express.json())

app.get('/',(req,res)=>{
  res.send('E-COMM API')
})



const port = process.env.PORT || 5000;

const start = async () => {
	try {
    await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server listening on port ${port}...`));
	} catch (error) {
		console.log(error)
	}
};

start();
