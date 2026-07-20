import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subtotal * 0.18
    const shippingCharges = subtotal > 500 ? 0 : 50
    const total = subtotal + tax + shippingCharges;
    const navigate = useNavigate();
    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }
    return (
        <>
            <Navbar />
            <PageTitle title="Your Cart" />
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[70vh]">
                    <p className="text-3xl font-bold text-[#4E4A59] mb-5">Your cart is empty</p>
                    <Link to="/products" className="px-6 py-3 text-base font-bold text-[#EAE7E0] bg-[#3B3B4F] rounded-lg shadow-lg hover:bg-[#4E4A59] transition-all duration-300 ease-in-out hover:-translate-y-1">View Products</Link>
                </div>
                // empty cart
            ) : (<>
                <div className="max-w-[1440px] mx-auto my-4 md:my-8 p-4 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px] gap-4 md:gap-6 lg:gap-8">
                    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 min-h-[60vh]">
                        <div className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-gray-100">Your Cart</div>
                        <div className="w-full">
                            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.8fr] p-4 bg-gray-50 rounded-xl mb-4 font-semibold text-gray-600">
                                <div className="">Product</div>
                                <div className="">Quantity</div>
                                <div className="">Item Total</div>
                                <div className="">Actions</div>
                            </div>

                            {/* Cart Items */}
                            {cartItems && cartItems.map(item => <CartItem item={item} key={item.name} />)}
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-white rounded-2xl p-6 h-fit sticky top-24 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-gray-100">Price Summary</h3>
                        <div className="flex justify-between mb-4 text-gray-600 font-medium">
                            <p className="">Subtotal :</p>
                            <p className="">{subtotal}/-</p>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600 font-medium">
                            <p className="">Tax (18%):</p>
                            <p className="">{tax}/-</p>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600 font-medium">
                            <p className="">Shipping :</p>
                            <p className="">{shippingCharges}/-</p>
                        </div>
                        <div className="flex justify-between mt-4 pt-4 border-t-2 border-gray-100 font-bold text-gray-800 text-lg">
                            <p className="">Total :</p>
                            <p className="">{total}/-</p>
                        </div>
                        <button className="w-full p-4 mt-6 bg-[#4E4A59] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#2E2E3C] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed" onClick={checkoutHandler}>Proceed to Checkout</button>
                    </div>
                </div>


            </>)}
            <Footer />
        </>
    )
}

export default Cart
