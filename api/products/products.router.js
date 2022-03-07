//? Express
const express = require("express");
//? Import Controllers
const {
	fetchProductsController,
	fetchSingleProductController,
	deleteProductController,
	updateProductController,
	fetchProduct,
} = require("./products.controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");

//? Set Router
const productsRouter = express.Router();

//? Params Middleware
productsRouter.param("productId", async (req, res, next, productId) => {
	const product = await fetchProduct(productId, next);
	req.product = product;
	// if (product) req.product = product;
	// else {
	// 	const err = new Error("Product not found");
	// 	err.status = 404;
	// 	next(err);
	// }
	next();
});

//? Assign Router to Controllers
productsRouter.get("/", fetchProductsController);
productsRouter.delete(
	"/:productId",
	passport.authenticate("jwt", { session: false }),
	deleteProductController
);
productsRouter.get("/:productId", fetchSingleProductController);
productsRouter.put(
	"/:productId",
	passport.authenticate("jwt", { session: false }),
	upload.single("image"),
	updateProductController
);
//? Export Router
module.exports = productsRouter;
