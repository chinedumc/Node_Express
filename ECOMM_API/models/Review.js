const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, "Please leave a rating"],
		},
		title: {
			type: String,
			trim: true,
			required: [true, "Your review needs a title"],
			maxlength: 100,
		},
		comment: {
			type: String,
			required: [true, "Enter your review comment"],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			reference: "User",
			required: true,
		},
		product: {
			type: mongoose.Schema.ObjectId,
			reference: "Product",
			required: true,
		},
	},
	{ timestamps: true }
);

 ReviewSchema.index({ product: 1, user: 1 }, { unique: true }); //Compund index

module.exports = mongoose.model("Review", ReviewSchema);
