const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Please provide company name"],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, "Please provide position"],
			maxlength: 50,
		},
		status: {
			type: String,
			// required:[true,'Please provide interview status']
			enum: ["interview", "declined", "pending"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide a User"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Job", JobsSchema);