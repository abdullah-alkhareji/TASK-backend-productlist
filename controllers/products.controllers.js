//? Import Data
const productsData = require("../data/data");
//? Set Data
let products = productsData;

//? Set Controllers
exports.fetchProductsController = (req, res) => {
	res.json(products);
};
exports.fetchSingleProductController = (req, res) => {
	const { slug } = req.params;
	const product = products.find(product => product.slug === slug);
	if (product) {
		res.json(product);
	} else {
		res.status(404).send("Product not found");
	}
};
exports.deleteProductController = (req, res) => {
	const { slug } = req.params;
	const product = products.find(product => product.slug === slug);
	if (product) {
		products = products.filter(product => product.slug !== slug);
		res.status(204).send("Product Deleted");
	} else {
		res.status(404).send("Product not found");
	}
};
exports.addProductController = (req, res) => {
	const { name, image, description, color, quantity, price } = req.body;
	const product = {
		// id: Math.floor(Math.random() * 1000),
		id: products[products.length - 1].id + 1,
		name,
		slug: name.toLowerCase().split(" ").join("-"),
		image,
		description,
		color,
		quantity,
		price,
	};
	if (products.find(prod => prod.slug !== product.slug)) {
		products = [...products, product];
		res.status(201).send("Product Created");
	} else {
		res.status(302).send("Product Already Exist");
	}
};