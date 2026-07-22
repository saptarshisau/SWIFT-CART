import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../features/order/orderSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { removeErrors, removeSuccess, updateOrderStatus } from '../features/admin/adminSlice';

function UpdateOrder() {
    const [status, setStatus] = useState("")
    const { orderId } = useParams();
    const { order, loading: orderLoading } = useSelector(state => state.order);
    const { success, loading: adminLoading, error } = useSelector(state => state.admin);
    const loading = orderLoading || adminLoading
    const dispatch = useDispatch();
    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId]);

    const {
        shippingInfo = {},
        orderItems = [],
        paymentInfo = {},
        orderStatus,
        totalPrice
    } = order
    const paymentStatus = paymentInfo.status === 'succeeded' ? 'Paid' : 'Not Paid';
    const finalOrderStatus = paymentStatus === 'Not Paid' ? 'Cancelled' : orderStatus;
    const handleStatusUpdate = () => {
        if (!status) {
            toast.error('Please select a status', { position: 'top-center', autoClose: 3000 })
            return
        }
        dispatch(updateOrderStatus({ orderId, status }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Order Status updated successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, error, success, orderId])
    return (
        <>
            <Navbar />
            <PageTitle title="Update Order" />
            {loading ? (<Loader />) : (<div className="w-full max-w-[1200px] mx-auto mt-20 mb-10 p-5 md:p-8 bg-gray-50/50 rounded-2xl shadow-lg border border-gray-100 font-sans">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#3B3B4F] mb-8">Update Order</h1>
                <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4 border-b-2 border-gray-100 pb-2">Order Information</h2>
                    <div className="space-y-3">
                        <p className="text-gray-600 text-base"><strong className="text-gray-800">Order ID: </strong>{orderId}</p>
                        <p className="text-gray-600 text-base"><strong className="text-gray-800">Shipping Address: </strong>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}</p>
                        <p className="text-gray-600 text-base"><strong className="text-gray-800">Phone: </strong>{shippingInfo.phoneNo}</p>
                        <p className="text-gray-600 text-base"><strong className="text-gray-800">Order Status: </strong><span className={`font-semibold ${finalOrderStatus === 'Delivered' ? 'text-green-600' : finalOrderStatus === 'Processing' ? 'text-orange-500' : 'text-red-500'}`}>{finalOrderStatus}</span></p>
                        <p className="text-gray-600 text-base"><strong className="text-gray-800">Payment Status: </strong><span className={`font-semibold ${paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-500'}`}>{paymentStatus}</span></p>
                        <p className="text-gray-600 text-base"><strong className="text-gray-800">Total Price: </strong>{totalPrice}/-</p>
                    </div>
                </div>

                <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <h2 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4 border-b-2 border-gray-100 pb-2">Order Items</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse mt-2">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-3 text-center text-gray-700 font-semibold whitespace-nowrap">Image</th>
                                    <th className="p-3 text-center text-gray-700 font-semibold whitespace-nowrap">Name</th>
                                    <th className="p-3 text-center text-gray-700 font-semibold whitespace-nowrap">Quantity</th>
                                    <th className="p-3 text-center text-gray-700 font-semibold whitespace-nowrap">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item) => (
                                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-3 text-center">
                                            <img src={item.image.replace('./', '/')} alt={item.name} className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] object-cover rounded-lg shadow-sm mx-auto' />
                                        </td>
                                        <td className="p-3 text-center text-gray-800 font-medium whitespace-nowrap">{item.name}</td>
                                        <td className="p-3 text-center text-gray-700 whitespace-nowrap">{item.quantity}</td>
                                        <td className="p-3 text-center text-gray-800 font-bold whitespace-nowrap">{item.price}/-</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="w-full">
                        <h2 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4 border-b-2 border-gray-100 pb-2">Update Status</h2>
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                            <select className="w-full md:max-w-[300px] p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed" value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading || orderStatus === 'Delivered'}>
                                <option value="">Select Status</option>
                                <option value="Shipped">Shipped</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button className="w-full md:w-auto px-6 py-3 bg-[#6C5B7B] hover:bg-[#4E4A59] text-white font-semibold rounded-lg transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 shadow-md whitespace-nowrap" onClick={handleStatusUpdate} disabled={loading || !status || orderStatus === 'Delivered'}>Update Status</button>
                        </div>
                    </div>
                </div>
            </div>)}
            <Footer />
        </>
    )
}

export default UpdateOrder
