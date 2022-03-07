//? Express
const express = require("express");
const { checkout, fetchOrdersController } = require("./orders.controllers");

//? Import Controllers

//? Set Router
const ordersRouter = express.Router();

//? Assign Router to Controllers
ordersRouter.get("/", fetchOrdersController);
ordersRouter.post("/checkout", checkout);

//? Export Router
module.exports = ordersRouter;
