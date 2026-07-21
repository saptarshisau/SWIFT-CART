import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { LaunchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyOrders, removeErrors } from '../features/order/orderSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function MyOrders() {
    const { orders, loading, error } = useSelector(state => state.order);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMyOrders());
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    return (
        <>
            <Navbar />
            <PageTitle title="User Order" />
            {loading ? (<Loader />) : orders.length > 0 ? (
                <div className="max-w-[1200px] mx-auto mt-24 mb-20 px-5 md:px-10 py-8 md:py-12 bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[70vh]">
                    <h1 className="text-center text-[#3B3B4F] text-3xl md:text-4xl font-bold mb-10 drop-shadow-sm">My Orders</h1>
                    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr>
                                        <th className="p-4 md:p-5 bg-gray-50/80 font-bold text-[#4E4A59] border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Order ID</th>
                                        <th className="p-4 md:p-5 bg-gray-50/80 font-bold text-[#4E4A59] border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Items Count</th>
                                        <th className="p-4 md:p-5 bg-gray-50/80 font-bold text-[#4E4A59] border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Status</th>
                                        <th className="p-4 md:p-5 bg-gray-50/80 font-bold text-[#4E4A59] border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Total Price</th>
                                        <th className="p-4 md:p-5 bg-gray-50/80 font-bold text-[#4E4A59] border-b border-gray-200 text-sm md:text-base whitespace-nowrap text-center">View Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{order._id}</td>
                                            <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{order.orderItems.length}</td>
                                            <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-md font-bold text-xs md:text-sm inline-block ${order.orderStatus === 'Processing' ? 'text-orange-600 bg-orange-100' : order.orderStatus === 'Delivered' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>{order.orderStatus}</span>
                                            </td>
                                            <td className="p-4 md:p-5 text-gray-700 font-bold border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{order.totalPrice}/-</td>
                                            <td className="p-4 md:p-5 text-center border-b border-gray-100">
                                                <Link to={`/order/${order._id}`} className="inline-flex items-center justify-center p-2 rounded-lg text-[#6C5B7B] hover:bg-[#6C5B7B]/10 hover:text-[#4E4A59] transition-all duration-300">
                                                    <LaunchOutlined />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-[70vh]">
                    <p className="text-3xl md:text-4xl text-gray-400 font-semibold tracking-wide">No Orders Found</p>
                </div>
            )}

            <Footer />
        </>
    )
}

export default MyOrders
