const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const search = "a";

	const products = await Product.find({
		name: { $regex: search, $options: "i" },
	});
	res.status(200).json({ nbHits: products.length, products });
};
const getAllProducts = async (req, res) => {
	const { featured, company, search } = req.query;
	const queryObject = {};

	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (search) {
		queryObject.search = { $regex: search, $options: "i" };
	}
	console.log(queryObject);
	const products = await Product.find(queryObject);
	res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
