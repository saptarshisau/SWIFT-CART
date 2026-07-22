import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
// import User from '../models/userModel.js'; as we logged in we can access user details from req.user
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';

// Create New Order
export const createNewOrder = handleAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        order
    })
})

//Getting single Order for users
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    //we get user info using populating the user field, user stored the ObjectId through which we can fetch name and email from the user model 
    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})

//All my orders for users
export const allMyOrders = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        orders
    })
})

//Getting all orders for admin
export const getAllOrders = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

//Update order status
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    if (order.orderStatus === 'Delivered') {
        return next(new HandleError("This order is already been delivered", 404));
    }
    if (
        order.orderStatus === "Processing" &&
        req.body.status !== "Processing"
    ) {
        //another bug for undefined orderStatus
        await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)
            //either accepted or rejected
        ))
    }// bugfix for orderStatus 'delivered' stock count, as it was getting deleted twice
    order.orderStatus = req.body.status;
    if (order.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        order
    })
})
async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    product.stock -= quantity
    await product.save();
    // await product.save({ validateBeforeSave: false })
}

//Delete Order
export const deleteOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    if (order.orderStatus !== 'Delivered') {
        return next(new HandleError("This order is under processing and cannot be deleted", 404));

    }
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Order Deleted successfully"
    })
})