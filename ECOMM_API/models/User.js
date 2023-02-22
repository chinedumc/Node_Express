const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"],
		validate: {
			validator: validator.isEmail,
			message: "Please provide a valid email",
		},
		minlength: 3,
		maxlength: 50,
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minlength: 3,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

module.exports = mongoose.model("User", UserSchema);
