const http = require("http");
const {
	getProducts,
	getProduct,
	createProduct,
  updateProduct, 
  deleteProduct
} = require("./controllers/productController");

const server = http.createServer((req, res) => {
	if (req.url === "/api/products" && req.method === "GET") {
		getProducts(req, res);
	} else if (
		req.url.match(/\/api\/products\/([0-9]+)/) &&
		req.method === "GET"
	) {
		const id = parseInt(req.url.split("/")[3]);
		getProduct(req, res, id);
	} else if (req.url === "/api/products" && req.method === "POST") {
		createProduct(req, res);
	} else if (
		req.url.match(/\/api\/products\/([0-9]+)/) &&
		req.method === "PUT"
	) {
    const id = parseInt(req.url.split("/")[3]);
    updateProduct(req, res, id)
	} 
   else if (
		req.url.match(/\/api\/products\/([0-9]+)/) &&
		req.method === "DELETE"
	) {
    const id = parseInt(req.url.split("/")[3]);
		deleteProduct(req, res, id);
  } else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route Not Found" }));
	}
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("listening 5000"));

// const newProductId =
// parseInt(products.reduce((a, b) => (a.id > b.id ? a : b)).id) + 1
