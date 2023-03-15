const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Product name is required"],
			minlength: 3,
			maxlength: [50, "Max character limit(50) exceeded"],
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
			default: 0,
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
			minlength: 10,
			maxlength: 40,
		},
		image: {
			type: String,
			default: "/uploads/example.jpg",
		},
		category: {
			type: String,
			required: [true, "Please provide product category"],
			enum: ["office", "kitchen", "bedroom"],
		},
		company: {
			type: String,
			required: [true, "Please provide company"],
			enum: {
				values: ["ikea", "liddy", "marcos"],
				message: "{VALUE} is not supported",
			},
		},
		colours: {
			type: [String],
			default: "#222",
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		freeShipping: {
			type: Boolean,
			default: false,
		},
		inventory: {
			type: Number,
			required: true,
			default: 15,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true, toObject: { virtuals: true } },
	}
);

ProductSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "product",
	justOne: false,
	// match: { rating: 5 },
});

module.exports = mongoose.model("Product", ProductSchema);
