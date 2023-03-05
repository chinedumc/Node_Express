const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

UserSchema.pre("save", async function () {
	// console.log(this.modifiedPaths());
	// console.log(this.isModified('name'));
	if (!isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
