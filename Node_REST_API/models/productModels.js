let products = require("../data/products");
const {writeDataToFile} = require('../utils')

function findAll() {
	return new Promise((resolve, reject) => {
		resolve(products);
	});
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id);
		resolve(product);
	});
}

function create(product) {
	return new Promise((resolve, reject) => {
		const id =
			parseInt(products.reduce((a, b) => (a.id > b.id ? a : b)).id) + 1;
		const newProduct = { id, ...product };
    products.push(newProduct)
    writeDataToFile('./data/products.json', products)
    resolve(newProduct)
	});
	// const newProductId =
	// parseInt(products.reduce((a, b) => (a.id > b.id ? a : b)).id) + 1
}

function update(id, product) {
	// const id = parseInt(products.reduce((a, b) => (a.id > b.id ? a : b)).id) + 1;
	return new Promise((resolve, reject) => {		
		const index = products.findIndex((p) => p.id === id)	
		products[index] = { id, ...product };
		writeDataToFile("./data/products.json", products);
		resolve(products[index]);
	});
}

function remove(id) {
	return new Promise((resolve, reject) => {
		products = products.filter((p) => p.id !== id)
		writeDataToFile("./data/products.json", products);
		resolve();
	});
}

module.exports = {
	findAll,
	findById,
  create,
	update,
	remove
};
