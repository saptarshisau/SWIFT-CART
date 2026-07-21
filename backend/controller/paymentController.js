import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../server.js";
import crypto from "crypto";
export const processPayment = handleAsyncError(async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    //doesn't this execute the order then and there with out razorpay acc?
    //instance.orders.create() does NOT execute the payment. It only creates an order record on Razorpay's servers.
    res.status(200).json({
        success: true,
        order,
    });
});

//Send API Key
export const sendAPIKey = handleAsyncError(async (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    });
});

//Payment Verification
export const paymentVerification = handleAsyncError(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
    //Create an HMAC object that internally uses SHA-256 as its hashing algorithm, and initialize it with this secret key
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            reference: razorpay_payment_id,
        });
    } else {
        return res.status(200).json({
            success: false,
            message: "Payment verification failed",
        });
    }
});

/*
When you call:

const order = await instance.orders.create(options);

your backend sends a request to Razorpay:

POST https://api.razorpay.com/v1/orders

with something like:

{
  "amount": 50000,
  "currency": "INR"
}

Razorpay creates an order in its own database:

Order ID: order_ABC123
Merchant: SwiftCart
Amount: ₹500
Status: created
Paid: No

and returns:

{
  "id": "order_ABC123",
  "amount": 50000,
  "status": "created"
}

Notice the status:

created

Not

paid

No money has moved yet.
*/