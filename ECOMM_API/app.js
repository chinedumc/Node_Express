require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");

const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-Found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Routes
app.get("/", (req, res) => {
	res.send("E-COMM API");
});
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
