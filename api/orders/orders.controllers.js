const Order = require("../../database/models/Order");

exports.checkout = async (req, res, next) => {
  try {
    const order = req.body;
    const createdOrder = await Order.create(order);
    res.status(200).json({ msg: "Order Created", payload: createdOrder });
  } catch (error) {
    next(error);
  }
};

exports.fetchOrdersController = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    res.json(orders);
  } catch (err) {
    next(error);
  }
};
