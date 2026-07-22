import { useEffect } from 'react';
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteOrder, fetchAllOrders, removeErrors, removeSuccess } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';

function OrdersList() {
  const { orders, loading, error, success, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [dispatch])

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (confirm) {
      dispatch(deleteOrder(id))
    }
  }
  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
    if (success) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      dispatch(fetchAllOrders())
    }
  }, [dispatch, error, success, message]);
  if (!orders && orders.length === 0) {
    return (
      <div className="no-orders-container">
        <p>No Orders Found</p>
      </div>
    )
  }
  return (
    <>
      {loading ? (<Loader />) : (<>
        <Navbar />
        <PageTitle title="All Orders" />
        <div className="p-5 bg-gray-50/50 rounded-2xl shadow-md min-h-[70vh] mt-[90px] max-w-[1200px] mx-auto mb-10">
          <h1 className="text-2xl md:text-3xl mb-8 text-[#3B3B4F] font-bold">All Orders</h1>
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Sl No</th>
                    <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Order ID</th>
                    <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Status</th>
                    <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Total Price</th>
                    <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Items</th>
                    <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map((order, index) => (
                    <tr key={order._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{index + 1}</td>
                      <td className="p-4 border-b border-gray-100 text-gray-800 font-medium whitespace-nowrap">{order._id}</td>
                      <td className={`p-4 border-b border-gray-100 font-semibold whitespace-nowrap ${order.orderStatus === 'Delivered' ? 'text-green-600' : order.orderStatus === 'Processing' ? 'text-orange-500' : 'text-red-500'}`}>{order.orderStatus}</td>
                      <td className="p-4 border-b border-gray-100 text-gray-800 font-bold whitespace-nowrap">{order.totalPrice.toFixed(2)}/-</td>
                      <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{order.orderItems.length}</td>
                      <td className="p-4 border-b border-gray-100 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/order/${order._id}`} className='inline-flex items-center justify-center p-2 rounded-lg text-[#6C5B7B] hover:bg-[#6C5B7B]/10 transition-colors duration-200'><Edit fontSize="small"/></Link>
                          <button className="inline-flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-600 bg-transparent transition-colors duration-200 border-none cursor-pointer" onClick={() => handleDelete(order._id)}><Delete fontSize="small"/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </>)}
    </>
  )
}

export default OrdersList
