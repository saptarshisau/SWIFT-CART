import HandleError from "../utils/handleError.js";
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    //cast error is shown when we pass invalid id in url or in params
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.value}`
        err = new HandleError(message, 400)
    }
    //mongodb duplicate key error , it could be email or username
    /*
    Object.keys() is a built-in JavaScript method.
    It returns an array of all the keys of an object.
    */
    if (err.code === 11000) {
        const message = `This ${Object.keys(err.keyValue)} already exists.`
        err = new HandleError(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        //Casted error err.stack
    })
}