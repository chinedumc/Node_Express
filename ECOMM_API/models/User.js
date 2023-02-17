const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		minlength: 3,
		maxlength: 50,
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minlength: 3,
	},
});

module.exports = mongoose.model("User", UserSchema);
