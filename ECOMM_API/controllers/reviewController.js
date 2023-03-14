const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
	const { product: productId } = req.body;
	const isValidProduct = await Product.findOne({ _id: productId });

	if (!isValidProduct) {
		throw new CustomError.NotFoundError(`No product with id: ${productId}`);
	}

	const alreadySubmitted = await Review.findOne({
		product: productId,
		user: req.user.userId,
	});

	if (alreadySubmitted) {
		throw new CustomError.BadRequestError(
			"Already submitted review for this product"
		);
	}

	req.body.user = req.user.userId;
	const review = await Review.create(req.body);

	res.status(StatusCodes.OK).json({ review });
};
const getAllReviews = (req, res) => {
	res.send("get all reviews");
};
const getSingleReview = (req, res) => {
	res.send("get Single review");
};
const updateReview = (req, res) => {
	res.send("update review");
};
const deleteReview = (req, res) => {
	res.send("delete review");
};

module.exports = {
	createReview,
	getAllReviews,
	getSingleReview,
	updateReview,
	deleteReview,
};
