import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import CheckoutPath from './CheckoutPath';
import { useNavigate } from 'react-router-dom';

function OrderConfirm() {
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = Number((subtotal * 0.18).toFixed(2))
    const shippingCharges = subtotal > 500 ? 0 : 50
    const total = Number((subtotal + tax + shippingCharges).toFixed(2));
    const navigate = useNavigate()
    const proceedToPayment = () => {
        const data = {
            subtotal,
            tax,
            shippingCharges,
            total
        }
        sessionStorage.setItem('orderItem', JSON.stringify(data));
        navigate('/process/payment')
    }
    return (
        <>
            <PageTitle title="Order Confirm" />
            <Navbar />
            <CheckoutPath activePath={1} />
            <div className="max-w-[1200px] mx-auto my-5 p-5 md:p-8 bg-white rounded-3xl shadow-xl border border-gray-100 mb-20">
                <h1 className="text-center text-[1.8rem] md:text-3xl font-bold mb-8 text-[#3B3B4F] drop-shadow-sm">Order Confirmation</h1>
                <div className="flex flex-col gap-8">
                    {/* Shipping Details Table */}
                    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="text-left font-bold text-lg md:text-xl p-4 text-[#4E4A59] border-b border-gray-200 bg-gray-50">Shipping Details</div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base">Name</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base">Phone</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base">Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{user.name}</td>
                                        <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{shippingInfo.phoneNumber}</td>
                                        <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cart Items Table */}
                    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="text-left font-bold text-lg md:text-xl p-4 text-[#4E4A59] border-b border-gray-200 bg-gray-50">Cart Items</div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Image</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Product Name</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Price</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Quantity</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.product} className="hover:bg-gray-50 transition-colors">
                                            <td className="text-left p-4 border-b border-gray-100">
                                                <img src={item.image} alt={item.name} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] object-cover rounded-lg shadow-sm" />
                                            </td>
                                            <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.name}</td>
                                            <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.price}/-</td>
                                            <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.quantity}</td>
                                            <td className="text-left p-4 text-[#4E4A59] font-bold border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.quantity * item.price}/-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Order Summary Table */}
                    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="text-left font-bold text-lg md:text-xl p-4 text-[#4E4A59] border-b border-gray-200 bg-gray-50">Order Summary</div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Subtotal</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Shipping Charges</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">GST (18%)</th>
                                        <th className="text-left p-4 bg-[#F8F8F8] font-bold text-[#3B3B4F] border-b border-gray-200 text-base md:text-lg whitespace-nowrap">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{subtotal}/-</td>
                                        <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{shippingCharges}/-</td>
                                        <td className="text-left p-4 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{tax}/-</td>
                                        <td className="text-left p-4 text-emerald-600 font-bold border-b border-gray-100 text-base md:text-lg whitespace-nowrap">{total}/-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="block mx-auto mt-10 px-8 md:px-12 py-3.5 md:py-4 text-base md:text-lg font-bold text-white bg-[#2E2E3C] rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#3B3B4F] shadow-lg hover:shadow-xl hover:-translate-y-1" onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
            <Footer />
        </>
    )
}

export default OrderConfirm
