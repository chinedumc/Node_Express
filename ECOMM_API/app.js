require('dotenv').config()
require('express-async-errors')
const express = require("express");
const app = express();
const morgan = require('morgan')

const connectDB = require('./db/connect')

//middleware
const notFoundMiddleware = require('./middleware/not-Found')
const errorHandlerMiddleware=require('./middleware/error-handler')


app.use(morgan('tiny'))
app.use(express.json())

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
