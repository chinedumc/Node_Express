const mongoose = require("mongoose");

const connectionString =
	"mongodb+srv://nedum:nedumMongo@node-and-express.ihhwpd7.mongodb.net/TaskManagerDB?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
	.connect(connectionString)
	.then(() => console.log("CONNECTED TO THE DB..."))
	.catch((err) => console.log(err));
